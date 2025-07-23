"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import coach1 from "../../utils/images/coach1.jpg";
import coach2 from "../../utils/images/coach2.jpg";
import coach3 from "../../utils/images/coach3.jpg";
import coach4 from "../../utils/images/coach4.jpeg";
import coach5 from "../../utils/images/coach5.jpg";
import { useRouter } from "next/navigation";

export const coachDetails = [
  {
    id: 1,
    profile_pic: coach1,
    name: "Robert Johnson",
    expertise: "Data Science / Analytics Career Coaching",
    rating: 4.9,
    student_count: 982941,
    createdAt: "2024-05-12",
    description:
      "I am a seasoned Data Science and Analytics Career Coach with over a decade of experience helping aspiring and mid-career professionals break into and grow within the data-driven world. With a strong background in machine learning, statistical analysis, and business intelligence, Robert blends technical expertise with real-world hiring insights to guide clients through every stage of their journey—from learning the right tools (like Python, SQL, Tableau, and R) to building standout portfolios and acing technical interviews. Whether you're transitioning into data from a non-technical role or aiming to move from analyst to data scientist, Robert offers personalized coaching that bridges the gap between theory and practice, positioning you for success in today's competitive tech landscape.",
  },
  {
    id: 2,
    profile_pic: coach2,
    name: "Emily Chen",
    expertise: "Frontend Development / React Career Coaching",
    rating: 3.8,
    student_count: 842371,
    createdAt: "2024-05-18",
    description:
      "With over 8 years of experience in frontend engineering and design systems, I help developers build elegant, scalable, and performant web interfaces. I specialize in mentoring React developers—from mastering hooks and state management to implementing pixel-perfect designs using Tailwind, MUI, or custom styles. I guide students in building impressive frontend portfolios, preparing for technical interviews, and understanding the hiring expectations of startups and tech giants alike. Whether you're looking to break into frontend dev or transition from a design background, I’ll help you get there.",
  },
  {
    id: 3,
    profile_pic: coach3,
    name: "Amit Patel",
    expertise: "Full Stack / MERN Stack Career Coaching",
    rating: 2.7,
    student_count: 698214,
    createdAt: "2024-06-02",
    description:
      "I'm a Full Stack Engineer and career mentor with a strong focus on the MERN stack—MongoDB, Express, React, and Node.js. Having worked across both startups and large enterprises, I help students grasp the full development lifecycle, write clean APIs, manage databases effectively, and deploy robust applications. I also mentor on how to build project portfolios that stand out on GitHub and impress recruiters. Whether you’re starting from scratch or pivoting from another tech field, I’m here to support your transition into full stack development.",
  },
  {
    id: 4,
    profile_pic: coach4,
    name: "Sofia Martinez",
    expertise: "UX/UI Design Career Coaching",
    rating: 4.85,
    student_count: 504321,
    createdAt: "2024-06-10",
    description:
      "As a UX/UI Design Coach with over 10 years of experience, I specialize in helping creatives and problem-solvers transition into product design roles. My mentorship includes design thinking principles, Figma prototyping, user research methods, and building design portfolios that hiring managers love. I've helped students land roles at companies like Adobe, Shopify, and Google. If you're ready to move beyond Dribbble shots and into real product teams, I’ll show you how to think like a UX strategist and design with business impact.",
  },
  {
    id: 5,
    profile_pic: coach5,
    name: "Liam O'Connor",
    expertise: "DevOps / Cloud Engineering Career Coaching",
    rating: 2.6,
    student_count: 391204,
    createdAt: "2024-06-20",
    description:
      "I'm a certified DevOps and Cloud Coach with hands-on expertise in AWS, Azure, Docker, and Kubernetes. My goal is to demystify cloud infrastructure and CI/CD pipelines for developers and sysadmins looking to evolve their careers. I help learners master automation tools, build cloud-native applications, and pass certifications like AWS Solutions Architect and CKAD. Whether you're aiming for an SRE role or simply want to scale your ops knowledge, I’ll guide you with structured learning paths and real-world deployment projects.",
  },
];

export default function ExplorePage() {
  const [selectedSortByOption, setSelectedSortByOption] =
    React.useState("Latest");
  const selectedSortByOptions = ["Latest", "Oldest", "Most Popular"];
  const [selectedCategory, setSelectedCategory] =
    React.useState("All Categories");
  const [selectedRating, setSelectedRating] = React.useState("All Ratings");
  const [searchValue, setSearchValue] = React.useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log("Search text:", e.target.value);
  };
  const router = useRouter();

  const handleCoachClick = (id: number) => {
    router.push(`/user/explore/coach-details/${id}`);
  };

  const sortedCoaches = [...coachDetails].sort((a, b) => {
    if (selectedSortByOption === "Latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (selectedSortByOption === "Oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (selectedSortByOption === "Most Popular") {
      return b.student_count - a.student_count;
    } else {
      return 0;
    }
  });

  const filteredCoaches = sortedCoaches.filter((coach) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      coach.expertise.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesRating =
      selectedRating === "All Ratings" ||
      coach.rating >= parseInt(selectedRating[0]);

    const matchesSearch =
      searchValue === "" ||
      coach.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      coach.expertise.toLowerCase().includes(searchValue.toLowerCase());

    return matchesCategory && matchesRating && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Bar */}
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
                href="/user/explore"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Coaches
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

      <div className="flex justify-center items-start px-4 py-8">
        <div className="flex gap-4">
          {/* Search Input */}
          <div className="flex flex-col gap-2">
            <p className="text-gray-400 text-sm">Search:</p>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search here..."
                className="pl-10"
                value={searchValue}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Dropdown 1 */}
          <div className="relative w-72">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-sm">Sort by:</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-base text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-accent cursor-pointer">
                    {selectedSortByOption}
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-full bg-purple-900">
                  {selectedSortByOptions.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onSelect={() => setSelectedSortByOption(option)}
                      className="flex h-10 w-72 items-center rounded-md px-3 py-2 text-base text-foreground bg-slate-50 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Dropdown 2  */}
          <div className="relative w-72">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-sm">Category:</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-base text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-accent cursor-pointer">
                    {selectedCategory}
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-full bg-purple-900">
                  {[
                    "All Categories",
                    "Data & AI",
                    "Frontend Development",
                    "UI/UX Design",
                  ].map((option) => (
                    <React.Fragment key={option}>
                      <DropdownMenuItem
                        onSelect={() => setSelectedCategory(option)}
                        className="flex h-10 w-72 items-center rounded-md px-3 py-2 text-base text-foreground bg-slate-50 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                      >
                        {option}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Dropdown 3 */}
          <div className="relative w-72">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-sm">Rating:</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-base text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-accent cursor-pointer">
                    {selectedRating}
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-full bg-purple-900">
                  {[
                    "All Ratings",
                    "4 Stars & Up",
                    "3 Stars & Up",
                    "2 Stars & Up",
                  ].map((option) => (
                    <React.Fragment key={option}>
                      <DropdownMenuItem
                        onSelect={() => setSelectedRating(option)}
                        className="flex h-10 items-center w-72 rounded-md px-3 py-2 text-base text-foreground bg-slate-50 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                      >
                        {option}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* card slider */}

      <div>
        <Carousel className="w-full max-w-7xl mx-auto">
          <CarouselContent>
            {filteredCoaches.map((coach, i) => (
              <CarouselItem
                key={coach.id}
                className="basis-1/4"
                onClick={() => handleCoachClick(coach.id)}
              >
                <Card className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 h-full">
                  <CardContent className="p-1">
                    <div className="flex justify-center">
                      <Image
                        src={coach.profile_pic}
                        width={300}
                        height={200}
                        alt="Coach profile"
                        className=" object-cover rounded-md"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <p className="text-blue-300 text-sm font-medium">
                          {coach.name}
                        </p>
                        <p className="text-white text-sm font-bold">
                          {coach.expertise}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center justify-between align-middle gap-2">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <p className="text-white text-sm font-bold">
                          {coach.rating}
                        </p>
                      </div>
                      <div className="flex items-center justify-between align-middle gap-2">
                        <Users className="h-3 w-3 text-blue-400" />
                        <p className="text-white text-sm font-bold">
                          {coach.student_count} students
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
