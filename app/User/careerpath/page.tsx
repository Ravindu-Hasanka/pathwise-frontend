"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Progress } from "../../../components/ui/progress";
import { Badge } from "../../../components/ui/badge";
import {
  ChevronRight,
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import Navbar from "../../../components/ui/navbar";

export default function CareerPath() {
  // Sample data - in a real app this would come from user profile and backend calculations
  const currentPosition = "Frontend Developer";
  const targetRole = "Senior UI/UX Designer";

  const careerPath = [
    {
      title: "Current Position",
      role: currentPosition,
      description: "You're here now. Focus on building foundational skills.",
      skills: ["HTML/CSS", "JavaScript", "Basic Design Principles"],
      actions: [
        {
          title: "Complete UI Fundamentals Course",
          type: "Course",
          provider: "Udemy",
          duration: "3 weeks",
          completed: true,
        },
        {
          title: "Build 3 Portfolio Projects",
          type: "Project",
          provider: "Personal",
          duration: "2 months",
          completed: false,
        },
      ],
    },
    {
      title: "Next Step",
      role: "UI Developer",
      description:
        "Bridge between development and design with more focus on user interfaces.",
      skills: ["React", "Figma", "Responsive Design", "Accessibility"],
      actions: [
        {
          title: "Advanced React Course",
          type: "Course",
          provider: "Frontend Masters",
          duration: "4 weeks",
          completed: false,
        },
        {
          title: "Learn Figma Basics",
          type: "Course",
          provider: "YouTube",
          duration: "1 week",
          completed: false,
        },
      ],
    },
    {
      title: "Mid-Level Goal",
      role: "UX Engineer",
      description:
        "Combine engineering skills with user experience principles.",
      skills: [
        "User Research",
        "Prototyping",
        "Design Systems",
        "Advanced CSS",
      ],
      actions: [
        {
          title: "UX Design Certification",
          type: "Certification",
          provider: "Google",
          duration: "6 months",
          completed: false,
        },
        {
          title: "Contribute to Open Source Design System",
          type: "Project",
          provider: "GitHub",
          duration: "Ongoing",
          completed: false,
        },
      ],
    },
    {
      title: "Target Role",
      role: targetRole,
      description:
        "Lead design initiatives while maintaining technical expertise.",
      skills: [
        "Design Leadership",
        "User Testing",
        "Advanced Prototyping",
        "Mentoring",
      ],
      actions: [
        {
          title: "Leadership Workshop",
          type: "Workshop",
          provider: "LinkedIn Learning",
          duration: "2 days",
          completed: false,
        },
        {
          title: "Build Comprehensive Case Study",
          type: "Project",
          provider: "Personal",
          duration: "3 months",
          completed: false,
        },
      ],
    },
  ];

  const recommendedCourses = [
    {
      title: "Advanced UX Design",
      provider: "Interaction Design Foundation",
      duration: "8 weeks",
      rating: 4.9,
      progress: 0,
    },
    {
      title: "Design Systems with React",
      provider: "Frontend Masters",
      duration: "5 weeks",
      rating: 4.8,
      progress: 0,
    },
    {
      title: "User Research Methods",
      provider: "Coursera",
      duration: "4 weeks",
      rating: 4.7,
      progress: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar currentPage="careerpath" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Your Path to <span className="text-purple-400">{targetRole}</span>
          </h1>
          <p className="text-gray-300 text-lg">
            We've mapped out the steps to help you reach your dream role
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 pt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium ">
                    Path Progress
                  </p>
                  <p className="text-white text-3xl font-bold">25%</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-500/30 pt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">
                    Steps Completed
                  </p>
                  <p className="text-white text-3xl font-bold">1/4</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/30 pt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">
                    Estimated Timeline
                  </p>
                  <p className="text-white text-3xl font-bold">18-24 mo</p>
                </div>
                <Clock className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Career Path Timeline */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Your Career Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {careerPath.map((step, index) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-8 border-l-2 border-purple-500/30 last:border-l-0 last:pb-0"
                    >
                      {index !== careerPath.length - 1 && (
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-2 border-purple-300"></div>
                      )}
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-2 border-purple-300"></div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-gray-400 text-sm uppercase tracking-wider">
                            {step.title}
                          </h3>
                          <h2 className="text-xl font-bold text-white">
                            {step.role}
                          </h2>
                          <p className="text-gray-300 mt-1">
                            {step.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-2">
                            Key Skills Needed
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {step.skills.map((skill, skillIndex) => (
                              <Badge
                                key={skillIndex}
                                variant={"default"}
                                className={
                                  "text-blue-400 bg-blue-500/20 border-blue-500/30"
                                }
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-2">
                            Recommended Actions
                          </h4>
                          <div className="space-y-3">
                            {step.actions.map((action, actionIndex) => (
                              <div
                                key={actionIndex}
                                className="bg-slate-700/30 rounded-lg p-3 border border-white/10"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h5 className="text-white font-medium">
                                      {action.title}
                                    </h5>
                                    <div className="flex items-center text-sm text-gray-400 mt-1 space-x-4">
                                      <span>{action.type}</span>
                                      <span className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {action.duration}
                                      </span>
                                      <span>{action.provider}</span>
                                    </div>
                                  </div>
                                  {action.completed ? (
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                      Completed
                                    </Badge>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-white/20 text-gray-300 hover:bg-white/10"
                                    >
                                      Start
                                    </Button>
                                  )}
                                </div>
                                {!action.completed && (
                                  <div className="mt-2">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-xs text-gray-400">
                                        Progress
                                      </span>
                                      <span className="text-xs text-gray-400">
                                        0%
                                      </span>
                                    </div>
                                    <Progress value={0} className="h-1" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {index !== careerPath.length - 1 && (
                          <div className="flex justify-center pt-4">
                            <ArrowRight className="h-6 w-6 text-purple-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recommended Learning */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Recommended Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedCourses.map((course, index) => (
                    <div
                      key={index}
                      className="bg-slate-700/30 rounded-lg p-4 border border-white/10"
                    >
                      <h4 className="text-white font-medium mb-1">
                        {course.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-2">
                        {course.provider}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duration}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span className="text-yellow-400">
                            {course.rating}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-400">
                            Progress
                          </span>
                          <span className="text-xs text-gray-400">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-1" />
                      </div>
                      <Button
                        className="mt-3 w-full"
                        variant="outline"
                        size="sm"
                      >
                        Enroll Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Progress */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Skills Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careerPath[0].skills.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">{skill}</span>
                        <span className="text-gray-400 text-xs">
                          {index === 0 ? "100%" : "0%"}
                        </span>
                      </div>
                      <Progress value={index === 0 ? 100 : 0} className="h-1" />
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="mt-4 w-full text-blue-400 hover:bg-blue-400/10"
                >
                  View All Skills
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Weekly Goal */}
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Weekly Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <h3 className="text-white font-semibold mb-2">
                    Complete UI Fundamentals Course
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Earn 200 XP and unlock the next step in your path
                  </p>
                  <Progress value={45} className="mb-4" />
                  <p className="text-sm text-gray-300">
                    3 of 7 modules completed
                  </p>
                  <Button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
