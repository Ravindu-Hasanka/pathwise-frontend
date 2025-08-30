"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/ui/navbar";
import { useParams } from "next/navigation";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { updateSkillLevel } from "@/api/api";
import Swal from "sweetalert2";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct option
};

const sampleQuizQuestions: QuizQuestion[] = [
  {
    question: "What is the output of 2 + 2 in JavaScript?",
    options: ["3", "4", "22", "undefined"],
    correctAnswer: 1, // "4"
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: 1, // "useState"
  },
  {
    question: "Which of these is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Integer", "Object"],
    correctAnswer: 2, // "Integer"
  },
];

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  const params = useParams();
  const skill = params.skill;     
  const skillId = params.skillId;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleNext = async () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setSelectedOption(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
        const response = await updateSkillLevel(Number(skillId), score);
        if(response.status === 200) {
            console.log("Skill level updated successfully");
            setIsQuizFinished(true);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update skill level. Please try again later.',
            });
        }
    }
  };

  const progressPercent =
    quizQuestions.length > 0
      ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100
      : 0;

  useEffect(() => {
    const generateInterviewReport = async () => {
      const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!geminiApiKey) {
        setQuizQuestions(sampleQuizQuestions); // fallback
        return;
      }

      setIsGeneratingQuiz(true);

      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          generationConfig: { responseMimeType: "application/json" },
        });

        const prompt = `
          Give me multiple-choice questions to evaluate a person’s ${skill} skill level. 
          The questions should cover beginner, intermediate, and advanced concepts in ${skill}. 
          Format each question as follows: 

          type QuizQuestion = { 
            question: string; 
            options: string[]; 
            correctAnswer: number; // index of the correct option
          }; 

          Do not include any explanations or extra text—only return the questions in the given format. 
          Give the answer as the index of the options array. 
          Return a JSON array.
        `;

        const result = await model.generateContent(prompt);
        const geminiReport = JSON.parse(result.response.text()) as QuizQuestion[];
        setQuizQuestions(geminiReport);
      } catch (error) {
        console.error("Gemini report error:", error);
        setQuizQuestions(sampleQuizQuestions);
      } finally {
        setIsGeneratingQuiz(false);
      }
    };

    generateInterviewReport();
  }, [skill]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar currentPage="quiz" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <h1 className="text-4xl font-bold text-white text-center mb-4">Skill Quiz</h1>

        <Progress value={progressPercent} className="h-2 rounded-full bg-blue-500/50" />

        {!isQuizFinished ? (
          quizQuestions.length > 0 ? (
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{`Question ${
                  currentQuestionIndex + 1
                }`}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-lg mb-4">{currentQuestion.question}</p>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedOption === index ? "default" : "outline"}
                      className={`w-full text-left text-gray-200 border-white/20 hover:bg-white/10 ${
                        selectedOption === index ? "bg-purple-600/30" : ""
                      }`}
                      onClick={() => setSelectedOption(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  disabled={selectedOption === null}
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  {currentQuestionIndex === quizQuestions.length - 1
                    ? "Finish Quiz"
                    : "Next"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <p className="text-center text-white">Loading quiz...</p>
          )
        ) : (
          <Card className="bg-slate-800/50 border-white/10 text-center">
            <CardHeader>
              <CardTitle className="text-white">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg mb-4">
                You scored{" "}
                <span className="font-bold text-white">{score}</span> out of{" "}
                {quizQuestions.length}
              </p>
              <Progress
                value={(score / quizQuestions.length) * 100}
                className="h-2 rounded-full bg-green-500/50"
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white"
                onClick={() => {
                  window.location.href ="./../job-seeker/skills"
                }}
              >
                Back to Skills
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
