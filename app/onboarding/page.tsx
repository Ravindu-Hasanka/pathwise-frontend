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
  GraduationCap,
  Presentation,
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
  placeholder?: string;
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
  placeholder,
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
      placeholder={placeholder}
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
    contactNo: string;
    password: string;
    confirmPassword?: string;
    currentPosition: string;
    currentIndustry: string;
    description?: string;

    skillList: Array<{
      skillName: string;
    }>;

    industryList?: Array<{
      industryName: string;
      jobRoleDtos: Array<{
        jobRoleName: string;
        minSalary?: number;
        maxSalary?: number;
        hourlyConsultingSalary?: number;
      }>;
    }>;

    experienceList?: Array<{
      jobTitle: string;
      companyName: string;
      startedAt: string;
      endedAt: string;
    }>;

    educationList?: Array<{
      educationName: string;
      institute: string;
      startedAt: string;
      endedAt: string;
    }>;
  };

  const [formData, setFormData] = useState<FormData>({
    role: "",
    name: "",
    email: "",
    address: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
    skillList: [],
    currentPosition: "",
    currentIndustry: "",
    description: "",
    experienceList: [
      { jobTitle: "", companyName: "", startedAt: "", endedAt: "" },
    ],
    educationList: [
      { educationName: "", institute: "", startedAt: "", endedAt: "" },
    ],
    industryList: [
      {
        industryName: "",
        jobRoleDtos: [
          {
            jobRoleName: "",
            minSalary: 0,
            maxSalary: 0,
            hourlyConsultingSalary: 0,
          },
        ],
      },
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

  const hourlyRateOptions = [
    "Under $50/hr",
    "$50 - $100/hr",
    "$100 - $200/hr",
    "$200 - $300/hr",
    "$300+",
  ];

  // Validation functions
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "role":
        return !value ? "Please select a role" : "";
      case "name":
        if (!value) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";
      case "address":
        return !value ? "Address is required" : "";
      case "contactNo":
        if (!value) return "Phone number is required";
        if (!/^\+?[0-9]{10,15}$/.test(value.replace(/\s/g, "")))
          return "Please enter a valid phone number";
        return "";
      case "currentPosition":
        return formData.role === "JOB_SEEKER" && !value
          ? "Current position is required"
          : "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])/.test(value))
          return "Password must contain at least one lowercase letter";
        if (!/(?=.*[A-Z])/.test(value))
          return "Password must contain at least one uppercase letter";
        if (!/(?=.*\d)/.test(value))
          return "Password must contain at least one number";
        if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value))
          return "Password must contain at least one special character";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      case "skills":
        return formData.skillList.length < 2
          ? "Please select at least 3 skills"
          : "";
      case "description":
        if (formData.role === "COACH") {
          if (!value) return "Description is required for coaches";
          if (value.length < 50)
            return "Description must be at least 50 characters";
        }
        return "";
      case "industryList":
        if (
          !formData.industryList ||
          formData.industryList.length === 0 ||
          !formData.industryList[0].industryName
        )
          return "At least one industry is required";
        return "";
      case "educationList":
        if (
          !formData.educationList ||
          formData.educationList.length === 0 ||
          !formData.educationList[0].institute ||
          !formData.educationList[0].educationName
        )
          return "At least one education entry is required";
        return "";
      case "experienceList":
        if (
          !formData.experienceList ||
          formData.experienceList.length === 0 ||
          !formData.experienceList[0].jobTitle ||
          !formData.experienceList[0].companyName
        )
          return "At least one experience entry is required";
        return "";
      default:
        return "";
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        newErrors.role = validateField("role", formData.role);
        newErrors.name = validateField("name", formData.name);
        newErrors.email = validateField("email", formData.email);
        newErrors.address = validateField("address", formData.address);
        newErrors.contactNo = validateField("contactNo", formData.contactNo);
        newErrors.currentPosition = validateField(
          "currentPosition",
          formData.currentPosition
        );
        break;
      case 2:
        newErrors.password = validateField("password", formData.password);
        newErrors.confirmPassword = validateField(
          "confirmPassword",
          formData.confirmPassword
        );
        break;
      case 3:
        newErrors.educationList = validateField(
          "educationList",
          formData.educationList
        );
        break;
      case 4:
        newErrors.skills = validateField("skills", formData.skillList);
        newErrors.experienceList = validateField(
          "experienceList",
          formData.experienceList
        );
        break;
      case 5:
        newErrors.industryList = validateField(
          "industryList",
          formData.industryList
        );
        if (formData.role === "COACH") {
          newErrors.description = validateField(
            "description",
            formData.description
          );
        }
        break;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field as keyof FormData]);
    if (error) {
      setErrors({ ...errors, [field]: error });
    } else {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSkillToggle = (skillName: string) => {
    const isSelected = formData.skillList.some(
      (skill) => skill.skillName === skillName
    );

    const newSkills = isSelected
      ? formData.skillList.filter((skill) => skill.skillName !== skillName)
      : [...formData.skillList, { skillName }];

    setFormData((prev) => ({ ...prev, skillList: newSkills }));

    // Validate skills after update
    if (touched.skills) {
      const error = validateField("skills", newSkills);
      if (error) {
        setErrors({ ...errors, skills: error });
      } else {
        const newErrors = { ...errors };
        delete newErrors.skills;
        setErrors(newErrors);
      }
    }
  };

  const handleNext = async () => {
    const newTouched: Record<string, boolean> = { ...touched };

    switch (step) {
      case 1:
        Object.keys(formData).forEach((key) => {
          if (
            [
              "role",
              "name",
              "email",
              "address",
              "contactNo",
              "currentPosition",
            ].includes(key)
          ) {
            newTouched[key] = true;
          }
        });
        break;
      case 2:
        newTouched.password = true;
        newTouched.confirmPassword = true;
        break;
      case 3:
        newTouched.educationList = true;
        break;
      case 4:
        newTouched.skills = true;
        newTouched.experienceList = true;
        break;
      case 5:
        newTouched.industryList = true;
        if (formData.role === "COACH") {
          newTouched.description = true;
        }
        break;
    }

    setTouched(newTouched);

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
            <div className="text-center mb-8 mt-3">
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
                  if (touched.role) {
                    const error = validateField("role", role);
                    setErrors({ ...errors, role: error });
                  }
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
                placeholder="e.g. John Doe"
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
                placeholder="e.g. johndoe@example.com"
              />
              <InputWithLabel
                id="address"
                label="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                error={errors.address}
                onBlur={() => handleBlur("address")}
                placeholder="e.g. 123 Main Street, Colombo, Sri Lanka"
              />
              <InputWithLabel
                id="phone"
                label="Phone Number"
                value={formData.contactNo}
                onChange={(e) =>
                  setFormData({ ...formData, contactNo: e.target.value })
                }
                error={errors.contactNo}
                onBlur={() => handleBlur("contactNo")}
                placeholder="e.g. +94771234567"
              />
              {formData.role === "JOB_SEEKER" && (
                <InputWithLabel
                  id="currentPosition"
                  label="Current Role"
                  value={formData.currentPosition}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPosition: e.target.value,
                    })
                  }
                  error={errors.currentPosition}
                  onBlur={() => handleBlur("currentPosition")}
                  placeholder="e.g. Software Engineer, Marketing Manager"
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
            <div className="text-center mb-8 mt-3">
              <Lock className="h-12 w-12 text-red-400 mx-auto mb-4" />
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
                onBlur={() => handleBlur("password")}
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
                onBlur={() => handleBlur("confirmPassword")}
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
            <div className="text-center mb-8 mt-3">
              <GraduationCap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">
                Your Education
              </h2>
              <p className="text-gray-300">
                Share your academic background and qualifications
              </p>
            </div>
            {errors.educationList && (
              <div className="p-3 bg-red-500/10 border border-red-500 rounded-md">
                <p className="text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.educationList}
                </p>
              </div>
            )}
            <div className="space-y-4">
              {(formData.educationList?.length
                ? formData.educationList
                : [
                    {
                      educationName: "",
                      institute: "",
                      startedAt: "",
                      endedAt: "",
                    },
                  ]
              ).map((group, index) => (
                <div
                  key={index}
                  className="space-y-4 p-4 border border-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">
                      Education {index + 1}
                    </h4>
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newGroups = [...(formData.educationList || [])];
                          newGroups.splice(index, 1);
                          setFormData({
                            ...formData,
                            educationList: newGroups.length
                              ? newGroups
                              : undefined,
                          });
                          if (touched.educationList) {
                            const error = validateField(
                              "educationList",
                              newGroups.length ? newGroups : []
                            );
                            setErrors({ ...errors, educationList: error });
                          }
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
                        value={group.institute}
                        onChange={(e) => {
                          const newGroups = [...(formData.educationList || [])];
                          newGroups[index] = {
                            ...newGroups[index],
                            institute: e.target.value,
                          };
                          setFormData({
                            ...formData,
                            educationList: newGroups,
                          });
                        }}
                        placeholder="e.g. Harvard University"
                        onBlur={() => {
                          if (touched.educationList) {
                            const error = validateField(
                              "educationList",
                              formData.educationList
                            );
                            setErrors({ ...errors, educationList: error });
                          }
                        }}
                      />
                    </div>

                    <div>
                      <Label className="text-white">Degree Name</Label>
                      <Input
                        value={group.educationName}
                        onChange={(e) => {
                          const newGroups = [...(formData.educationList || [])];
                          newGroups[index] = {
                            ...newGroups[index],
                            educationName: e.target.value,
                          };
                          setFormData({
                            ...formData,
                            educationList: newGroups,
                          });
                        }}
                        placeholder="e.g. Bachelor of Science in Computer Science"
                        onBlur={() => {
                          if (touched.educationList) {
                            const error = validateField(
                              "educationList",
                              formData.educationList
                            );
                            setErrors({ ...errors, educationList: error });
                          }
                        }}
                      />
                    </div>

                    <div>
                      <Label className="text-white">Started At</Label>
                      <Input
                        type="date"
                        value={group.startedAt || ""}
                        onChange={(e) => {
                          const newGroups = [...(formData.educationList || [])];
                          newGroups[index] = {
                            ...newGroups[index],
                            startedAt: e.target.value,
                          };
                          setFormData({
                            ...formData,
                            educationList: newGroups,
                          });
                        }}
                        onBlur={() => {
                          if (touched.educationList) {
                            const error = validateField(
                              "educationList",
                              formData.educationList
                            );
                            setErrors({ ...errors, educationList: error });
                          }
                        }}
                      />
                    </div>

                    <div>
                      <Label className="text-white">Ended At</Label>
                      <Input
                        type="date"
                        value={group.endedAt || ""}
                        onChange={(e) => {
                          const newGroups = [...(formData.educationList || [])];
                          newGroups[index] = {
                            ...newGroups[index],
                            endedAt: e.target.value,
                          };
                          setFormData({
                            ...formData,
                            educationList: newGroups,
                          });
                        }}
                        onBlur={() => {
                          if (touched.educationList) {
                            const error = validateField(
                              "educationList",
                              formData.educationList
                            );
                            setErrors({ ...errors, educationList: error });
                          }
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
                    educationList: [
                      ...(formData.educationList || []),
                      {
                        institute: "",
                        educationName: "",
                        startedAt: "",
                        endedAt: "",
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
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8 mt-3">
              <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">
                Skills & Experiences
              </h2>
              <p className="text-gray-300">
                Highlight your skills, expertise, and professional journey
              </p>
            </div>

            {errors.skills && (
              <div className="p-3 bg-red-500/10 border border-red-500 rounded-md">
                <p className="text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.skills}
                </p>
              </div>
            )}

            {errors.experienceList && (
              <div className="p-3 bg-red-500/10 border border-red-500 rounded-md">
                <p className="text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.experienceList}
                </p>
              </div>
            )}

            <div className="space-y-8">
              <Label className="text-white text-lg mb-4 block">
                Your Skills
              </Label>
              <BadgeSelector
                options={skillOptions}
                selected={formData.skillList.map((skill) => skill.skillName)}
                toggle={handleSkillToggle}
                color="blue"
                error={errors.skills}
                minSelection={3}
              />

              <div className="space-y-4">
                <Label className="text-white text-lg">Your Experiences</Label>

                {(formData.experienceList && formData.experienceList.length > 0
                  ? formData.experienceList
                  : [
                      {
                        jobTitle: "",
                        companyName: "",
                        startedAt: "",
                        endedAt: "",
                      },
                    ]
                ).map((group, index) => (
                  <div
                    key={index}
                    className="space-y-4 p-4 border border-gray-700 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-white font-medium">
                        Experience {index + 1}
                      </h4>
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newGroups = [
                              ...(formData.experienceList || []),
                            ];
                            newGroups.splice(index, 1);
                            setFormData({
                              ...formData,
                              experienceList: newGroups.length
                                ? newGroups
                                : undefined,
                            });
                            if (touched.experienceList) {
                              const error = validateField(
                                "experienceList",
                                newGroups.length ? newGroups : []
                              );
                              setErrors({ ...errors, experienceList: error });
                            }
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
                          value={(group as { jobTitle: string }).jobTitle || ""}
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.experienceList || []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              jobTitle: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              experienceList: newGroups,
                            });
                          }}
                          placeholder="e.g. Software Engineer"
                          onBlur={() => {
                            if (touched.experienceList) {
                              const error = validateField(
                                "experienceList",
                                formData.experienceList
                              );
                              setErrors({ ...errors, experienceList: error });
                            }
                          }}
                        />
                      </div>

                      <div>
                        <Label className="text-white">Company</Label>
                        <Input
                          value={group.companyName || ""}
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.experienceList || []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              companyName: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              experienceList: newGroups,
                            });
                          }}
                          placeholder="e.g. Google"
                          onBlur={() => {
                            if (touched.experienceList) {
                              const error = validateField(
                                "experienceList",
                                formData.experienceList
                              );
                              setErrors({ ...errors, experienceList: error });
                            }
                          }}
                        />
                      </div>

                      <div>
                        <Label className="text-white">Started At</Label>
                        <Input
                          type="date"
                          value={group.startedAt || ""}
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.experienceList || []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              startedAt: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              experienceList: newGroups,
                            });
                          }}
                          onBlur={() => {
                            if (touched.experienceList) {
                              const error = validateField(
                                "experienceList",
                                formData.experienceList
                              );
                              setErrors({ ...errors, experienceList: error });
                            }
                          }}
                        />
                      </div>

                      <div>
                        <Label className="text-white">End At</Label>
                        <Input
                          type="date"
                          value={group.endedAt || ""}
                          onChange={(e) => {
                            const newGroups = [
                              ...(formData.experienceList || []),
                            ];
                            newGroups[index] = {
                              ...newGroups[index],
                              endedAt: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              experienceList: newGroups,
                            });
                          }}
                          onBlur={() => {
                            if (touched.experienceList) {
                              const error = validateField(
                                "experienceList",
                                formData.experienceList
                              );
                              setErrors({ ...errors, experienceList: error });
                            }
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
                      experienceList: [
                        ...(formData.experienceList || []),
                        {
                          jobTitle: "",
                          companyName: "",
                          startedAt: "",
                          endedAt: "",
                        },
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
        return (
          <>
            <div className="space-y-6">
              <div className="text-center mb-8 mt-3">
                {formData.role === "JOB_SEEKER" && (
                  <>
                    <Briefcase className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Your Industry & Job Preferences
                    </h2>
                    <p className="text-gray-300">
                      Add the industries you’re interested in and the job roles
                      you’re seeking.
                    </p>
                  </>
                )}
                {formData.role === "COACH" && (
                  <>
                    <MessageCircle className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Your Industries & Coaching Profile
                    </h2>
                    <p className="text-gray-300">
                      Add the industries you can teach and tell us a bit about
                      your coaching approach and expertise.
                    </p>
                  </>
                )}
              </div>
               {errors.industryList && (
              <div className="p-3 bg-red-500/10 border border-red-500 rounded-md">
                <p className="text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.industryList}
                </p>
              </div>
            )}

              <div className="space-y-4">
                <Label className="text-white text-lg">
                  Industries & Job Roles
                </Label>

                {(formData.industryList && formData.industryList.length > 0
                  ? formData.industryList
                  : [
                      {
                        industryName: "",
                        jobRoleDtos: [
                          {
                            jobRoleName: "",
                            minSalary: 0,
                            maxSalary: 0,
                            hourlyConsultingSalary: 0,
                          },
                        ],
                      },
                    ]
                ).map((industry, industryIndex) => (
                  <div
                    key={industryIndex}
                    className="space-y-4 p-4 border border-gray-700 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-white font-medium">
                        Industry {industryIndex + 1}
                      </h4>
                      {industryIndex > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newIndustries = [
                              ...(formData.industryList || []),
                            ];
                            newIndustries.splice(industryIndex, 1);
                            setFormData({
                              ...formData,
                              industryList: newIndustries.length
                                ? newIndustries
                                : [],
                            });
                          }}
                          className="text-red-500 hover:bg-red-500/10 p-2 h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label className="text-white">Industry Name</Label>
                        <Input
                          value={industry.industryName || ""}
                          onChange={(e) => {
                            const newIndustries = [
                              ...(formData.industryList || []),
                            ];
                            newIndustries[industryIndex] = {
                              ...newIndustries[industryIndex],
                              industryName: e.target.value,
                            };
                            setFormData({
                              ...formData,
                              industryList: newIndustries,
                            });
                          }}
                          placeholder="e.g. Technology, Healthcare, Finance"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-white">Job Roles</Label>

                        {(industry.jobRoleDtos &&
                        industry.jobRoleDtos.length > 0
                          ? industry.jobRoleDtos
                          : [
                              {
                                jobRoleName: "",
                                minSalary: 0,
                                maxSalary: 0,
                                hourlyConsultingSalary: 0,
                              },
                            ]
                        ).map((jobRole, jobRoleIndex) => (
                          <div
                            key={jobRoleIndex}
                            className="p-3 border border-gray-600 rounded-md"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300 text-sm">
                                Job Role {jobRoleIndex + 1}
                              </span>
                              {jobRoleIndex > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newIndustries = [
                                      ...(formData.industryList || []),
                                    ];
                                    const newJobRoles = [
                                      ...newIndustries[industryIndex]
                                        .jobRoleDtos,
                                    ];
                                    newJobRoles.splice(jobRoleIndex, 1);

                                    newIndustries[industryIndex] = {
                                      ...newIndustries[industryIndex],
                                      jobRoleDtos: newJobRoles,
                                    };

                                    setFormData({
                                      ...formData,
                                      industryList: newIndustries,
                                    });
                                  }}
                                  className="text-red-500 hover:bg-red-500/10 p-1 h-6 w-6"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label className="text-white text-sm">
                                  Job Role Name
                                </Label>
                                <Input
                                  value={jobRole.jobRoleName || ""}
                                  onChange={(e) => {
                                    const newIndustries = [
                                      ...(formData.industryList || []),
                                    ];
                                    const newJobRoles = [
                                      ...newIndustries[industryIndex]
                                        .jobRoleDtos,
                                    ];

                                    newJobRoles[jobRoleIndex] = {
                                      ...newJobRoles[jobRoleIndex],
                                      jobRoleName: e.target.value,
                                    };

                                    newIndustries[industryIndex] = {
                                      ...newIndustries[industryIndex],
                                      jobRoleDtos: newJobRoles,
                                    };

                                    setFormData({
                                      ...formData,
                                      industryList: newIndustries,
                                    });
                                  }}
                                  placeholder="e.g. Software Developer"
                                  className="text-sm"
                                  onBlur={() => {
                                    if (touched.industryList) {
                                      const error = validateField(
                                        "industryList",
                                        formData.industryList
                                      );
                                      setErrors({
                                        ...errors,
                                        industryList: error,
                                      });
                                    }
                                  }}
                                />
                              </div>

                              <div>
                                <Label className="text-white text-sm">
                                  Min Salary ($)
                                </Label>
                                <Input
                                  type="number"
                                  value={jobRole.minSalary || 0}
                                  onChange={(e) => {
                                    const newIndustries = [
                                      ...(formData.industryList || []),
                                    ];
                                    const newJobRoles = [
                                      ...newIndustries[industryIndex]
                                        .jobRoleDtos,
                                    ];

                                    newJobRoles[jobRoleIndex] = {
                                      ...newJobRoles[jobRoleIndex],
                                      minSalary: Number(e.target.value),
                                    };

                                    newIndustries[industryIndex] = {
                                      ...newIndustries[industryIndex],
                                      jobRoleDtos: newJobRoles,
                                    };

                                    setFormData({
                                      ...formData,
                                      industryList: newIndustries,
                                    });
                                  }}
                                  className="text-sm"
                                   onBlur={() => {
                                    if (touched.industryList) {
                                      const error = validateField(
                                        "industryList",
                                        formData.industryList
                                      );
                                      setErrors({
                                        ...errors,
                                        industryList: error,
                                      });
                                    }
                                  }}
                                />
                              </div>

                              <div>
                                <Label className="text-white text-sm">
                                  Max Salary ($)
                                </Label>
                                <Input
                                  type="number"
                                  value={jobRole.maxSalary || 0}
                                  onChange={(e) => {
                                    const newIndustries = [
                                      ...(formData.industryList || []),
                                    ];
                                    const newJobRoles = [
                                      ...newIndustries[industryIndex]
                                        .jobRoleDtos,
                                    ];

                                    newJobRoles[jobRoleIndex] = {
                                      ...newJobRoles[jobRoleIndex],
                                      maxSalary: Number(e.target.value),
                                    };

                                    newIndustries[industryIndex] = {
                                      ...newIndustries[industryIndex],
                                      jobRoleDtos: newJobRoles,
                                    };

                                    setFormData({
                                      ...formData,
                                      industryList: newIndustries,
                                    });
                                  }}
                                  className="text-sm"
                                   onBlur={() => {
                                    if (touched.industryList) {
                                      const error = validateField(
                                        "industryList",
                                        formData.industryList
                                      );
                                      setErrors({
                                        ...errors,
                                        industryList: error,
                                      });
                                    }
                                  }}
                                />
                              </div>

                              {formData.role === "COACH" && (
                                <div>
                                  <Label className="text-white text-sm">
                                    Hourly Rate ($)
                                  </Label>
                                  <Input
                                    type="number"
                                    value={jobRole.hourlyConsultingSalary || 0}
                                    onChange={(e) => {
                                      const newIndustries = [
                                        ...(formData.industryList || []),
                                      ];
                                      const newJobRoles = [
                                        ...newIndustries[industryIndex]
                                          .jobRoleDtos,
                                      ];

                                      newJobRoles[jobRoleIndex] = {
                                        ...newJobRoles[jobRoleIndex],
                                        hourlyConsultingSalary: Number(
                                          e.target.value
                                        ),
                                      };

                                      newIndustries[industryIndex] = {
                                        ...newIndustries[industryIndex],
                                        jobRoleDtos: newJobRoles,
                                      };

                                      setFormData({
                                        ...formData,
                                        industryList: newIndustries,
                                      });
                                    }}
                                    className="text-sm"
                                     onBlur={() => {
                                    if (touched.industryList) {
                                      const error = validateField(
                                        "industryList",
                                        formData.industryList
                                      );
                                      setErrors({
                                        ...errors,
                                        industryList: error,
                                      });
                                    }
                                  }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newIndustries = [
                              ...(formData.industryList || []),
                            ];
                            const newJobRoles = [
                              ...newIndustries[industryIndex].jobRoleDtos,
                            ];

                            newJobRoles.push({
                              jobRoleName: "",
                              minSalary: 0,
                              maxSalary: 0,
                              hourlyConsultingSalary: 0,
                            });

                            newIndustries[industryIndex] = {
                              ...newIndustries[industryIndex],
                              jobRoleDtos: newJobRoles,
                            };

                            setFormData({
                              ...formData,
                              industryList: newIndustries,
                            });
                          }}
                          className="text-purple-500 border-purple-500/50 hover:bg-purple-500/10 text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Job Role
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      industryList: [
                        ...(formData.industryList || []),
                        {
                          industryName: "",
                          jobRoleDtos: [
                            {
                              jobRoleName: "",
                              minSalary: 0,
                              maxSalary: 0,
                              hourlyConsultingSalary: 0,
                            },
                          ],
                        },
                      ],
                    });
                  }}
                  className="text-blue-500 border-blue-500/50 hover:bg-blue-500/10 w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Industry
                </Button>
              </div>
            </div>

            {formData.role === "COACH" ? (
              <>
                <div className="space-y-6 mt-10">
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
                    className={`mt-1 ${
                      errors.description ? "border-red-500" : ""
                    }`}
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
              </>
            ) : null}
          </>
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
