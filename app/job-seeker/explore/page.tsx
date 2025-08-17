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
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import {coachDetails} from "../explore/coachDetails";

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
    router.push(`/job-seeker/explore/coach-details/${id}`);
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
      <Navbar currentPage="coaches" />

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
