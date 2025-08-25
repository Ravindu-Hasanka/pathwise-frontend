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
  Lock,
} from "lucide-react";

type InputWithLabelProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  onBlur?: () => void;
  description?: string;
};
const InputWithLabel: React.FC<InputWithLabelProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
  onBlur,
  description,
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
    {description && <p className="mt-1 text-xs text-gray-400">{description}</p>}
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
      <SelectTrigger
        className={`mt-1 ${error ? "border-red-500" : ""}`}
        onBlur={onBlur}
      >
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
    address: string;
    phone: string;
    password: string;
    confirmPassword?: string;
    currentPosition: string;
    skills:  Array<{
       name : string;
    }>;
    //targetRole: string;
    currentIndustry: string;//industries
    //salaryExpectation: string;
    //expertiseArea?: string[];
    //hourlyRate?: string;
    description?: string;
    experiences?: Array<{
      job_role: string;
      company: string;
      started_at: string;
      ended_at: string;
    }>;
    educations?: Array<{
      institution: string;
      degree: string;
      startDate: string;
      endDate: string;
    }>;
  };

  const [formData, setFormData] = useState<FormData>({
    role: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    //currentRole: "",
    password: "",
    confirmPassword: "",
    skills: [{ name: "" }],
    currentPosition: "",
    currentIndustry: "",
    //salaryExpectation: "",
    //expertiseArea: [],
    //hourlyRate: "",
    description: "",
    experiences: [{ job_role: "", company: "", started_at: "", ended_at: "" }],
    educations: [
      { institution: "", degree: "", startDate: "", endDate: "" },
    ],
  });

  const router = useRouter();
  const totalSteps = 5;
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
  // const validateField = (name: string, value: any): string => {
  //   switch (name) {
  //     case "role":
  //       return !value ? "Please select a role" : "";
  //     case "name":
  //       return !value
  //         ? "Name is required"
  //         : value.length < 2
  //         ? "Name is too short"
  //         : "";
  //     case "email":
  //       return !value
  //         ? "Email is required"
  //         : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  //         ? "Invalid email format"
  //         : "";
  //     case "address":
  //       return !value ? "Address is required" : "";
  //     case "phone":
  //       return !value
  //         ? "Phone number is required"
  //         : !/^\d{10}$/.test(value)
  //         ? "Invalid phone number format"
  //         : "";
  //     case "password":
  //       if (!value) return "Password is required";
  //       if (value.length < 8) return "Password must be at least 8 characters";
  //       if (!/[A-Z]/.test(value))
  //         return "Password must contain at least one uppercase letter";
  //       if (!/[a-z]/.test(value))
  //         return "Password must contain at least one lowercase letter";
  //       if (!/[0-9]/.test(value))
  //         return "Password must contain at least one number";
  //       if (!/[^A-Za-z0-9]/.test(value))
  //         return "Password must contain at least one special character";
  //       return "";
  //     case "confirmPassword":
  //       if (!value) return "Please confirm your password";
  //       if (value !== formData.password) return "Passwords do not match";
  //       return "";
  //     case "currentRole":
  //       return formData.role === "JOB_SEEKER" && !value
  //         ? "Current role is required"
  //         : "";
  //     case "experience":
  //       return formData.role === "JOB_SEEKER" && !value
  //         ? "Experience level is required"
  //         : "";
  //     case "education":
  //       return formData.role === "JOB_SEEKER" && !value
  //         ? "Education level is required"
  //         : "";
  //     case "yearsOfExperience":
  //       return formData.role === "COACH" && !value
  //         ? "Years of experience is required"
  //         : "";
  //     case "hourlyRate":
  //       return formData.role === "COACH" && !value
  //         ? "Hourly rate is required"
  //         : "";
  //     case "skills":
  //       return formData.role === "JOB_SEEKER" && value.length < 3
  //         ? "Please select at least 3 skills"
  //         : "";
  //     case "interests":
  //       return formData.role === "JOB_SEEKER" && value.length < 1
  //         ? "Please select at least 1 interest"
  //         : "";
  //     case "preferredIndustries":
  //       return formData.role === "COACH" && (value?.length ?? 0) < 1
  //         ? "Please select at least 1 industry"
  //         : "";
  //     case "expertiseArea":
  //       return (value?.length ?? 0) < 1
  //         ? "Please add at least 1 expertise area"
  //         : "";
  //     case "targetRole":
  //       return formData.role === "JOB_SEEKER" && !value
  //         ? "Target role is required"
  //         : "";
  //     case "salaryExpectation":
  //       return formData.role === "JOB_SEEKER" && !value
  //         ? "Salary expectation is required"
  //         : "";
  //     case "description":
  //       return formData.role === "COACH" && (!value || value.length < 50)
  //         ? "Description must be at least 50 characters"
  //         : "";
  //     case "experienceGroups":
  //       if (!value || value.length === 0)
  //         return "Please add at least one experience";
  //       for (const group of value) {
  //         if (!group.role) return "Job role is required for all experiences";
  //         if (!group.company) return "Company is required for all experiences";
  //         if (!group.startDate)
  //           return "Start date is required for all experiences";
  //       }
  //       return "";
  //     case "educationGroups":
  //       if (!value || value.length === 0)
  //         return "Please add at least one education";
  //       for (const group of value) {
  //         if (!group.institution)
  //           return "Institution is required for all education entries";
  //         if (!group.degree)
  //           return "Degree name is required for all education entries";
  //         if (!group.startDate)
  //           return "Start date is required for all education entries";
  //       }
  //       return "";
  //     default:
  //       return "";
  //   }
  // };

  // Validate all fields for current step
  // const validateStep = (step: number): boolean => {
  //   const newErrors: Record<string, string> = {};

  //   if (step === 1) {
  //     newErrors.role = validateField("role", formData.role);
  //     newErrors.name = validateField("name", formData.name);
  //     newErrors.email = validateField("email", formData.email);
  //     newErrors.address = validateField("address", formData.address);
  //     newErrors.phone = validateField("phone", formData.phone);
  //     if (formData.role === "JOB_SEEKER") {
  //       newErrors.currentRole = validateField(
  //         "currentPosition",
  //         formData.currentPosition
  //       );
  //     }
  //   } else if (step === 2) {
  //     newErrors.password = validateField("password", formData.password);
  //     newErrors.confirmPassword = validateField(
  //       "confirmPassword",
  //       formData.confirmPassword
  //     );
  //   } else if (step === 3) {
  //     if (formData.role === "JOB_SEEKER") {
  //       newErrors.experience = validateField("experience", formData.experience);
  //       newErrors.education = validateField("education", formData.education);
  //     // } else if (formData.role === "COACH") {
  //     //   newErrors.yearsOfExperience = validateField(
  //     //     "yearsOfExperience",
  //     //     formData.yearsOfExperience
  //     //   );
  //     //   newErrors.hourlyRate = validateField("hourlyRate", formData.hourlyRate);
  //      }
  //   } else if (step === 4) {
  //     if (formData.role === "JOB_SEEKER") {
  //       newErrors.skills = validateField("skills", formData.skills);
  //       //newErrors.interests = validateField("interests", formData.interests);
  //     // } else if (formData.role === "COACH") {
  //     //   newErrors.preferredIndustries = validateField(
  //     //     "preferredIndustries",
  //     //     formData.preferredIndustries
  //     //   );
  //     //   newErrors.expertiseArea = validateField(
  //     //     "expertiseArea",
  //     //     formData.expertiseArea
  //     //   );
  //     // }
  //   } else if (step === 5) {
  //     if (formData.role === "JOB_SEEKER") {
  //       newErrors.targetRole = validateField("targetRole", formData.targetRole);
  //       newErrors.salaryExpectation = validateField(
  //         "salaryExpectation",
  //         formData.salaryExpectation
  //       );
  //     } else if (formData.role === "COACH") {
  //       newErrors.description = validateField(
  //         "description",
  //         formData.description
  //       );
  //     }
  //   }

  //   setErrors(newErrors);
  //   return Object.values(newErrors).every((error) => !error);
  // };

  // const handleBlur = (field: string) => {
  //   setTouched((prev) => ({ ...prev, [field]: true }));
  //   setErrors((prev) => ({
  //     ...prev,
  //     [field]: validateField(field, formData[field as keyof FormData]),
  //   }));
  // };

  const handleSkillToggle = (skillName: string) => {
  const isSelected = formData.skills.some(skill => skill.name === skillName);
  
  const newSkills = isSelected
    ? formData.skills.filter(skill => skill.name !== skillName)
    : [...formData.skills, { name: skillName }];

  setFormData((prev) => ({ ...prev, skills: newSkills }));
};

  // const handleInterestToggle = (interest: string) => {
  //   const newInterests = formData.interests.includes(interest)
  //     ? formData.interests.filter((i) => i !== interest)
  //     : [...formData.interests, interest];

  //   setFormData((prev) => ({ ...prev, interests: newInterests }));
  //   setErrors((prev) => ({
  //     ...prev,
  //     interests: validateField("interests", newInterests),
  //   }));
  // };

  // const handleIndustryToggle = (industry: string) => {
  //   const newIndustries = (formData.preferredIndustries ?? []).includes(
  //     industry
  //   )
  //     ? (formData.preferredIndustries ?? []).filter((i) => i !== industry)
  //     : [...(formData.preferredIndustries ?? []), industry];

  //   setFormData((prev) => ({ ...prev, preferredIndustries: newIndustries }));
  //   setErrors((prev) => ({
  //     ...prev,
  //     preferredIndustries: validateField("preferredIndustries", newIndustries),
  //   }));
  // };

  const handleNext = async () => {
    // const newTouched: Record<string, boolean> = {};
    // if (step === 1) {
    //   newTouched.role = true;
    //   newTouched.name = true;
    //   newTouched.email = true;
    //   newTouched.phone = true;
    //   newTouched.address = true;
    //   if (formData.role === "JOB_SEEKER") newTouched.currentRole = true;
    // } else if (step === 2) {
    //   if (formData.role === "JOB_SEEKER") {
    //     newTouched.experience = true;
    //     newTouched.education = true;
    //   } else if (formData.role === "COACH") {
    //     newTouched.yearsOfExperience = true;
    //     newTouched.hourlyRate = true;
    //   }
    // } else if (step === 3) {
    //   if (formData.role === "JOB_SEEKER") {
    //     newTouched.skills = true;
    //     newTouched.interests = true;
    //     newTouched.expertiseArea = true;
    //   } else if (formData.role === "COACH") {
    //     newTouched.preferredIndustries = true;
    //     newTouched.expertiseArea = true;
    //   }
    // } else if (step === 4) {
    //   if (formData.role === "JOB_SEEKER") {
    //     newTouched.targetRole = true;
    //     newTouched.salaryExpectation = true;
    //   } else if (formData.role === "COACH") {
    //     newTouched.description = true;
    //   }
    // }
    // setTouched((prev) => ({ ...prev, ...newTouched }));

    // // Validate current step
    // if (!validateStep(step)) {
    //   return;
    // }

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
                  // setErrors((prev) => ({
                  //   ...prev,
                  //   role: validateField("role", role),
                  // }));
                }}
              >
                <SelectTrigger
                  className={`mt-1 ${errors.role ? "border-red-500" : ""}`}
                  //onBlur={() => handleBlur("role")}
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
                //onBlur={() => handleBlur("name")}
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
                //onBlur={() => handleBlur("email")}
              />
              <InputWithLabel
                id="address"
                label="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                error={errors.address}
                //onBlur={() => handleBlur("address")}
              />
              <InputWithLabel
                id="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                error={errors.phone}
                //onBlur={() => handleBlur("phone")}
              />
              {formData.role === "JOB_SEEKER" && (
                <InputWithLabel
                  id="currentPosition"
                  label="Current Role"
                  value={formData.currentPosition}
                  onChange={(e) =>
                    setFormData({ ...formData, currentPosition: e.target.value })
                  }
                  error={errors.currentPosition}
                  //onBlur={() => handleBlur("currentPosition")}
                />
              )}
            </div>
          </div>
        );
      case 2:
        const getPasswordStrength = (password: string) => {
          let score = 0;
          if (password.length >= 8) score++;
          if (/[A-Z]/.test(password)) score++;
          if (/[0-9]/.test(password)) score++;
          if (/[^A-Za-z0-9]/.test(password)) score++;
          return score;
        };

        const passwordStrength = getPasswordStrength(formData.password);
        const strengthMessages = [
          "Very weak",
          "Weak",
          "Moderate",
          "Strong",
          "Very strong",
        ];
        const strengthColors = [
          "bg-red-500",
          "bg-yellow-500",
          "bg-yellow-300",
          "bg-green-400",
          "bg-green-500",
        ];
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Lock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">
                Secure your account
              </h2>
              <p className="text-gray-300">
                Create a strong password to protect your account
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <InputWithLabel
                id="password"
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                error={errors.password}
                //onBlur={() => handleBlur("password")}
                description="Use at least 8 characters with a mix of letters, numbers, and symbols"
              />

              <InputWithLabel
                id="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword || ""}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                type="password"
                error={errors.confirmPassword}
                //onBlur={() => handleBlur("confirmPassword")}
              />
            </div>

            <div className="bg-gray-800 p-4 rounded-lg mt-4">
              <h4 className="text-sm font-medium text-white mb-2">
                Password Strength
              </h4>
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i <= passwordStrength
                        ? strengthColors[passwordStrength]
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-300">
                {formData.password.length > 0
                  ? `Password strength: ${strengthMessages[passwordStrength]}`
                  : "Enter a password to check strength"}
              </p>
            </div>
          </div>
        );
      case 3:
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
              <div className="space-y-4">
                <Label className="text-white text-lg">Your Education</Label>

                {(formData.educations?.length
                  ? formData.educations
                  : [
                      {
                        institution: "",
                        degree: "",
                        startDate: "",
                        endDate: "",
                      },
                    ]
                ).map((group, index) => (
                  <div
                    key={index}
                    className="space-y-4 p-4 border border-gray-700 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-white font-medium">
                        Education #{index + 1}
                      </h4>
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newGroups = [
                              ...(formData.educations || []),
                            ];
                            newGroups.splice(index, 1);
                            setFormData({
                              ...formData,
                              educations: newGroups.length
                                ? newGroups
                                : undefined,
                            });
                          }}
                          className="text-red-500 hover:bg-red-500/10 p-2 h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Institution</Label>
                        <Input
                          value={group.institution}
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.educations|| []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              institution: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              educations: newGroups,
                            });
                          }}
                          placeholder="e.g. Harvard University"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Degree Name</Label>
                        <Input
                          value={group.degree}
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.educations || []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              degree: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              educations: newGroups,
                            });
                          }}
                          placeholder="e.g. Bachelor of Science in Computer Science"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Started At</Label>
                        <input
                          type="date"
                          value={group.startDate || ""}
                           className="
    flex h-10 w-full rounded-md border border-gray-700 
    bg-black text-white px-3 py-2 text-base 
    placeholder-gray-400 focus:outline-none focus:ring-2 
    focus:ring-purple-500 focus:border-purple-500 
    disabled:cursor-not-allowed disabled:opacity-50
    md:text-sm
  "
                          
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.educations || []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              startDate: e.target.value, // string (yyyy-mm-dd)
                            };
                            setFormData({
                              ...formData,
                              educations: newGroups,
                            });
                          }}
                        />
                      </div>

                      <div>
                        <Label className="text-white">End At</Label>
                        <input
                          type="date"
                          value={group.endDate || ""}
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.educations || []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              endDate: e.target.value, // string (yyyy-mm-dd)
                            };
                            setFormData({
                              ...formData,
                              educations: newGroups,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      educations: [
                        ...(formData.educations || []),
                        {
                          institution: "",
                          degree: "",
                          startDate: "",
                          endDate: "",
                        },
                      ],
                    });
                  }}
                  className="text-blue-500 border-blue-500/50 hover:bg-blue-500/10 w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Education
                </Button>
              </div>
            </div>
          );
        
        return null;
      case 4:
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
                selected={formData.skills.map(skill => skill.name)}
                toggle={handleSkillToggle}
                color="blue"
                error={errors.skills}
                minSelection={3}
              />
              {/* <Label className="text-white text-lg mb-4 block">
                Target Industries
              </Label>
              <BadgeSelector
                options={interestOptions}
                selected={formData.interests}
                toggle={handleInterestToggle}
                color="purple"
                error={errors.interests}
                minSelection={1}
              /> */}
              <div className="space-y-4">
                <Label className="text-white text-lg">Your Experience</Label>

                {(formData.experiences &&
                formData.experiences.length > 0
                  ? formData.experiences
                  : [{ job_role: "", company: "", started_at: "", ended_at: "" }]
                ).map((group, index) => (
                  <div
                    key={index}
                    className="space-y-4 p-4 border border-gray-700 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-white font-medium">
                        Experience #{index + 1}
                      </h4>
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newGroups = [
                              ...(formData.experiences || []),
                            ];
                            newGroups.splice(index, 1);
                            setFormData({
                              ...formData,
                              experiences: newGroups.length
                                ? newGroups
                                : undefined,
                            });
                          }}
                          className="text-red-500 hover:bg-red-500/10 p-2 h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Job Role</Label>
                        <Input
                          value={(group as { job_role: string }).job_role || ""}
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.experiences || []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              job_role: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              experiences: newGroups,
                            });
                          }}
                          placeholder="e.g. Software Engineer"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Company</Label>
                        <Input
                          value={group.company || ""}
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.experiences || []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              company: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              experiences: newGroups,
                            });
                          }}
                          placeholder="e.g. Google"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Started At</Label>
                        <Input
                          type="date"
                          value={group.started_at || ""}
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.experiences || []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              started_at: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              experiences: newGroups,
                            });
                          }}
                        />
                      </div>

                      <div>
                        <Label className="text-white">End At</Label>
                        <Input
                          type="date"
                          value={group.ended_at || ""}
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.experiences || []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              ended_at: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              experiences: newGroups,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      experiences: [
                        ...(formData.experiences || []),
                        { job_role: "", company: "", started_at: "", ended_at: "" },
                      ],
                    });
                  }}
                  className="text-blue-500 border-blue-500/50 hover:bg-blue-500/10 w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Experience
                </Button>
              </div>
            </div>
          </div>
        );

      case 5:
        // if (formData.role === "JOB_SEEKER") {
        //   return (
        //     <div className="space-y-6">
        //       <div className="text-center mb-8">
        //         <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" />
        //         <h2 className="text-3xl font-bold text-white mb-2">
        //           Career Goals
        //         </h2>
        //         <p className="text-gray-300">Define your career aspirations</p>
        //       </div>
        //       <InputWithLabel
        //         id="targetRole"
        //         label="Target Role"
        //         value={formData.targetRole}
        //         onChange={(e) =>
        //           setFormData({ ...formData, targetRole: e.target.value })
        //         }
        //         error={errors.targetRole}
        //         onBlur={() => handleBlur("targetRole")}
        //       />
        //       <div className="mt-6">
        //         <Label className="text-white">Salary Expectation</Label>
        //         <SelectDropdown
        //           value={formData.salaryExpectation}
        //           setValue={(value) =>
        //             setFormData({ ...formData, salaryExpectation: value })
        //           }
        //           options={["30-50k", "50-75k", "75-100k", "100-150k", "150k+"]}
        //           error={errors.salaryExpectation}
        //           onBlur={() => handleBlur("salaryExpectation")}
        //         />
        //       </div>
        //     </div>
        //   );
        // }
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
                //onBlur={() => handleBlur("description")}
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
                disabled={Object.values(errors).some((error) => error)}
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
