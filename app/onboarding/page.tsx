"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { createJobSeeker, createCoach } from "../../api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Textarea } from "../../components/ui/textarea";
import Swal from "sweetalert2";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  Target,
  Zap,
  MessageCircle,
  X,
  Plus,
  UserCheck,
  BookOpen,
  AlertCircle,
} from "lucide-react";

type InputWithLabelProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  onBlur?: () => void;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
  onBlur,
}) => (
  <div>
    <Label htmlFor={id} className="text-white">
      {label}
    </Label>
    <Input
      id={id}
      value={value}
      onChange={onChange}
      type={type}
      className={`mt-1 ${error ? "border-red-500" : ""}`}
      onBlur={onBlur}
    />
    {error && (
      <p className="mt-1 text-sm text-red-500 flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

type SelectDropdownProps = {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  error?: string;
  onBlur?: () => void;
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  value,
  setValue,
  options,
  error,
  onBlur,
}) => (
  <div>
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className={`mt-1 ${error ? "border-red-500" : ""}`} onBlur={onBlur}>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && (
      <p className="mt-1 text-sm text-red-500 flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

type BadgeSelectorProps = {
  options: string[];
  selected: string[];
  toggle: (value: string) => void;
  color?: string;
  error?: string;
  minSelection?: number;
};

const BadgeSelector: React.FC<BadgeSelectorProps> = ({
  options,
  selected,
  toggle,
  color = "blue",
  error,
  minSelection = 1,
}) => (
  <div>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
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
    {error && (
      <p className="mt-1 text-sm text-red-500 flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        {error}
      </p>
    )}
    {minSelection > 0 && selected.length < minSelection && (
      <p className="mt-1 text-sm text-yellow-500 flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        Please select at least {minSelection} option(s)
      </p>
    )}
  </div>
);

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  type FormData = {
    role: "JOB_SEEKER" | "COACH" | "";
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
    expertiseArea?: string[];
    yearsOfExperience?: string;
    preferredIndustries?: string[];
    hourlyRate?: string;
    description?: string;
  };

  const [formData, setFormData] = useState<FormData>({
    role: "",
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
    salaryExpectation: "",
    expertiseArea: [],
    yearsOfExperience: "",
    preferredIndustries: [],
    hourlyRate: "",
    description: "",
  });

  const router = useRouter();
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const skillOptions = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "SQL",
    "AWS",
    "Docker",
    "Machine Learning",
    "Data Analysis",
    "Project Management",
    "UX Design",
    "Marketing",
    "Sales",
    "Communication",
    "Leadership",
    "Analytics",
  ];

  const interestOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "E-commerce",
    "Gaming",
    "Media",
    "Startups",
    "Enterprise",
    "Non-profit",
  ];

  const expertiseAreaOptions = [
    "Career Development",
    "Leadership",
    "Technical Skills",
    "Entrepreneurship",
    "Communication Skills",
    "Personal Growth",
    "Job Search Strategies",
    "Team Management",
    "Work-Life Balance",
    "Interview Preparation",
  ];

  const yearsOfExperienceOptions = [
    "0-1 years",
    "2-3 years",
    "4-6 years",
    "7-10 years",
    "10+ years",
  ];

  const hourlyRateOptions = [
    "Under $50/hr",
    "$50 - $100/hr",
    "$100 - $200/hr",
    "$200 - $300/hr",
    "$300+",
  ];

  // Validation rules
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "role":
        return !value ? "Please select a role" : "";
      case "name":
        return !value ? "Name is required" : value.length < 2 ? "Name is too short" : "";
      case "email":
        return !value 
          ? "Email is required" 
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
            ? "Invalid email format" 
            : "";
      case "location":
        return !value ? "Location is required" : "";
      case "currentRole":
        return formData.role === "JOB_SEEKER" && !value ? "Current role is required" : "";
      case "experience":
        return formData.role === "JOB_SEEKER" && !value ? "Experience level is required" : "";
      case "education":
        return formData.role === "JOB_SEEKER" && !value ? "Education level is required" : "";
      case "yearsOfExperience":
        return formData.role === "COACH" && !value ? "Years of experience is required" : "";
      case "hourlyRate":
        return formData.role === "COACH" && !value ? "Hourly rate is required" : "";
      case "skills":
        return formData.role === "JOB_SEEKER" && value.length < 3 
          ? "Please select at least 3 skills" 
          : "";
      case "interests":
        return formData.role === "JOB_SEEKER" && value.length < 1 
          ? "Please select at least 1 interest" 
          : "";
      case "preferredIndustries":
        return formData.role === "COACH" && (value?.length ?? 0) < 1 
          ? "Please select at least 1 industry" 
          : "";
      case "expertiseArea":
        return (value?.length ?? 0) < 1 
          ? "Please add at least 1 expertise area" 
          : "";
      case "targetRole":
        return formData.role === "JOB_SEEKER" && !value ? "Target role is required" : "";
      case "salaryExpectation":
        return formData.role === "JOB_SEEKER" && !value ? "Salary expectation is required" : "";
      case "description":
        return formData.role === "COACH" && (!value || value.length < 50) 
          ? "Description must be at least 50 characters" 
          : "";
      default:
        return "";
    }
  };

  // Validate all fields for current step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      newErrors.role = validateField("role", formData.role);
      newErrors.name = validateField("name", formData.name);
      newErrors.email = validateField("email", formData.email);
      newErrors.location = validateField("location", formData.location);
      if (formData.role === "JOB_SEEKER") {
        newErrors.currentRole = validateField("currentRole", formData.currentRole);
      }
    } else if (step === 2) {
      if (formData.role === "JOB_SEEKER") {
        newErrors.experience = validateField("experience", formData.experience);
        newErrors.education = validateField("education", formData.education);
      } else if (formData.role === "COACH") {
        newErrors.yearsOfExperience = validateField("yearsOfExperience", formData.yearsOfExperience);
        newErrors.hourlyRate = validateField("hourlyRate", formData.hourlyRate);
      }
    } else if (step === 3) {
      if (formData.role === "JOB_SEEKER") {
        newErrors.skills = validateField("skills", formData.skills);
        newErrors.interests = validateField("interests", formData.interests);
      } else if (formData.role === "COACH") {
        newErrors.preferredIndustries = validateField("preferredIndustries", formData.preferredIndustries);
        newErrors.expertiseArea = validateField("expertiseArea", formData.expertiseArea);
      }
    } else if (step === 4) {
      if (formData.role === "JOB_SEEKER") {
        newErrors.targetRole = validateField("targetRole", formData.targetRole);
        newErrors.salaryExpectation = validateField("salaryExpectation", formData.salaryExpectation);
      } else if (formData.role === "COACH") {
        newErrors.description = validateField("description", formData.description);
      }
    }
    
    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, formData[field as keyof FormData])
    }));
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : [...formData.skills, skill];
    
    setFormData(prev => ({ ...prev, skills: newSkills }));
    setErrors(prev => ({
      ...prev,
      skills: validateField("skills", newSkills)
    }));
  };

  const handleInterestToggle = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    
    setFormData(prev => ({ ...prev, interests: newInterests }));
    setErrors(prev => ({
      ...prev,
      interests: validateField("interests", newInterests)
    }));
  };

  const handleIndustryToggle = (industry: string) => {
    const newIndustries = (formData.preferredIndustries ?? []).includes(industry)
      ? (formData.preferredIndustries ?? []).filter((i) => i !== industry)
      : [...(formData.preferredIndustries ?? []), industry];
    
    setFormData(prev => ({ ...prev, preferredIndustries: newIndustries }));
    setErrors(prev => ({
      ...prev,
      preferredIndustries: validateField("preferredIndustries", newIndustries)
    }));
  };

  const handleNext = async () => {
     
    const newTouched: Record<string, boolean> = {};
    if (step === 1) {
      newTouched.role = true;
      newTouched.name = true;
      newTouched.email = true;
      newTouched.location = true;
      if (formData.role === "JOB_SEEKER") newTouched.currentRole = true;
    } else if (step === 2) {
      if (formData.role === "JOB_SEEKER") {
        newTouched.experience = true;
        newTouched.education = true;
      } else if (formData.role === "COACH") {
        newTouched.yearsOfExperience = true;
        newTouched.hourlyRate = true;
      }
    } else if (step === 3) {
      if (formData.role === "JOB_SEEKER") {
        newTouched.skills = true;
        newTouched.interests = true;
        newTouched.expertiseArea = true;
      } else if (formData.role === "COACH") {
        newTouched.preferredIndustries = true;
        newTouched.expertiseArea = true;
      }
    } else if (step === 4) {
      if (formData.role === "JOB_SEEKER") {
        newTouched.targetRole = true;
        newTouched.salaryExpectation = true;
      } else if (formData.role === "COACH") {
        newTouched.description = true;
      }
    }
    setTouched(prev => ({ ...prev, ...newTouched }));

    // Validate current step
    if (!validateStep(step)) {
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      try {
        if (formData.role === "JOB_SEEKER") {
          await createJobSeeker(formData);
          Swal.fire("Success", "Profile created successfully!", "success");
          router.push("/dashboard");
        } else if (formData.role === "COACH") {
          await createCoach(formData);
          Swal.fire("Success", "Profile created successfully!", "success");
          router.push("/coach/dashboard");
        }
      } catch (error: any) {
        console.error(error);
        Swal.fire(
          "Error",
          error.response?.data?.message || "Something went wrong",
          "error"
        );
      }
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
              <h2 className="text-3xl font-bold text-white mb-2">
                Let's get to know you
              </h2>
              <p className="text-gray-300">
                Tell us about yourself to personalize your experience
              </p>
            </div>
            <div className="mb-6">
              <Label className="text-white">Select your role</Label>
              <Select
                value={formData.role}
                onValueChange={(role) => {
                  setFormData({
                    ...formData,
                    role: role as "JOB_SEEKER" | "COACH",
                  });
                  setErrors(prev => ({
                    ...prev,
                    role: validateField("role", role)
                  }));
                }}
              >
                <SelectTrigger
                  className={`mt-1 ${errors.role ? "border-red-500" : ""}`}
                  onBlur={() => handleBlur("role")}
                >
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JOB_SEEKER">Job Seeker</SelectItem>
                  <SelectItem value="COACH">Coach</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.role}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWithLabel
                id="name"
                label="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                error={errors.name}
                onBlur={() => handleBlur("name")}
              />
              <InputWithLabel
                id="email"
                label="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                error={errors.email}
                onBlur={() => handleBlur("email")}
              />
              <InputWithLabel
                id="location"
                label="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                error={errors.location}
                onBlur={() => handleBlur("location")}
              />
              {formData.role === "JOB_SEEKER" && (
                <InputWithLabel
                  id="currentRole"
                  label="Current Role"
                  value={formData.currentRole}
                  onChange={(e) =>
                    setFormData({ ...formData, currentRole: e.target.value })
                  }
                  error={errors.currentRole}
                  onBlur={() => handleBlur("currentRole")}
                />
              )}
            </div>
          </div>
        );
      case 2:
        if (formData.role === "JOB_SEEKER") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Briefcase className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">
                  Your Experience
                </h2>
                <p className="text-gray-300">
                  Help us understand your background
                </p>
              </div>
              <div className="mt-6">
                <Label className="text-white">Years of Experience</Label>
                <SelectDropdown
                  value={formData.experience}
                  setValue={(value) =>
                    setFormData({ ...formData, experience: value })
                  }
                  options={["0-1", "2-3", "4-6", "7-10", "10+"]}
                  error={errors.experience}
                  onBlur={() => handleBlur("experience")}
                />
              </div>
              <div className="mt-6">
                <Label className="text-white">Highest Education</Label>
                <SelectDropdown
                  value={formData.education}
                  setValue={(value) =>
                    setFormData({ ...formData, education: value })
                  }
                  options={[
                    "high-school",
                    "associates",
                    "bachelors",
                    "masters",
                    "phd",
                    "bootcamp",
                  ]}
                  error={errors.education}
                  onBlur={() => handleBlur("education")}
                />
              </div>
            </div>
          );
        } else if (formData.role === "COACH") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <BookOpen className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">
                  Your Coaching Experience
                </h2>
                <p className="text-gray-300">Tell us about your expertise</p>
              </div>
              <Label className="text-white mt-9">Years of Experience</Label>
              <SelectDropdown
                value={formData.yearsOfExperience || ""}
                setValue={(value) =>
                  setFormData({ ...formData, yearsOfExperience: value })
                }
                options={yearsOfExperienceOptions}
                error={errors.yearsOfExperience}
                onBlur={() => handleBlur("yearsOfExperience")}
              />
              <Label className="text-white pt-6">Hourly Rate</Label>
              <SelectDropdown
                value={formData.hourlyRate || ""}
                setValue={(value) =>
                  setFormData({ ...formData, hourlyRate: value })
                }
                options={hourlyRateOptions}
                error={errors.hourlyRate}
                onBlur={() => handleBlur("hourlyRate")}
              />
            </div>
          );
        }
        return null;
      case 3:
        if (formData.role === "JOB_SEEKER") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">
                  Skills & Interests
                </h2>
                <p className="text-gray-300">
                  Your Skills, Expertise & Industry Focus
                </p>
              </div>
              <div className="space-y-8">
                <Label className="text-white text-lg mb-4 block">
                  Your Skills
                </Label>
                <BadgeSelector
                  options={skillOptions}
                  selected={formData.skills}
                  toggle={handleSkillToggle}
                  color="blue"
                  error={errors.skills}
                  minSelection={3}
                />
                <Label className="text-white text-lg mb-4 block">
                  Target Industries
                </Label>
                <BadgeSelector
                  options={interestOptions}
                  selected={formData.interests}
                  toggle={handleInterestToggle}
                  color="purple"
                  error={errors.interests}
                  minSelection={1}
                />
                 <div className="space-y-4">
                <Label className="text-white text-lg">
                  Your Expertise Areas
                </Label>
                {(formData.expertiseArea?.length
                  ? formData.expertiseArea
                  : [""]
                ).map((area, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={area}
                      onChange={(e) => {
                        const newExpertiseAreas = [
                          ...(formData.expertiseArea || [""]),
                        ];
                        newExpertiseAreas[index] = e.target.value;
                        setFormData({
                          ...formData,
                          expertiseArea: newExpertiseAreas,
                        });
                        setErrors(prev => ({
                          ...prev,
                          expertiseArea: validateField("expertiseArea", newExpertiseAreas)
                        }));
                      }}
                      className="flex-1"
                      placeholder="Enter your expertise area"
                      onBlur={() => handleBlur("expertiseArea")}
                    />
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newExpertiseAreas = (
                            formData.expertiseArea || [""]
                          ).filter((_, i) => i !== index);
                          setFormData({
                            ...formData,
                            expertiseArea: newExpertiseAreas.length
                              ? newExpertiseAreas
                              : [],
                          });
                          setErrors(prev => ({
                            ...prev,
                            expertiseArea: validateField("expertiseArea", newExpertiseAreas)
                          }));
                        }}
                        className="text-red-500 hover:bg-red-500/10 p-2 h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      expertiseArea: [...(formData.expertiseArea || [""]), ""],
                    });
                  }}
                  className="text-blue-500 border-blue-500/50 hover:bg-blue-500/10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                {errors.expertiseArea && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.expertiseArea}
                  </p>
                )}
              </div>
              </div>
            </div>
          );
        }
        if (formData.role === "COACH") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">
                  Focus Industries
                </h2>
                <p className="text-gray-300">
                  Select your focus industries
                </p>
              </div>
              <div className="space-y-8">
                <Label className="text-white text-lg mb-4 block">
                  Preferred Industries
                </Label>
                <BadgeSelector
                  options={interestOptions}
                  selected={formData.preferredIndustries ?? []}
                  toggle={handleIndustryToggle}
                  color="purple"
                  error={errors.preferredIndustries}
                  minSelection={1}
                />
              </div>
              <div className="space-y-4">
                <Label className="text-white text-lg">
                  Your Expertise Areas
                </Label>
                {(formData.expertiseArea?.length
                  ? formData.expertiseArea
                  : [""]
                ).map((area, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={area}
                      onChange={(e) => {
                        const newExpertiseAreas = [
                          ...(formData.expertiseArea || [""]),
                        ];
                        newExpertiseAreas[index] = e.target.value;
                        setFormData({
                          ...formData,
                          expertiseArea: newExpertiseAreas,
                        });
                        setErrors(prev => ({
                          ...prev,
                          expertiseArea: validateField("expertiseArea", newExpertiseAreas)
                        }));
                      }}
                      className="flex-1"
                      placeholder="Enter your expertise area"
                      onBlur={() => handleBlur("expertiseArea")}
                    />
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newExpertiseAreas = (
                            formData.expertiseArea || [""]
                          ).filter((_, i) => i !== index);
                          setFormData({
                            ...formData,
                            expertiseArea: newExpertiseAreas.length
                              ? newExpertiseAreas
                              : [],
                          });
                          setErrors(prev => ({
                            ...prev,
                            expertiseArea: validateField("expertiseArea", newExpertiseAreas)
                          }));
                        }}
                        className="text-red-500 hover:bg-red-500/10 p-2 h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      expertiseArea: [...(formData.expertiseArea || [""]), ""],
                    });
                  }}
                  className="text-blue-500 border-blue-500/50 hover:bg-blue-500/10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                {errors.expertiseArea && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.expertiseArea}
                  </p>
                )}
              </div>
            </div>
          );
        }
      case 4:
        if (formData.role === "JOB_SEEKER") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">
                  Career Goals
                </h2>
                <p className="text-gray-300">Define your career aspirations</p>
              </div>
              <InputWithLabel
                id="targetRole"
                label="Target Role"
                value={formData.targetRole}
                onChange={(e) =>
                  setFormData({ ...formData, targetRole: e.target.value })
                }
                error={errors.targetRole}
                onBlur={() => handleBlur("targetRole")}
              />
              <div className="mt-6">
                <Label className="text-white">Salary Expectation</Label>
                <SelectDropdown
                  value={formData.salaryExpectation}
                  setValue={(value) =>
                    setFormData({ ...formData, salaryExpectation: value })
                  }
                  options={["30-50k", "50-75k", "75-100k", "100-150k", "150k+"]}
                  error={errors.salaryExpectation}
                  onBlur={() => handleBlur("salaryExpectation")}
                />
              </div>
            </div>
          );
        }
        if (formData.role === "COACH") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <MessageCircle className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">
                  About You as a Coach
                </h2>
                <p className="text-gray-300">
                  Describe your coaching approach and expertise
                </p>
              </div>
              <Label htmlFor="coachDescription" className="text-white">
                Description (Users will see this)
              </Label>
              <Textarea
                id="coachDescription"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Write a brief description about yourself and your coaching style..."
                rows={4}
                className={`mt-1 ${errors.description ? "border-red-500" : ""}`}
                onBlur={() => handleBlur("description")}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </p>
              )}
              <p className="text-sm text-gray-400 mt-1">
                {formData.description?.length || 0}/50 characters (minimum)
              </p>
            </div>
          );
        }
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
          <p className="text-gray-300">
            Complete your profile to get personalized recommendations
          </p>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-gray-300">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <Card className="bg-slate-800/50 border-white/10 backdrop-blur-sm">
          <CardContent className="p-8">
            {renderStep()}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="border-white/20 text-gray-300 hover:bg-white/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={Object.values(errors).some(error => error)}
              >
                {step === totalSteps ? "Complete Setup" : "Next"}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;