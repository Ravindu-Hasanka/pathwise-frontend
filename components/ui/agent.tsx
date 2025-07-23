import React, { useState, useEffect, use } from 'react';
import Vapi from '@vapi-ai/web';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';
import { Disclosure } from '@headlessui/react';
import { FiDownload, FiPhoneCall, FiPhoneOff, FiRefreshCw, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface VapiWidgetProps {
    apiKey: string;
    assistantId: string;
    interviewPosition: string;
    userName: string;
    config?: Record<string, unknown>;
}

interface InterviewReport {
    summary: string;
    review: string;
    score: number;
    strengths: string[];
    areasForImprovement: string[];
}

const VapiWidget: React.FC<VapiWidgetProps> = ({
    apiKey,
    assistantId,
    interviewPosition,
    userName,
    config = {},
}) => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<Array<{ role: string; text: string }>>([]);
    const [interviewStatus, setInterviewStatus] = useState<'pre-call' | 'in-progress' | 'ended'>('pre-call');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [interviewReport, setReport] = useState<InterviewReport | null>(null);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);

    useEffect(() => {
        const vapiInstance = new Vapi(apiKey);
        setVapi(vapiInstance);

        vapiInstance.on('call-start', () => {
            setIsConnected(true);
            setInterviewStatus('in-progress');
            setTranscript([
                {
                    role: 'system',
                    text: `Starting interview for: ${interviewPosition}`,
                },
            ]);
        });

        vapiInstance.on('call-end', () => {
            setIsConnected(false);
            setIsSpeaking(false);
            setInterviewStatus('ended');
        });

        vapiInstance.on('speech-start', () => {
            setIsSpeaking(true);
        });

        vapiInstance.on('speech-end', () => {
            setIsSpeaking(false);
        });

        vapiInstance.on('message', (message) => {
            if (message.type === 'transcript') {
                setTranscript((prev) => [...prev, { role: message.role, text: message.transcript }]);
            }

            if (message.type === 'function-call' && message.functionCall.name === 'provide_feedback') {
                const feedbackText = message.functionCall.parameters.feedback;
                setFeedback(feedbackText);
            }
        });

        vapiInstance.on('error', (error) => {
            console.error('Vapi error:', error);
        });

        return () => {
            vapiInstance?.stop();
        };
    }, [apiKey, interviewPosition]);

    const startCall = () => {
        vapi?.start(assistantId, {
            model: {
                provider: 'openai',
                model: 'gpt-4-turbo',
                temperature: 0.7,
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional interviewer conducting an interview for a ${interviewPosition} position. Ask behavioral and technical questions relevant to the role. Provide feedback at the end using the provide_feedback function. Maintain a professional but friendly tone.`
                    }
                ],
            }
        });
    };

    const endCall = () => vapi?.stop();

    const restartInterview = () => {
        setTranscript([]);
        setFeedback(null);
        setInterviewStatus('pre-call');
    };

    const getRoleSpecificRequirements = (position: string) => {
        position = position.toLowerCase();
        
        if (position.includes('frontend') || position.includes('react')) {
            return "Focus on JavaScript/TypeScript, React, CSS, and responsive design principles.";
        }
        if (position.includes('backend') || position.includes('node') || position.includes('api')) {
            return "Focus on API design, database optimization, server architecture, and security practices.";
        }
        if (position.includes('full stack')) {
            return "Evaluate both frontend and backend skills with emphasis on system integration.";
        }
        if (position.includes('devops')) {
            return "Focus on CI/CD pipelines, cloud infrastructure, containerization, and monitoring.";
        }
        if (position.includes('data') || position.includes('analyst')) {
            return "Focus on SQL, data modeling, visualization tools, and statistical analysis.";
        }
        return "Focus on problem-solving skills, technical knowledge, and communication abilities.";
    };

    const getScoreColor = (score: number) => {
        if (score >= 85) return 'text-green-400';
        if (score >= 70) return 'text-yellow-400';
        return 'text-red-400';
    };

    const formatTranscriptForAnalysis = (transcript: Array<{ role: string; text: string }>) => {
        return transcript
            .filter(msg => msg.role !== 'system')
            .map(msg => `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.text}`)
            .join('\n');
    };

    useEffect(() => {
        const generateInterviewReport = async () => {
            const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
            if (!geminiApiKey || transcript.length <= 1) return;
            
            setIsGeneratingReport(true);
            
            try {
                const genAI = new GoogleGenerativeAI(geminiApiKey);
                const model = genAI.getGenerativeModel({ 
                    model: "gemini-1.5-flash",
                    generationConfig: { responseMimeType: "application/json" }
                });

                const prompt = `
                    Analyze this interview transcript for a ${interviewPosition} position. 
                    Candidate name: ${userName}.
                    
                    Generate JSON output with the following structure:
                    {
                        "summary": "Concise 2-3 sentence overview of the interview",
                        "review": "Detailed evaluation of candidate's performance (4-5 sentences)",
                        "score": "Numerical score (0-100) based on responses",
                        "strengths": ["Array", "Of", "Key strengths"],
                        "areasForImprovement": ["Array", "Of", "Improvement areas"]
                    }
                    
                    Evaluation Criteria:
                    1. Technical knowledge (0-30 points)
                    2. Communication clarity (0-25 points)
                    3. Problem-solving approach (0-20 points)
                    4. Relevance to role (0-15 points)
                    5. Overall professionalism (0-10 points)
                    
                    Position-specific requirements: 
                    ${getRoleSpecificRequirements(interviewPosition)}
                    
                    Transcript:
                    ${formatTranscriptForAnalysis(transcript)}
                `;

                const result = await model.generateContent(prompt);
                console.log("Gemini report result:", result.response.text());
                const geminiReport = JSON.parse(result.response.text()) as InterviewReport;
                setReport(geminiReport);
                const response = result.response;
                const text = response.text();
                
                // Parse JSON response
                const reportData = JSON.parse(text) as InterviewReport;
                
                // Validate score range
                if (reportData.score < 0 || reportData.score > 100) {
                    reportData.score = Math.min(100, Math.max(0, reportData.score));
                }
                
                setReport(reportData);
            } catch (error) {
                console.error("Gemini report error:", error);
            } finally {
                setIsGeneratingReport(false);
            }
        };

        if (interviewStatus === 'ended' && transcript.length > 1) {
            generateInterviewReport();
        }
    }, [interviewStatus, transcript]);

    const downloadTranscript = () => {
        const formatted = transcript.map((msg) => {
            const prefix = msg.role === 'user' ? 'Candidate: ' : 'Interviewer: ';
            return prefix + msg.text;
        }).join('\n\n');

        const blob = new Blob([formatted], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${interviewPosition.replace(/\s+/g, '_')}_interview.txt`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    };

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto gap-6 p-4 pt-20">
            {/* Main Content */}
            <div className="text-center mb-6 mt-10">
                <h1 className="text-3xl font-bold text-primary-100 mb-2">Interview with AI Companion</h1>
                <p className="text-lg text-gray-300">Prepare for your {interviewPosition} interview with our AI-powered assistant.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-10 mb-10">
                {/* AI Interviewer */}
                <div
                    className=
                    "flex flex-col items-center justify-center gap-2 p-7 h-[400px] w-full sm:basis-1/2 rounded-lg border-2 bg-gradient-to-br from-[#0f172a] to-[#1e3a8a]"
                >
                    {isSpeaking ? (
                        <div className={cn("relative z-10 flex items-center justify-center rounded-full size-[120px] bg-gradient-to-br from-[#0f172a] to-[#1e3a8a]",
                            isSpeaking ? "absolute inline-flex size-/6 animate-ping rounded-full bg-primary-200 opacity-75" : "border-primary-200/50")} >
                            <Image src="/microphone.png" alt="Your profile" width={100} height={100} className="rounded-full object-cover size-[20px]" />
                        </div>) : (
                        <div className="relative z-10 flex items-center justify-center rounded-full size-[120px] bg-gradient-to-br from-[#0f172a] to-[#1e3a8a]" >
                            <Image src="/ai-avatar.png" alt="Your profile" width={539} height={539} className="rounded-full object-cover size-[120px]" />
                        </div>)}
                    <h3 className="text-center text-primary-100 mt-5">AI Interviewer</h3>
                </div>

                {/* User */}
                <div
                    className={cn(
                        "flex flex-col items-center justify-center gap-2 p-7 h-[400px] w-full sm:basis-1/2 rounded-lg border-2 bg-gradient-to-br from-[#0f172a] to-[#1e3a8a]"
                    )}
                >
                    {(!isSpeaking && interviewStatus === 'in-progress') ? (
                        <div className={cn("relative z-10 flex items-center justify-center rounded-full size-[120px] bg-gradient-to-br from-[#0f172a] to-[#1e3a8a]",
                            !isSpeaking ? "absolute inline-flex size-/6 animate-ping rounded-full bg-primary-200 opacity-75" : "border-primary-200/50")} >
                            <Image src="/microphone.png" alt="Your profile" width={100} height={100} className="rounded-full object-cover size-[20px]" />
                        </div>) : (
                        <div className="relative z-10 flex items-center justify-center rounded-full size-[120px] bg-gradient-to-br from-[#0f172a] to-[#1e3a8a]" >
                            <Image src="/user-avatar.png" alt="Your profile" width={539} height={539} className="rounded-full object-cover size-[120px]" />
                        </div>)}
                    <h3 className="text-center text-primary-100 mt-5">{userName}</h3>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-4 mb-10">
                {interviewStatus === 'pre-call' && (
                    <button onClick={startCall} className="bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-full flex items-center gap-2">
                        <FiPhoneCall className="text-lg" /> Start Call
                    </button>
                )}
                {interviewStatus === 'in-progress' && (
                    <button onClick={endCall} className="bg-red-500 hover:bg-red-600 text-white px-7 py-3 rounded-full flex items-center gap-2">
                        <FiPhoneOff className="text-lg" /> End Call
                    </button>
                )}
                {interviewStatus === 'ended' && (
                    <div className='flex items-center gap-4'>
                        <button onClick={restartInterview} className="bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-full flex items-center gap-2">
                            <FiRefreshCw className="text-lg" /> Restart Interview
                        </button>
                        <button onClick={downloadTranscript} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center gap-2">
                            <FiDownload className="text-base" /> Download Transcript
                        </button>
                    </div>
                )}
            </div>

            {/* Feedback */}
            {interviewStatus === 'ended' && (
                <div className="w-full blue-gradient-dark rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-primary-100 mb-4">Interview Analysis</h3>
                    
                    {isGeneratingReport ? (
                        <div className="text-center py-8">
                            <FiRefreshCw className="animate-spin mx-auto text-3xl text-primary-100 mb-3" />
                            <p className="text-gray-300">Generating comprehensive report...</p>
                        </div>
                    ) : interviewReport ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {/* Summary */}
                            <div className="md:col-span-2 bg-dark-200 rounded-xl p-5">
                                <h4 className="font-medium text-primary-100 mb-2">Summary</h4>
                                <p className="text-light-100">{interviewReport.summary}</p>
                            </div>
                            
                            {/* Score */}
                            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-xl p-5 flex flex-col items-center justify-center">
                                <div className={`text-5xl font-bold ${getScoreColor(interviewReport.score)}`}>
                                    {interviewReport.score}
                                    <span className="text-xl text-gray-300">/100</span>
                                </div>
                                <div className="mt-2 text-sm text-gray-300">Overall Score</div>
                            </div>
                            
                            {/* Detailed Review */}
                            <div className="md:col-span-3 bg-dark-200 rounded-xl p-5">
                                <h4 className="font-medium text-primary-100 mb-2">Detailed Review</h4>
                                <p className="text-light-100">{interviewReport.review}</p>
                            </div>
                            
                            {/* Strengths */}
                            <div className="md:col-span-3 bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-5">
                                <h4 className="font-medium text-green-300 mb-2">Key Strengths</h4>
                                <ul className="space-y-2">
                                    {interviewReport.strengths.map((strength, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-green-400 mr-2">✓</span>
                                            <span className="text-light-100">{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            {/* Areas for Improvement */}
                            <div className="md:col-span-3 bg-gradient-to-br from-amber-900/20 to-amber-800/10 rounded-xl p-5">
                                <h4 className="font-medium text-amber-300 mb-2">Areas for Improvement</h4>
                                <ul className="space-y-2">
                                    {interviewReport.areasForImprovement.map((area, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-amber-400 mr-2">•</span>
                                            <span className="text-light-100">{area}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-300 text-center py-4">
                            No analysis available. Transcript was too short for analysis.
                        </p>
                    )}
                </div>
            )}

            {/* Transcript (bottom) */}
            <div className='w-full flex flex-col gap-4'>
                <div className="w-full mt-6">
                    <Disclosure defaultOpen={false}>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex items-center justify-between w-full bg-[#1e3a8a] text-white px-4 py-3 rounded-lg">
                                    <span>Transcript</span>
                                    {open ? <FiChevronDown /> : <FiChevronRight />}
                                </Disclosure.Button>
                                <Disclosure.Panel className="mt-2 max-h-[500px] overflow-y-auto space-y-3 bg-[#0f172a] p-4 rounded-lg text-white text-sm">
                                    {transcript.length > 0 ? (
                                        transcript.map((msg, index) => (
                                            <div
                                                key={index}
                                                className={cn(
                                                    'p-2 rounded-md',
                                                    msg.role === 'user' ? 'bg-primary-100/20 text-right' : 'bg-dark-200'
                                                )}
                                            >
                                                <strong>{msg.role === 'user' ? 'You: ' : 'Interviewer: '}</strong> {msg.text}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-300">Transcript will appear here during the call.</p>
                                    )}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
                {/* Summary (bottom) */}
                <div className="w-full mt">
                    <Disclosure defaultOpen={false}>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex items-center justify-between w-full bg-[#1e3a8a] text-white px-4 py-3 rounded-lg">
                                    <span>Summary</span>
                                    {open ? <FiChevronDown /> : <FiChevronRight />}
                                </Disclosure.Button>
                                <Disclosure.Panel className="mt-2 max-h-[500px] overflow-y-auto space-y-3 bg-[#0f172a] p-4 rounded-lg text-white text-sm">
                                    {transcript.length > 0 ? (
                                        transcript.map((msg, index) => (
                                            <div
                                                key={index}
                                                className={cn(
                                                    'p-2 rounded-md',
                                                    msg.role === 'user' ? 'bg-primary-100/20 text-right' : 'bg-dark-200'
                                                )}
                                            >
                                                <strong>{msg.role === 'user' ? 'You: ' : 'Interviewer: '}</strong> {msg.text}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-300">Transcript will appear here during the call.</p>
                                    )}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>

        </div>
    );

};

export default VapiWidget;
