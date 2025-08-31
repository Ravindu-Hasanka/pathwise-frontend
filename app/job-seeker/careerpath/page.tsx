"use client";

import { useEffect, useState } from "react";
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
  Trophy,
  Zap,
} from "lucide-react";
import Navbar from "../../../components/ui/navbar";
import { getCareerPaths } from "@/api/api";
import { getUserIdFromToken } from "@/app/lib/authCookies";

export default function CareerPath() {
  const [careerPaths, setCareerPaths] = useState<any[]>([]);
  const [selectedPathIndex, setSelectedPathIndex] = useState(0);

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId === null) return;
    getCareerPaths(userId).then((res) => {
      if (res.data && res.data.length > 0) {
        setCareerPaths(res.data);
      }
    });
  }, []);

  if (careerPaths.length === 0) return <p className="text-white p-4">Loading...</p>;

  const selectedPath = careerPaths[selectedPathIndex];
  const careerPath = selectedPath.path;
  const targetRole = selectedPath.targetRole;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar currentPage="careerpath" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Your Path to <span className="text-purple-400">{targetRole}</span>
            </h1>
            <p className="text-gray-300 text-lg">
              We've mapped out the steps to help you reach your dream role
            </p>
          </div>

          {/* Path Selector */}
          {careerPaths.length > 1 && (
            <select
              value={selectedPathIndex}
              onChange={(e) => setSelectedPathIndex(Number(e.target.value))}
              className="bg-slate-800 text-white px-3 py-2 rounded-md border border-purple-500"
            >
              {careerPaths.map((path, index) => (
                <option key={index} value={index}>
                  {path.targetRole}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Career Path Timeline */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Career Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {careerPath.map((step: any, index: number) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-8 border-l-2 border-purple-500/30 last:border-l-0 last:pb-0"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-2 border-purple-300"></div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-gray-400 text-sm uppercase tracking-wider">
                            {step.title}
                          </h3>
                          <h2 className="text-xl font-bold text-white">{step.role}</h2>
                          <p className="text-gray-300 mt-1">{step.description}</p>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-2">Key Skills Needed</h4>
                          <div className="flex flex-wrap gap-2">
                            {step.skills.map((skill: string, skillIndex: number) => (
                              <Badge
                                key={skillIndex}
                                variant={"default"}
                                className="text-blue-400 bg-blue-500/20 border-blue-500/30"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-2">Recommended Actions</h4>
                          <div className="space-y-3">
                            {step.actions.map((action: any, actionIndex: number) => (
                              <div
                                key={actionIndex}
                                className="bg-slate-700/30 rounded-lg p-3 border border-white/10"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h5 className="text-white font-medium">{action.title}</h5>
                                    <div className="flex items-center text-sm text-gray-400 mt-1 space-x-4">
                                      <span>{action.type}</span>
                                      <span className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {action.duration}
                                      </span>
                                      <span>{action.provider}</span>
                                    </div>
                                  </div>
                                  {/* {action.completed ? (
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
                                  )} */}
                                </div>
                                {/* {!action.completed && (
                                  <div className="mt-2">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-xs text-gray-400">Progress</span>
                                      <span className="text-xs text-gray-400">0%</span>
                                    </div>
                                    <Progress value={0} className="h-1" />
                                  </div>
                                )} */}
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

          {/* Right Column: Skills Progress / Recommended Learning */}
          <div className="space-y-8">
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
                  {careerPath[0].skills.map((skill: string, index: number) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">{skill}</span>
                        {/* <span className="text-gray-400 text-xs">{index === 0 ? "100%" : "0%"}</span> */}
                      </div>
                      {/* <Progress value={index === 0 ? 100 : 0} className="h-1" /> */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
