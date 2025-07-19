"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Star,
  Bookmark,
  Bell,
  ChevronRight,
  ExternalLink,
  Filter,
  X,
  Building,
} from "lucide-react";
import Navbar from "../../components/ui/navbar";

type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  match: number;
  description: string;
  posted: string;
  saved: boolean;
  source: "linkedin" | "indeed" | "company";
};

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [experienceFilter, setExperienceFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [activeTab, setActiveTab] = useState("recommended");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching jobs from API
  useEffect(() => {
    const fetchJobs = () => {
      setIsLoading(true);
      // Simulated API response
      setTimeout(() => {
        setJobs([
          {
            id: "1",
            title: "Senior Frontend Developer",
            company: "TechCorp",
            logo: "TC",
            location: "San Francisco, CA",
            type: "Full-time",
            salary: "$140,000 - $180,000",
            match: 92,
            description:
              "Build responsive web applications using React and TypeScript. Lead UI initiatives.",
            posted: "2 days ago",
            saved: false,
            source: "linkedin",
          },
          {
            id: "2",
            title: "UX/UI Designer",
            company: "DesignHub",
            logo: "DH",
            location: "Remote",
            type: "Contract",
            salary: "$50 - $70/hr",
            match: 85,
            description:
              "Create beautiful interfaces and design systems for enterprise clients.",
            posted: "1 week ago",
            saved: true,
            source: "indeed",
          },
          {
            id: "3",
            title: "Full Stack Engineer",
            company: "StartupXYZ",
            logo: "SX",
            location: "New York, NY",
            type: "Full-time",
            salary: "$120,000 - $150,000",
            match: 78,
            description: "Work across the stack with Node.js, React, and AWS.",
            posted: "3 days ago",
            saved: false,
            source: "company",
          },
          {
            id: "4",
            title: "Backend Developer",
            company: "DataSystems",
            logo: "DS",
            location: "Remote",
            type: "Full-time",
            salary: "$130,000 - $160,000",
            match: 65,
            description:
              "Develop scalable backend services with Python and Django.",
            posted: "5 days ago",
            saved: false,
            source: "linkedin",
          },
          {
            id: "5",
            title: "Product Manager",
            company: "ProductLabs",
            logo: "PL",
            location: "Austin, TX",
            type: "Full-time",
            salary: "$150,000 - $190,000",
            match: 72,
            description: "Lead product development from conception to launch.",
            posted: "1 day ago",
            saved: false,
            source: "indeed",
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter
      ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    const matchesExperience = experienceFilter
      ? experienceFilter === "entry"
        ? job.title.toLowerCase().includes("junior") ||
          job.title.toLowerCase().includes("entry")
        : experienceFilter === "mid"
        ? !job.title.toLowerCase().includes("senior") &&
          !job.title.toLowerCase().includes("junior")
        : job.title.toLowerCase().includes("senior") ||
          job.title.toLowerCase().includes("lead")
      : true;

    return matchesSearch && matchesLocation && matchesExperience;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.posted).getTime() - new Date(a.posted).getTime();
    } else if (sortBy === "recommended") {
      return b.match - a.match;
    }
    return 0;
  });

  // Save/unsave job
  const toggleSavedJob = (jobId: string) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, saved: !job.saved } : job
    );
    setJobs(updatedJobs);

    if (updatedJobs.find((job) => job.id === jobId)?.saved) {
      setSavedJobs([
        ...savedJobs,
        updatedJobs.find((job) => job.id === jobId)!,
      ]);
    } else {
      setSavedJobs(savedJobs.filter((job) => job.id !== jobId));
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setRemoteOnly(false);
    setExperienceFilter("");
    setIndustryFilter("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar currentPage="jobs" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-300 text-lg">
            Browse thousands of opportunities matched to your profile
          </p>
        </div>

        {/* Search and Filter Panel */}
        <Card className="bg-slate-800/50 border-white/10 mb-5 pt-6">
          <CardContent className="pl-[100px] ">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Job title, keyword, company"
                    className="pl-10 bg-slate-700 border-slate-600 "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Location"
                    className="pl-10 bg-slate-700 border-slate-600"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <Select
                  value={experienceFilter}
                  onValueChange={setExperienceFilter}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Select
                  value={industryFilter}
                  onValueChange={setIndustryFilter}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-between items-center mt-4 mb-4">
          <div className="flex items-center text-gray-400 text-lg font-bold">
            <Building className="mr-2 h-5 w-5 text-blue-500" />
            <span>{filteredJobs.length} jobs found</span>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-slate-800/50 border border-white/10">
            <TabsTrigger
              value="recommended"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-white"
            >
              Recommended for You
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white"
            >
              Trending Jobs
            </TabsTrigger>
            <TabsTrigger
              value="remote"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-white"
            >
              Remote Jobs
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-white"
            >
              Saved Jobs
            </TabsTrigger>
          </TabsList>

          {/* Recommended Jobs Tab */}
          <TabsContent value="recommended">
            <div className="grid grid-cols-1 gap-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                sortedJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="bg-slate-800/50 border-white/10 hover:border-white/30 transition-colors pt-6"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {job.logo}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">
                              {job.title}
                            </h3>
                            <p className="text-gray-300">{job.company}</p>
                            <div className="flex items-center text-sm text-gray-400 mt-2 space-x-4">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </span>
                              <span className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {job.type}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {job.posted}
                              </span>
                            </div>
                            <p className="text-gray-300 mt-3">
                              {job.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end mt-4 md:mt-0 space-y-3">
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            {job.match}% Match
                          </Badge>
                          <div className="text-white font-medium">
                            {job.salary}
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/20 text-gray-300 hover:bg-white/10"
                              onClick={() => toggleSavedJob(job.id)}
                            >
                              <Bookmark
                                className={`h-4 w-4 mr-2 ${
                                  job.saved
                                    ? "text-yellow-400 fill-yellow-400"
                                    : ""
                                }`}
                              />
                              {job.saved ? "Saved" : "Save"}
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Trending Jobs Tab */}
          <TabsContent value="trending">
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-slate-800/50 border-white/10 pt-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>Popular on LinkedIn</span>
                    <Badge
                      variant="outline"
                      className="border-blue-500/30 text-blue-400"
                    >
                      Powered by LinkedIn
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobs.slice(0, 4).map((job) => (
                      <div
                        key={job.id}
                        className="bg-slate-700/30 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-white font-semibold">
                              {job.title}
                            </h3>
                            <p className="text-gray-300">{job.company}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-white/20 text-red-500 bg-red-700/30"
                          >
                            Trending
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-400 mt-2 space-x-4">
                          <span>{job.location}</span>
                          <span>{job.type}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-3 text-blue-400 hover:bg-blue-400/10"
                        >
                          View Job <ExternalLink className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Remote Jobs Tab */}
          <TabsContent value="remote">
            <div className="grid grid-cols-1 gap-6">
              {jobs
                .filter((job) => job.location === "Remote")
                .map((job) => (
                  <Card
                    key={job.id}
                    className="bg-slate-800/50 border-white/10 pt-6"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-semibold">
                            {job.title}
                          </h3>
                          <p className="text-gray-300">{job.company}</p>
                          <div className="flex items-center text-sm text-gray-400 mt-2 space-x-4">
                            <span>Remote</span>
                            <span>{job.type}</span>
                            <span>{job.posted}</span>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Remote
                        </Badge>
                      </div>
                      <p className="text-gray-300 mt-3">{job.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-white font-medium">
                          {job.salary}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-gray-300 hover:bg-white/10"
                            onClick={() => toggleSavedJob(job.id)}
                          >
                            <Bookmark
                              className={`h-4 w-4 mr-2 ${
                                job.saved
                                  ? "text-yellow-400 fill-yellow-400"
                                  : ""
                              }`}
                            />
                            {job.saved ? "Saved" : "Save"}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Saved Jobs Tab */}
          <TabsContent value="saved">
            {savedJobs.length === 0 ? (
              <Card className="bg-slate-800/50 border-white/10 pt-6">
                <CardContent className="p-8 text-center">
                  <Bookmark className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">
                    No saved jobs yet
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Save jobs you're interested in to view them here
                  </p>
                  <Button
                    variant="outline"
                    className="border-white/20 text-gray-300 hover:bg-white/10"
                    onClick={() => setActiveTab("recommended")}
                  >
                    Browse Jobs
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {savedJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="bg-slate-800/50 border-white/10"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-semibold">
                            {job.title}
                          </h3>
                          <p className="text-gray-300">{job.company}</p>
                          <div className="flex items-center text-sm text-gray-400 mt-2 space-x-4">
                            <span>{job.location}</span>
                            <span>{job.type}</span>
                            <span>{job.posted}</span>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          Saved
                        </Badge>
                      </div>
                      <p className="text-gray-300 mt-3">{job.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-white font-medium">
                          {job.salary}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-gray-300 hover:bg-white/10"
                            onClick={() => toggleSavedJob(job.id)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Job Alerts Panel */}
        <Card className="bg-slate-800/50 border-white/10 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Job Alerts
              </div>
              <Button
                variant="ghost"
                className="text-blue-400 hover:bg-blue-400/10"
              >
                Manage Alerts
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-700/30 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-medium">
                      New Frontend jobs in San Francisco
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      5 new matches found
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:bg-blue-400/10"
                  >
                    View
                  </Button>
                </div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-medium">
                      Remote UI/UX Designer positions
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      3 new remote opportunities
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:bg-blue-400/10"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
