"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import {  User as UserIcon, Briefcase, Target, Zap, Edit, Save, X } from "lucide-react";
import { skillOptions, interestOptions }  from "@/app/utils/data";

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

const userProfilePage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "Alex Thompson",
    email: "alex.tho@example.com",
    location: "San Francisco, CA",
    currentRole: "Frontend Developer",
    experience: "4-6",
    education: "bachelors",
    skills: ["JavaScript", "React", "Node.js"],
    interests: ["Technology", "Startups"],
    careerGoals: "Become a senior developer and eventually a tech lead",
    targetRole: "Senior Frontend Developer",
    targetIndustry: "technology",
    salaryExpectation: "100-150k"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<FormData>({ ...formData });

  //To do
  // useEffect(() => {
  //   fetchUserData().then(data => {
  //   setFormData(data);
  //   setEditData(data);
  //   });
  // }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({ ...formData });
    } else {
      setEditData({ ...formData });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setFormData({ ...editData });
    setIsEditing(false);  
    // saveUserData(editData).then(() => {
    //   setFormData(editData);
    //   setIsEditing(false);
    // });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEditData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: keyof FormData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setEditData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const renderField = (label: string, value: string) => (
    <div className="mb-4">
      <Label className="text-gray-400 text-sm">{label}</Label>
      <div className="text-white mt-1">{value || "Not specified"}</div>
    </div>
  );

  const renderEditableField = (label: string, id: keyof FormData, type = "text") => (
    <div className="mb-4">
      <Label htmlFor={id} className="text-white">{label}</Label>
      <Input
        id={id}
        value={editData[id] as string}
        onChange={handleInputChange}
        type={type}
        className="mt-1 bg-slate-700 border-slate-600"
      />
    </div>
  );

  const renderSelectField = (label: string, field: keyof FormData, options: string[]) => (
    <div className="mb-4">
      <Label className="text-white">{label}</Label>
      <Select
        value={editData[field] as string}
        onValueChange={(value) => handleSelectChange(field, value)}
      >
        <SelectTrigger className="mt-1 bg-slate-700 border-slate-600">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          {options.map(option => (
            <SelectItem key={option} value={option} className="hover:bg-slate-700">
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderBadges = (items: string[]) => (
    <div className="flex flex-wrap gap-2 mt-1">
      {items.length > 0 ? (
        items.map(item => (
          <Badge key={item} variant="default" className="bg-blue-500/20 text-blue-300">
            {item}
          </Badge>
        ))
      ) : (
        <span className="text-gray-400">Not specified</span>
      )}
    </div>
  );

  const renderEditableBadges = (items: string[], options: string[], toggleFn: (item: string) => void) => (
    <div className="flex flex-wrap gap-2 mt-1">
      {options.map(option => (
        <Badge
          key={option}
          onClick={() => toggleFn(option)}
          className={`cursor-pointer select-none ${
            items.includes(option)
              ? "bg-blue-500 text-white"
              : "bg-slate-700 text-gray-200"
          }`}
          variant={items.includes(option) ? "default" : "outline"}
        >
          {option}
        </Badge>
      ))}
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
            className={isEditing ? "bg-green-600 hover:bg-green-700" : "border-white/20 text-gray-300 hover:bg-white/10"}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Profile
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
                <h1 className="text-2xl font-bold text-white">{formData.name}</h1>
                <p className="text-gray-300">{formData.currentRole}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-blue-400" /> Personal Information
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
                  <Briefcase className="h-5 w-5 mr-2 text-purple-400" /> Professional Background
                </h2>
                {isEditing ? (
                  <>
                    {renderSelectField("Years of Experience", "experience", ["0-1", "2-3", "4-6", "7-10", "10+"])}
                    {renderSelectField("Highest Education", "education", ["high-school", "associates", "bachelors", "masters", "phd", "bootcamp"])}
                  </>
                ) : (
                  <>
                    {renderField("Years of Experience", formData.experience)}
                    {renderField("Highest Education", formData.education)}
                  </>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-green-400" /> Skills & Interests
                </h2>
                <Label className="text-white mb-2">Skills</Label>
                {isEditing ? (
                  renderEditableBadges(editData.skills, skillOptions, handleSkillToggle)
                ) : (
                  renderBadges(formData.skills)
                )}
                <Label className="text-white mt-4 mb-2">Interests</Label>
                {isEditing ? (
                  renderEditableBadges(editData.interests, interestOptions, handleInterestToggle)
                ) : (
                  renderBadges(formData.interests)
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-orange-400" /> Career Goals
                </h2>
                {isEditing ? (
                  <>
                    {renderEditableField("Target Role", "targetRole")}
                    {renderSelectField("Target Industry", "targetIndustry", ["technology", "healthcare", "finance", "education", "ecommerce", "media"])}
                    {renderSelectField("Salary Expectation", "salaryExpectation", ["30-50k", "50-75k", "75-100k", "100-150k", "150k+"])}
                    {renderEditableField("Career Goals", "careerGoals")}
                  </>
                ) : (
                  <>
                    {renderField("Target Role", formData.targetRole)}
                    {renderField("Target Industry", formData.targetIndustry)}
                    {renderField("Salary Expectation", formData.salaryExpectation)}
                    {renderField("Career Goals", formData.careerGoals)}
                  </>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/10">
                <Button variant="outline" onClick={handleEditToggle} className="border-white/20 text-gray-300 hover:bg-white/10">
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default userProfilePage;