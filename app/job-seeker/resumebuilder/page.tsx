"use client";

import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, Upload, Wand2, FileText, Trash2, X } from "lucide-react";
import Navbar from "../../../components/ui/navbar";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("builder");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [customSkill, setCustomSkill] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const MySwal = withReactContent(Swal);


   
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experiences: [
      {
        id: 1,
        jobTitle: "",
        company: "",
        duration: "",
        description: "",
      },
    ],
    education: [
      {
        id: 1,
        degree: "",
        institution: "",
        year: "",
        description: "",
      },
    ],
    skills: [] as string[],
    projects: [
      {
        id: 1,
        name: "",
        description: "",
      },
    ],
  });

  const skillOptions = [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "HTML/CSS",
    "Git",
    "AWS",
    "Docker",
    "UI/UX Design",
  ];

  const generateResume = async () => {
  try {
    
    MySwal.fire({
      title: 'Generating PDF...',
      html: 'Please wait while your resume is being created.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: '#1e293b',  
      color: '#fff',           
    });

    const res = await fetch("/api/resume-builder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeData }),
    });

    const data = await res.json();

    if (data.resume) {
      const resumeHTML = data.resume;

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      await doc.html(resumeHTML, {
        x: 40,
        y: 40,
        width: 515,
        windowWidth: 800,
        callback: function (doc) {
          const pdfBlob = doc.output("blob");
          const url = URL.createObjectURL(pdfBlob);
          setPreviewUrl(url);

          // Close loading and show success
          Swal.close();
          MySwal.fire({
            title: 'Resume Generated!',
            text: 'Your PDF is ready to preview and download.',
            icon: 'success',
            background: '#1e293b',
            color: '#fff',
            confirmButtonColor: '#4f46e5',
          });
        },
      });
    } else {
      Swal.close();
      MySwal.fire({
        title: 'Error',
        text: 'Something went wrong while generating the resume.',
        icon: 'error',
        background: '#1e293b',
        color: '#fff',
        confirmButtonColor: '#f87171',
      });
    }
  } catch (err) {
    Swal.close();
    console.error(err);
    MySwal.fire({
      title: 'Failed',
      text: 'Failed to generate resume PDF.',
      icon: 'error',
      background: '#1e293b',
      color: '#fff',
      confirmButtonColor: '#f87171',
    });
  }
};

  const addCustomSkill = () => {
    if (customSkill.trim() && !resumeData.skills.includes(customSkill.trim())) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, customSkill.trim()],
      }));
      setCustomSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (id: number, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleEducationChange = (id: number, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: Date.now(),
          jobTitle: "",
          company: "",
          duration: "",
          description: "",
        },
      ],
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          degree: "",
          institution: "",
          year: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id: number) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const removeEducation = (id: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const optimizeResume = () => {
    if (!resumeFile) return;

    setIsOptimizing(true);

    setTimeout(() => {
      setIsOptimizing(false);
      alert("Resume optimization complete! Check the suggestions below.");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar currentPage="resumebuilder" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Resume Builder & Optimizer
          </h1>
          <p className="text-gray-300 text-lg">
            Create a professional resume from scratch or enhance your existing
            one with AI
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-slate-800/50 border border-white/10">
            <TabsTrigger
              value="builder"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Build Resume
            </TabsTrigger>
            <TabsTrigger
              value="optimizer"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              AI Optimizer
            </TabsTrigger>
          </TabsList>

          {/* Resume Builder Tab */}
          <TabsContent value="builder">
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Build Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label className="text-white">Full Name</Label>
                        <Input
                          name="name"
                          value={resumeData.name}
                          onChange={handleInputChange}
                          className="mt-1 bg-slate-700 border-slate-600"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Email</Label>
                        <Input
                          name="email"
                          value={resumeData.email}
                          onChange={handleInputChange}
                          className="mt-1 bg-slate-700 border-slate-600"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Phone</Label>
                        <Input
                          name="phone"
                          value={resumeData.phone}
                          onChange={handleInputChange}
                          className="mt-1 bg-slate-700 border-slate-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Professional Summary
                    </h3>
                    <Textarea
                      name="summary"
                      value={resumeData.summary}
                      onChange={handleInputChange}
                      className="mt-1 bg-slate-700 border-slate-600 min-h-[120px]"
                      placeholder="Describe your professional background and key skills"
                    />
                  </div>

                  {/* Work Experience */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-white">
                        Work Experience
                      </h3>
                      <Button
                        variant="outline"
                        className="border-white/20 text-gray-300 hover:bg-white/10"
                        onClick={addExperience}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.experiences.map((exp) => (
                        <Card
                          key={exp.id}
                          className="bg-slate-700/30 border-white/10"
                        >
                          <CardContent className="p-6">
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:bg-red-400/10"
                                onClick={() => removeExperience(exp.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="text-white">Job Title</Label>
                                <Input
                                  value={exp.jobTitle}
                                  onChange={(e) =>
                                    handleExperienceChange(
                                      exp.id,
                                      "jobTitle",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 bg-slate-700 border-slate-600"
                                />
                              </div>
                              <div>
                                <Label className="text-white">Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) =>
                                    handleExperienceChange(
                                      exp.id,
                                      "company",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 bg-slate-700 border-slate-600"
                                />
                              </div>
                              <div>
                                <Label className="text-white">Duration</Label>
                                <Input
                                  value={exp.duration}
                                  onChange={(e) =>
                                    handleExperienceChange(
                                      exp.id,
                                      "duration",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 bg-slate-700 border-slate-600"
                                  placeholder="e.g. 2020 - Present"
                                />
                              </div>
                            </div>
                            <div className="mt-4">
                              <Label className="text-white">Description</Label>
                              <Textarea
                                value={exp.description}
                                onChange={(e) =>
                                  handleExperienceChange(
                                    exp.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className="mt-1 bg-slate-700 border-slate-600 min-h-[80px]"
                                placeholder="Describe your responsibilities and achievements"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Education Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-white">
                        Education
                      </h3>
                      <Button
                        variant="outline"
                        className="border-white/20 text-gray-300 hover:bg-white/10"
                        onClick={addEducation}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.education.map((edu) => (
                        <Card
                          key={edu.id}
                          className="bg-slate-700/30 border-white/10"
                        >
                          <CardContent className="p-6">
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:bg-red-400/10"
                                onClick={() => removeEducation(edu.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="text-white">Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) =>
                                    handleEducationChange(
                                      edu.id,
                                      "degree",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 bg-slate-700 border-slate-600"
                                  placeholder="e.g. Bachelor of Science in Computer Science"
                                />
                              </div>
                              <div>
                                <Label className="text-white">
                                  Institution
                                </Label>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) =>
                                    handleEducationChange(
                                      edu.id,
                                      "institution",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 bg-slate-700 border-slate-600"
                                  placeholder="e.g. University of California"
                                />
                              </div>
                              <div>
                                <Label className="text-white">Year</Label>
                                <Input
                                  value={edu.year}
                                  onChange={(e) =>
                                    handleEducationChange(
                                      edu.id,
                                      "year",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 bg-slate-700 border-slate-600"
                                  placeholder="e.g. 2016 - 2020"
                                />
                              </div>
                            </div>
                            <div className="mt-4">
                              <Label className="text-white">
                                Description (Optional)
                              </Label>
                              <Textarea
                                value={edu.description}
                                onChange={(e) =>
                                  handleEducationChange(
                                    edu.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className="mt-1 bg-slate-700 border-slate-600 min-h-[60px]"
                                placeholder="Honors, awards, or relevant coursework"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resumeData.skills.length > 0 ? (
                        resumeData.skills.map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-blue-500/20 text-blue-300 border-blue-500/30 flex items-center group cursor-pointer"
                            onClick={() => removeSkill(skill)}
                          >
                            {skill}
                            <X className="h-3 w-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No skills added yet
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <Label className="text-white">Add Custom Skill</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          value={customSkill}
                          onChange={(e) => setCustomSkill(e.target.value)}
                          placeholder="Type a skill not listed below"
                          className="bg-slate-700 border-slate-600"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") addCustomSkill();
                          }}
                        />
                        <Button
                          variant="outline"
                          className="border-white/20 text-gray-300 hover:bg-white/10"
                          onClick={addCustomSkill}
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">
                        Common Skills
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {skillOptions.map((skill) => (
                          <Button
                            key={skill}
                            variant={
                              resumeData.skills.includes(skill)
                                ? "default"
                                : "outline"
                            }
                            className={`${resumeData.skills.includes(skill)
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "border-white/20 text-gray-300 hover:bg-white/10"
                              }`}
                            size="sm"
                            onClick={() => {
                              setResumeData((prev) => ({
                                ...prev,
                                skills: prev.skills.includes(skill)
                                  ? prev.skills.filter((s) => s !== skill)
                                  : [...prev.skills, skill],
                              }));
                            }}
                          >
                            {skill}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <div className="flex justify-end">
                    <Button
                      onClick={generateResume}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Resume
                    </Button>
                  </div>
                  {previewUrl && (
                    <div className="mt-8">
                      <h3 className="text-white text-xl mb-2">Resume Preview</h3>
                      <iframe
                        src={previewUrl}
                        width="100%"
                        height="600px"
                        className="border border-white/20 rounded-lg"
                      ></iframe>
                      <div className="flex justify-end mt-4">
                        <Button
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = previewUrl;
                            link.download = "resume.pdf";
                            link.click();
                          }}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          <Wand2 className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  )}

                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Optimizer Tab */}
          <TabsContent value="optimizer">
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">
                  AI Resume Optimizer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6">
                      <Upload className="h-10 w-10 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Upload Your Resume
                    </h3>
                    <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                      Our AI will analyze your resume and provide optimization
                      suggestions to help you stand out
                    </p>

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      className="border-white/20 text-gray-300 hover:bg-white/10"
                      onClick={triggerFileInput}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>

                    {resumeFile && (
                      <div className="mt-4 text-gray-300 flex items-center justify-center">
                        <FileText className="h-4 w-4 mr-2" />
                        {resumeFile.name}
                      </div>
                    )}
                  </div>

                  {resumeFile && (
                    <div className="space-y-6">
                      <div className="bg-slate-700/30 rounded-lg p-6 border border-white/10">
                        <h4 className="text-white font-medium mb-4">
                          Optimization Preferences
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-white">
                              Target Job Title
                            </Label>
                            <Input
                              placeholder="e.g. Senior Frontend Developer"
                              className="mt-1 bg-slate-700 border-slate-600"
                            />
                          </div>
                          <div>
                            <Label className="text-white">Industry</Label>
                            <Input
                              placeholder="e.g. Technology"
                              className="mt-1 bg-slate-700 border-slate-600"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label className="text-white">Additional Notes</Label>
                          <Textarea
                            className="mt-1 bg-slate-700 border-slate-600 min-h-[100px]"
                            placeholder="Any specific requirements or preferences for the optimization?"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          onClick={optimizeResume}
                          disabled={isOptimizing || !resumeFile}
                        >
                          {isOptimizing ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Optimizing...
                            </>
                          ) : (
                            <>
                              <Wand2 className="h-4 w-4 mr-2" />
                              Optimize Resume
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
