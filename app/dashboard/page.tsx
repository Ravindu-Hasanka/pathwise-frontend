import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import {
  Target,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  DollarSign,
  BarChart3,
  Trophy,
  Zap,
} from "lucide-react";

export default function Dashboard() {
  const careerMatches = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$140,000 - $180,000",
      match: 92,
      type: "Full-time"
    },
    {
      title: "Lead Developer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$120,000 - $160,000",
      match: 88,
      type: "Remote"
    },
    {
      title: "Software Architect",
      company: "Enterprise Inc",
      location: "New York, NY",
      salary: "$160,000 - $200,000",
      match: 85,
      type: "Hybrid"
    }
  ];

  const learningModules = [
    {
      title: "Advanced React Patterns",
      provider: "Coursera",
      duration: "6 weeks",
      rating: 4.8,
      price: "Free"
    },
    {
      title: "System Design Fundamentals",
      provider: "Udemy",
      duration: "4 weeks",
      rating: 4.9,
      price: "$49"
    },
    {
      title: "AWS Cloud Practitioner",
      provider: "AWS",
      duration: "8 weeks",
      rating: 4.7,
      price: "$99"
    }
  ];

  const achievements = [
    { title: "Profile Completed", icon: Trophy, earned: true },
    { title: "First Skill Assessment", icon: Target, earned: true },
    { title: "Career Path Defined", icon: Award, earned: true },
    { title: "First Job Application", icon: Briefcase, earned: false },
    { title: "Networking Champion", icon: Users, earned: false },
    { title: "Learning Streak", icon: BookOpen, earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-white font-bold text-xl">Pathwise</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-white font-medium">
                Dashboard
              </Link>
              <Link
                href="/career-path"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Career Path
              </Link>
              <Link
                href="/skills"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Skills
              </Link>
              <Link
                href="/jobs"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Jobs
              </Link>
              <Link
                href="/community"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Community
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">Alex Thompson</p>
                <p className="text-gray-400 text-sm">Software Developer</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AT</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-gray-300 text-lg">Ready to take your career to the next level?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Career Match</p>
                  <p className="text-white text-3xl font-bold">92%</p>
                </div>
                <Target className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Skills Mastered</p>
                  <p className="text-white text-3xl font-bold">24</p>
                </div>
                <Award className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Job Matches</p>
                  <p className="text-white text-3xl font-bold">127</p>
                </div>
                <Briefcase className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">XP Points</p>
                  <p className="text-white text-3xl font-bold">1,847</p>
                </div>
                <Zap className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Progress */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Career Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Profile Completion</span>
                      <span className="text-white font-semibold">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Skill Development</span>
                      <span className="text-white font-semibold">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Job Search Progress</span>
                      <span className="text-white font-semibold">58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Matches */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Top Job Matches
                </CardTitle>
                <Link href="/jobs">
                  <Button variant="ghost" className="text-blue-400 hover:bg-blue-400/10">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careerMatches.map((job, index) => (
                    <div key={index} className="bg-slate-700/30 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-semibold">{job.title}</h3>
                          <p className="text-gray-300">{job.company}</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {job.match}% Match
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-400 space-x-4">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </span>
                        <Badge variant="outline" className="border-white/20 text-gray-300">
                          {job.type}
                        </Badge>
                      </div>
                      <Button className="mt-3 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        Apply Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Learning Recommendations */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Recommended Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningModules.map((module, index) => (
                    <div key={index} className="bg-slate-700/30 rounded-lg p-4 border border-white/10">
                      <h4 className="text-white font-medium mb-1">{module.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{module.provider}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {module.duration}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span className="text-yellow-400">{module.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-green-400 font-medium">{module.price}</span>
                        <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
                          Enroll
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        achievement.earned 
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500" 
                          : "bg-slate-700"
                      }`}>
                        <achievement.icon className={`h-6 w-6 ${
                          achievement.earned ? "text-white" : "text-gray-500"
                        }`} />
                      </div>
                      <p className={`text-xs ${
                        achievement.earned ? "text-white" : "text-gray-500"
                      }`}>
                        {achievement.title}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Challenge */}
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Weekly Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <h3 className="text-white font-semibold mb-2">Complete 3 Skill Assessments</h3>
                  <p className="text-gray-300 text-sm mb-4">Earn 500 XP and unlock new career insights</p>
                  <Progress value={33} className="mb-4" />
                  <p className="text-sm text-gray-300">1 of 3 completed</p>
                  <Button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Continue Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};