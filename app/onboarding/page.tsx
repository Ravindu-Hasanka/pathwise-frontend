"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { ArrowRight, ArrowLeft, User, Briefcase, Target, Zap } from "lucide-react";

type InputWithLabelProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({ id, label, value, onChange, type = "text" }) => (
  <div>
    <Label htmlFor={id} className="text-white">{label}</Label>
    <Input id={id} value={value} onChange={onChange} type={type} className="mt-1" />
  </div>
);

type SelectDropdownProps = {
  value: string;
  setValue: (value: string) => void;
  options: string[];
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({ value, setValue, options }) => (
  <Select value={value} onValueChange={setValue}>
    <SelectTrigger className="mt-1">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      {options.map(option => (
        <SelectItem key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

type BadgeSelectorProps = {
  options: string[];
  selected: string[];
  toggle: (value: string) => void;
  color?: string;
};

const BadgeSelector: React.FC<BadgeSelectorProps> = ({ options, selected, toggle, color = "blue" }) => (
  <div className="flex flex-wrap gap-2">
    {options.map(option => (
      <Badge
        key={option}
        onClick={() => toggle(option)}
        className={`cursor-pointer select-none ${
          selected.includes(option)
            ? `bg-${color}-500 text-white`
            : "bg-slate-700 text-gray-200"
        }`}
        variant={selected.includes(option) ? "default" : "outline"}
      >
        {option}
      </Badge>
    ))}
  </div>
);

const Onboarding = () => {
  const [step, setStep] = useState(1);
  type FormData = {
    name: string;
    email: string;
    location: string;
    currentRole: string;
    experience: string;
    education: string;
    skills: string[];
    interests: string[];
    careerGoals: string;
    targetRole: string;
    targetIndustry: string;
    salaryExpectation: string;
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    location: "",
    currentRole: "",
    experience: "",
    education: "",
    skills: [],
    interests: [],
    careerGoals: "",
    targetRole: "",
    targetIndustry: "",
    salaryExpectation: ""
  });

  const router = useRouter();
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const skillOptions = [
    "JavaScript", "Python", "React", "Node.js", "SQL", "AWS", "Docker",
    "Machine Learning", "Data Analysis", "Project Management", "UX Design",
    "Marketing", "Sales", "Communication", "Leadership", "Analytics"
  ];

  const interestOptions = [
    "Technology", "Healthcare", "Finance", "Education", "E-commerce",
    "Gaming", "Media", "Startups", "Enterprise", "Non-profit"
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      router.push("/dashboard"); // Final step completed
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Let's get to know you</h2>
              <p className="text-gray-300">Tell us about yourself to personalize your experience</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWithLabel id="name" label="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <InputWithLabel id="email" label="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" />
              <InputWithLabel id="location" label="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
              <InputWithLabel id="currentRole" label="Current Role" value={formData.currentRole} onChange={e => setFormData({ ...formData, currentRole: e.target.value })} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Briefcase className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Your Experience</h2>
              <p className="text-gray-300">Help us understand your background</p>
            </div>
            <div className="space-y-6">
              <Label className="text-white">Years of Experience</Label>
              <SelectDropdown value={formData.experience} setValue={(value) => setFormData({ ...formData, experience: value })} options={["0-1", "2-3", "4-6", "7-10", "10+"]} />
              <Label className="text-white">Highest Education</Label>
              <SelectDropdown value={formData.education} setValue={(value) => setFormData({ ...formData, education: value })} options={["high-school", "associates", "bachelors", "masters", "phd", "bootcamp"]} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Skills & Interests</h2>
              <p className="text-gray-300">Select your skills and areas of interest</p>
            </div>
            <div className="space-y-8">
              <Label className="text-white text-lg mb-4 block">Your Skills</Label>
              <BadgeSelector options={skillOptions} selected={formData.skills} toggle={handleSkillToggle} color="blue" />
              <Label className="text-white text-lg mb-4 block">Industries of Interest</Label>
              <BadgeSelector options={interestOptions} selected={formData.interests} toggle={handleInterestToggle} color="purple" />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Career Goals</h2>
              <p className="text-gray-300">Define your career aspirations</p>
            </div>
            <InputWithLabel id="targetRole" label="Target Role" value={formData.targetRole} onChange={e => setFormData({ ...formData, targetRole: e.target.value })} />
            <Label className="text-white">Preferred Industry</Label>
            <SelectDropdown value={formData.targetIndustry} setValue={(value) => setFormData({ ...formData, targetIndustry: value })} options={["technology", "healthcare", "finance", "education", "ecommerce", "media"]} />
            <Label className="text-white">Salary Expectation</Label>
            <SelectDropdown value={formData.salaryExpectation} setValue={(value) => setFormData({ ...formData, salaryExpectation: value })} options={["30-50k", "50-75k", "75-100k", "100-150k", "150k+"]} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-white font-bold text-xl">Pathwise</span>
          </div>
          <p className="text-gray-300">Complete your profile to get personalized recommendations</p>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Step {step} of {totalSteps}</span>
            <span className="text-sm text-gray-300">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <Card className="bg-slate-800/50 border-white/10 backdrop-blur-sm">
          <CardContent className="p-8">
            {renderStep()}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
              <Button variant="outline" onClick={handleBack} disabled={step === 1} className="border-white/20 text-gray-300 hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                {step === totalSteps ? "Complete Setup" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
