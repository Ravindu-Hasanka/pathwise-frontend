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
import { getRecommendedCourses, getSkillsByUser } from "@/api/api";
import { ProgressData, RecommendedResource, SkillData } from "./types/getRecommendedCourses";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getUserIdFromToken } from "@/app/lib/authCookies";

export default function SkillGapAnalysis() {
  const [activeTab, setActiveTab] = useState("analysis");
  const [skillData, setSkillData] = useState<SkillData[]>([]);
  const [recommendedResources, setRecommendedResources] = useState<RecommendedResource[]>([]);
  const [isOpenRecommendedResourceModal, setIsOpenRecommendedResourceModal] = useState(false);

  // Sample data - in a real app this would come from user profile and backend
  const skillDataSample: SkillData[] = [
    {
      skillId: 1, name: "JavaScript", level: 75, target: 90,
      updatedAt: "",
      createdAt: ""
    },
    {
      skillId: 2, name: "React", level: 65, target: 85,
      updatedAt: "",
      createdAt: ""
    },
    {
      skillId: 3, name: "Node.js", level: 60, target: 80,
      updatedAt: "",
      createdAt: ""
    },
    {
      skillId: 4, name: "TypeScript", level: 50, target: 75,
      updatedAt: "",
      createdAt: ""
    },
    {
      skillId: 5, name: "UI/UX Design", level: 40, target: 70,
      updatedAt: "",
      createdAt: ""
    },
    {
      skillId: 6, name: "AWS", level: 30, target: 65,
      updatedAt: "",
      createdAt: ""
    },
  ];

  const recommendedResourcesSample: RecommendedResource[] = [
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

  const fetchSkillData = async () => {
    const userId = getUserIdFromToken();
    console.log("User ID from token:", userId);
    if (!userId) return;
    const skillsResponse = await getSkillsByUser(userId);
      const skillsData = skillsResponse.data;
      console.log("Skills data:", skillsData);
      setSkillData(skillsData);
  }

  const fetchRecommendedResources = async () => {
    const userId = getUserIdFromToken();
    console.log("User ID from token:", userId);
    if (!userId) return;
    const recommendedCoursesResponse = await getRecommendedCourses(userId);
      const data: RecommendedResource[] = recommendedCoursesResponse.data;
      console.log("Recommended resources data:", data);
      setRecommendedResources(data);
  }


  useEffect(() => {
    fetchSkillData();
    fetchRecommendedResources();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar currentPage="skills" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Skill Gap Analysis</h1>
          <p className="text-gray-300 text-lg">
            Identify and bridge the gaps in your skill set to reach your career goals
          </p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Skill Chart */}
          {/* <div className="lg:col-span-2">
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
          </div> */}

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
                    .sort((a, b) => ((b.target || 100) - b.level) - ((a.target || 100) - a.level))
                    .slice(0, 3)
                    .map((skill, index) => (
                      <div key={skill.skillId} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{skill.name}</span>
                          <Badge
                            variant="outline"
                            className={`${index === 0
                              ? "border-red-500/30 text-red-400"
                              : index === 1
                                ? "border-orange-500/30 text-orange-400"
                                : "border-yellow-500/30 text-yellow-400"
                              }`}
                          >
                            Gap: {(skill.target || 100) - skill.level}%
                          </Badge>
                        </div>
                        <Progress
                          value={(skill.level / skill.target) * 100}
                          className={`h-2 ${index === 0
                            ? "bg-red-500"
                            : index === 1
                              ? "bg-orange-500"
                              : "bg-yellow-500"
                            }`}
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Current: {skill.level}%</span>
                          <span>Target: {skill.target || 100}%</span>
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
                {recommendedResources.slice(0, 6).map((resource, index) => (
                  <Card key={index} className="bg-slate-700/30 border-white/10 hover:border-white/30 transition-colors pt-10">
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
                          <div className="mt-2 flex flex-wrap gap-2">
                            {resource.skill.split(",").map((skill, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="border-blue-500/30 text-blue-400"
                              >
                                {skill.trim()}
                              </Badge>
                            ))}
                          </div>

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
              <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10" onClick={() => setIsOpenRecommendedResourceModal(true)} >
                View All Resources
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Progress Tracking Section */}
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
                {skillData.map((skill) => (
                  <div key={skill.skillId} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{skill.name}</span>

                      {skill.level !== null ? (
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-sm">
                            {skill.level}% of {skill.target || 100}%
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-gray-300 hover:bg-white/10"
                            onClick={() => {
                              window.location.href = `/check-skill-level?skill=${skill.name}&skillId=${skill.skillId}`;
                            }}
                          >
                            Update Skill Level
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => {
                            window.location.href = `/check-skill-level?skill=${skill.name}&skillId=${skill.skillId}`;

                          }}
                        >
                          Check Skill Level
                        </Button>
                      )}
                    </div>

                    {skill.level !== null ? (
                      <>
                        <Progress value={(skill.level / (skill.target || 100)) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Started: {skill.createdAt}</span>
                          {/* <span>Estimated completion: Aug 2023</span> */}
                        </div>
                      </>
                    ) : (
                      <p className="text-xs text-gray-400">No progress recorded yet</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>


        <div>
          <Dialog open={isOpenRecommendedResourceModal} onOpenChange={setIsOpenRecommendedResourceModal}>
            <DialogContent className="w-full max-h-[80vh] overflow-y-auto rounded-2xl shadow-xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Recommended Resources
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {recommendedResources.map((resource, index) => (
                  <Card key={index} className="bg-slate-700/30 border-white/10 hover:border-white/30 transition-colors pt-10">
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
                          <div className="mt-2 flex flex-wrap gap-2">
                            {resource.skill.split(",").map((skill, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="border-blue-500/30 text-blue-400"
                              >
                                {skill.trim()}
                              </Badge>
                            ))}
                          </div>

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
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}