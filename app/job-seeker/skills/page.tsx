"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BookOpen,
  ChevronRight,
  Clock,
  TrendingUp,
  Award,
  Zap,
  Link as LinkIcon,
  Target,
} from "lucide-react";
import Navbar from "../../../components/ui/navbar";
import { getRecommendedCourses } from "@/api/api";

export default function SkillGapAnalysis() {
  const [activeTab, setActiveTab] = useState("analysis");
  const [skillData, setSkillData] = useState<any[]>([]);
  const [recommendedResources, setRecommendedResources] = useState<any[]>([]);

  // Sample data - in a real app this would come from user profile and backend
  const skillDataSample = [
    { skill: "JavaScript", current: 75, target: 90 },
    { skill: "React", current: 65, target: 85 },
    { skill: "Node.js", current: 60, target: 80 },
    { skill: "TypeScript", current: 50, target: 75 },
    { skill: "UI/UX Design", current: 40, target: 70 },
    { skill: "AWS", current: 30, target: 65 },
  ];

  const recommendedResourcesSample = [
    {
      title: "Advanced React Patterns",
      type: "Course",
      provider: "Frontend Masters",
      duration: "6h",
      link: "#",
      skill: "React"
    },
    {
      title: "Node.js Best Practices",
      type: "Book",
      provider: "O'Reilly",
      duration: "320 pages",
      link: "#",
      skill: "Node.js"
    },
    {
      title: "TypeScript Deep Dive",
      type: "Free Course",
      provider: "GitHub",
      duration: "Self-paced",
      link: "#",
      skill: "TypeScript"
    },
    {
      title: "AWS Certified Cloud Practitioner",
      type: "Certification",
      provider: "AWS",
      duration: "30h",
      link: "#",
      skill: "AWS"
    },
  ];

  const progressData = [
    { skill: "JavaScript", progress: 75, target: 90 },
    { skill: "React", progress: 65, target: 85 },
    { skill: "Node.js", progress: 60, target: 80 },
  ];

  useEffect(() => {
    // Fetch user skill data and recommended resources from backend here
    const fetchData = async () => {
      // Example: const response = await fetch('/api/user/skills');
      // const data = await response.json();
      // setSkillData(data.skills);
      // setRecommendedResources(data.recommendations);
      const response = await getRecommendedCourses(1);
      const data: getRecommendedCoursesRootType = response.data;
      console.log(data);

      setSkillData(skillDataSample);
      setRecommendedResources(data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar currentPage="skills" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Skill Gap Analysis</h1>
          <p className="text-gray-300 text-lg">
            Identify and bridge the gaps in your skill set to reach your career goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Skill Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                  Your Skill Gaps
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={skillData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" />
                    <YAxis dataKey="skill" type="category" stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1E293B",
                        borderColor: "#374151",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Bar
                      dataKey="current"
                      name="Current Level"
                      fill="#3B82F6"
                      radius={[0, 4, 4, 0]}
                    />
                    <Bar
                      dataKey="target"
                      name="Target Level"
                      fill="#8B5CF6"
                      radius={[0, 4, 4, 0]}
                      opacity={0.7}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-white/10 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-300 text-sm">Current Level</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-gray-300 text-sm">Target Level</span>
                  </div>
                </div>
                <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
                  Export Report
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-purple-400" />
                  Priority Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillData
                    .sort((a, b) => (b.target - b.current) - (a.target - a.current))
                    .slice(0, 3)
                    .map((skill, index) => (
                      <div key={skill.skill} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{skill.skill}</span>
                          <Badge
                            variant="outline"
                            className={`${
                              index === 0
                                ? "border-red-500/30 text-red-400"
                                : index === 1
                                ? "border-orange-500/30 text-orange-400"
                                : "border-yellow-500/30 text-yellow-400"
                            }`}
                          >
                            Gap: {skill.target - skill.current}%
                          </Badge>
                        </div>
                        <Progress
                          value={(skill.current / skill.target) * 100}
                          className={`h-2 ${
                            index === 0
                              ? "bg-red-500"
                              : index === 1
                              ? "bg-orange-500"
                              : "bg-yellow-500"
                          }`}
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Current: {skill.current}%</span>
                          <span>Target: {skill.target}%</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Create Learning Plan
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:bg-white/10">
                  Schedule Coaching Session
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:bg-white/10">
                  Find Relevant Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Resources Section */}
        <div className="mt-8">
          <Card className="bg-slate-800/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-green-400" />
                Recommended Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedResources.map((resource, index) => (
                  <Card key={index} className="bg-slate-700/30 border-white/10 hover:border-white/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-white font-medium">{resource.title}</h4>
                          <div className="flex items-center text-sm text-gray-400 mt-1 space-x-4">
                            <span className="flex items-center">
                              <Award className="h-4 w-4 mr-1" />
                              {resource.type}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {resource.duration}
                            </span>
                          </div>
                          <Badge variant="outline" className="mt-2 border-blue-500/30 text-blue-400">
                            {resource.skill}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:bg-blue-400/10"
                          asChild
                        >
                          <a href={resource.link} target="_blank" rel="noopener noreferrer">
                            <LinkIcon className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-white/10 pt-4">
              <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
                View All Resources
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Progress Tracking Section */}
        <div className="mt-8">
          <Card className="bg-slate-800/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="h-5 w-5 mr-2 text-orange-400" />
                Your Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {progressData.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{skill.skill}</span>
                      <span className="text-gray-400 text-sm">
                        {skill.progress}% of {skill.target}%
                      </span>
                    </div>
                    <Progress value={(skill.progress / skill.target) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Started: Jan 2023</span>
                      <span>Estimated completion: Aug 2023</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-white/10 pt-4">
              <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
                Update Progress
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}