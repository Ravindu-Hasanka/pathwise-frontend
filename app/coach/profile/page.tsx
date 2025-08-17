"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import {
  User as UserIcon,
  Briefcase,
  MessageCircle,
  Zap,
  Edit,
  Save,
  X,
  BookOpen,
  Clock,
  DollarSign,
} from "lucide-react";
import { skillOptions, interestOptions } from "@/app/utils/data";
import { retrieveUser } from "../../../api/api";
import { updateCoach } from "../../../api/api";
import { toast } from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  location: string;
  currentRole: string;
  experience: string;
  expertiseArea: string[];
  yearsOfExperience: string;
  preferredIndustries: string[];
  hourlyRate: string;
  description: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  location?: string;
  currentRole?: string;
  yearsOfExperience?: string;
  hourlyRate?: string;
  description?: string;
  preferredIndustries?: string;
  expertiseArea?: string;
};

const CoachProfilePage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    location: "",
    currentRole: "",
    experience: "",
    expertiseArea: [],
    yearsOfExperience: "",
    preferredIndustries: [],
    hourlyRate: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<FormData>({ ...formData });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    retrieveUser(1)
      .then((res) => {
        const user = res.data;
        const profile = user.coachProfile || {};

        setFormData({
          name: user.name || "",
          email: user.email || "",
          location: profile.location || "",
          currentRole: profile.currentRole || "",
          experience: profile.experience || "",
          expertiseArea: profile.expertiseArea || [],
          yearsOfExperience: profile.yearsOfExperience || "",
          preferredIndustries: profile.preferredIndustries || [],
          hourlyRate: profile.hourlyRate || "",
          description: profile.description || "",
        });

        setEditData({
          name: user.name || "",
          email: user.email || "",
          location: profile.location || "",
          currentRole: profile.currentRole || "",
          experience: profile.experience || "",
          expertiseArea: profile.expertiseArea || [],
          yearsOfExperience: profile.yearsOfExperience || "",
          preferredIndustries: profile.preferredIndustries || [],
          hourlyRate: profile.hourlyRate || "",
          description: profile.description || "",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load profile data");
      });
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!editData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!editData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!editData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!editData.currentRole.trim()) {
      newErrors.currentRole = "Current role is required";
    }

    if (!editData.yearsOfExperience) {
      newErrors.yearsOfExperience = "Years of experience is required";
    }

    if (!editData.hourlyRate) {
      newErrors.hourlyRate = "Hourly rate is required";
    }
    if (!editData.expertiseArea) {
      newErrors.expertiseArea = "Expertise area is required";
    }

    if (editData.preferredIndustries.length === 0) {
      newErrors.preferredIndustries = "Select at least one preferred industry";
    }

    if (!editData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (editData.description.length < 50) {
      newErrors.description = "Description should be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({ ...formData });
      setErrors({});
    } else {
      setEditData({ ...formData });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setEditData((prev) => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleIndustryToggle = (preferredIndustries: string) => {
    setEditData((prev) => ({
      ...prev,
      preferredIndustries: prev.preferredIndustries.includes(preferredIndustries)
        ? prev.preferredIndustries.filter((s) => s !== preferredIndustries)
        : [...prev.preferredIndustries, preferredIndustries],
    }));
    // Clear error when user selects an industry
    if (errors.preferredIndustries) {
      setErrors((prev) => ({ ...prev, preferredIndustries: undefined }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    setIsSubmitting(true);
    try {
      const userId = 1;

      const expertiseArray =
        typeof editData.expertiseArea === "string"
          ? (editData.expertiseArea as string)
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
          : editData.expertiseArea;

      const updateData = {
        name: editData.name,
        email: editData.email,
        location: editData.location,
        currentRole: editData.currentRole,
        experience: editData.experience,
        expertiseArea: expertiseArray,
        yearsOfExperience: editData.yearsOfExperience,
        preferredIndustries: editData.preferredIndustries,
        hourlyRate: editData.hourlyRate,
        description: editData.description,
      };

      const res = await updateCoach(userId, updateData);

      const updatedProfile = res.data.coachProfile || {};
      setFormData({
        ...editData,
        ...updatedProfile,
      });

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectChange = (field: keyof FormData, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user selects an option
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const renderField = (label: string, value: string) => (
    <div className="mb-4">
      <Label className="text-gray-400 text-sm">{label}</Label>
      <div className="text-white mt-1">{value || "Not specified"}</div>
    </div>
  );

  const renderEditableField = (
    label: string,
    id: keyof FormData,
    type = "text",
    isTextarea = false
  ) => (
    <div className="mb-4">
      <Label htmlFor={id} className="text-white">
        {label}
      </Label>
      {isTextarea ? (
        <>
          <textarea
            id={id}
            value={editData[id] as string}
            onChange={handleInputChange}
            className={`mt-1 w-full bg-slate-700 border ${
              errors[id as keyof FormErrors] ? "border-red-500" : "border-slate-600"
            } rounded-md p-2 text-white`}
            rows={4}
          />
          {errors[id as keyof FormErrors] && (
            <p className="mt-1 text-sm text-red-400">{errors[id as keyof FormErrors]}</p>
          )}
        </>
      ) : (
        <>
          <Input
            id={id}
            value={editData[id] as string}
            onChange={handleInputChange}
            type={type}
            className={`mt-1 bg-slate-700 ${
              errors[id as keyof FormErrors] ? "border-red-500" : "border-slate-600"
            }`}
          />
          {errors[id as keyof FormErrors] && (
            <p className="mt-1 text-sm text-red-400">{errors[id as keyof FormErrors]}</p>
          )}
        </>
      )}
    </div>
  );

  const renderSelectField = (
    label: string,
    field: keyof FormData,
    options: string[]
  ) => (
    <div className="mb-4">
      <Label className="text-white">{label}</Label>
      <Select
        value={editData[field] as string}
        onValueChange={(value) => handleSelectChange(field, value)}
      >
        <SelectTrigger
          className={`mt-1 bg-slate-700 ${
            errors[field as keyof FormErrors] ? "border-red-500" : "border-slate-600"
          }`}
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="hover:bg-slate-700"
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[field as keyof FormErrors] && (
        <p className="mt-1 text-sm text-red-400">{errors[field as keyof FormErrors]}</p>
      )}
    </div>
  );

  const renderBadges = (items?: string[]) => {
    const safeItems = items || [];
    return (
      <div className="flex flex-wrap gap-2 mt-1">
        {safeItems.length > 0 ? (
          safeItems.map((item) => (
            <Badge
              key={item}
              variant="default"
              className="bg-blue-500/20 text-blue-300"
            >
              {item}
            </Badge>
          ))
        ) : (
          <span className="text-gray-400">Not specified</span>
        )}
      </div>
    );
  };

  const renderEditableBadges = (
    items: string[] = [],
    options: string[],
    toggleFn: (item: string) => void,
    error?: string
  ) => (
    <div>
      <div className="flex flex-wrap gap-2 mt-1">
        {options.map((option) => (
          <Badge
            key={option}
            onClick={() => toggleFn(option)}
            className={`cursor-pointer select-none ${
              (items || []).includes(option)
                ? "bg-blue-500 text-white"
                : "bg-slate-700 text-gray-200"
            }`}
            variant={(items || []).includes(option) ? "default" : "outline"}
          >
            {option}
          </Badge>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-white font-bold text-xl">Pathwise</span>
          </div>
          <Button
            onClick={isEditing ? handleSave : handleEditToggle}
            variant={isEditing ? "default" : "outline"}
            className={
              isEditing
                ? "bg-green-600 hover:bg-green-700"
                : "border-white/20 text-gray-300 hover:bg-white/10"
            }
            disabled={isSubmitting}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />{" "}
                {isSubmitting ? "Saving..." : "Save Profile"}
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </>
            )}
          </Button>
        </div>

        <Card className="bg-slate-800/50 border-white/10 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4 mb-8 pt-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {formData.name}
                </h1>
                <p className="text-gray-300">{formData.currentRole}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-blue-400" /> Personal
                  Information
                </h2>
                {isEditing ? (
                  <>
                    {renderEditableField("Full Name", "name")}
                    {renderEditableField("Email", "email", "email")}
                    {renderEditableField("Location", "location")}
                    {renderEditableField("Current Role", "currentRole")}
                  </>
                ) : (
                  <>
                    {renderField("Full Name", formData.name)}
                    {renderField("Email", formData.email)}
                    {renderField("Location", formData.location)}
                    {renderField("Current Role", formData.currentRole)}
                  </>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-400" /> Coaching
                  Background
                </h2>
                {isEditing ? (
                  <>
                    {renderSelectField(
                      "Years of Coaching Experience",
                      "yearsOfExperience",
                      [
                        "0-1 years",
                        "2-3 years",
                        "4-6 years",
                        "7-10 years",
                        "10+ years",
                      ]
                    )}
                    {renderSelectField("Hourly Rate", "hourlyRate", [
                      "Under $50/hr",
                      "$50 - $100/hr",
                      "$100 - $200/hr",
                      "$200 - $300/hr",
                      "$300+",
                    ])}
                  </>
                ) : (
                  <>
                    {renderField(
                      "Years of Coaching Experience",
                      formData.yearsOfExperience
                    )}
                    {renderField("Hourly Rate", formData.hourlyRate)}
                  </>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-green-400" /> Expertise
                </h2>
                <Label className="text-gray-400 mt-4 mb-2">
                  Preferred Industries
                </Label>
                {isEditing ? (
                  renderEditableBadges(
                    editData.preferredIndustries,
                    interestOptions,
                    handleIndustryToggle,
                    errors.preferredIndustries
                  )
                ) : (
                  renderBadges(formData.preferredIndustries)
                )}
                <div className="mt-6 mb-8">
                  {isEditing ? (
                    <>
                      <Label className="text-white">Expertise Areas</Label>
                      <Input
                        id="expertiseArea"
                        value={
                          Array.isArray(editData.expertiseArea)
                            ? editData.expertiseArea.join(", ")
                            : editData.expertiseArea
                        }
                        onChange={handleInputChange}
                        className={`mt-1 bg-slate-700 ${
                          errors.expertiseArea
                            ? "border-red-500"
                            : "border-slate-600"
                        }`}
                        placeholder="Enter expertise areas, separated by commas"
                      />
                      {errors.expertiseArea && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.expertiseArea}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      {renderField(
                        "Expertise Areas",
                        formData.expertiseArea.join(", ")
                      )}
                    </>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-orange-400" />{" "}
                    About
                  </h2>
                  {isEditing ? (
                    renderEditableField(
                      "Description",
                      "description",
                      "text",
                      true
                    )
                  ) : (
                    <div className="mb-4">
                      <Label className="text-gray-400 text-sm">
                        Description
                      </Label>
                      <div className="text-white mt-1 whitespace-pre-line">
                        {formData.description || "No description provided"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={handleEditToggle}
                  className="border-white/20 text-gray-300 hover:bg-white/10"
                  disabled={isSubmitting}
                >
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={isSubmitting}
                >
                  <Save className="mr-2 h-4 w-4" />{" "}
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoachProfilePage;