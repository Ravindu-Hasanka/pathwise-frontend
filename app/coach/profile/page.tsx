"use client";
import { useState, ChangeEvent, FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button, buttonVariants } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import {cn} from "@/app/lib/utils";

type FormData = {
    firstName: string
    lastName: string
    username: string
    phone: string
    title: string
    bio: string
    website: string
    facebook: string
    instagram: string
    linkedin: string
    twitter: string
    whatsapp: string
    youtube: string
    experience: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export default function CoachSettingsPage() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "Alex",
        lastName: "Thompson",
        username: "alex.thompson",
        phone: "+880123456789",
        title: "Senior Software Developer",
        bio: "Passionate about building scalable web applications and mentoring junior developers.",
        website: "https://alexthompson.dev",
        facebook: "alex.thompson",
        instagram: "alex.thompson.dev",
        linkedin: "alex-thompson-dev",
        twitter: "alex_thompson",
        whatsapp: "+880123456789",
        youtube: "AlexThompsonDev",
        experience: "10 years of experience in software development",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [isEditing, setIsEditing] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { toast } = useToast();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsEditing(false);
        toast({
            title: "Profile Updated",
            description: "Your profile has been successfully updated.",
            duration: 3000,
        });
    }

    const handleDeleteProfile = () => {
        setDeleteDialogOpen(false);
        // Delete profile logic would go here
        toast({
            title: "Profile Deleted",
            description: "Your profile has been permanently deleted.",
            duration: 3000,
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Toaster />
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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
                    {!isEditing ? (
                        <div className="flex space-x-4">
                            <Button
                                onClick={() => setIsEditing(true)}
                                className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                )}
                            >
                                Edit Profile
                            </Button>
                            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">
                                        Delete Profile
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your profile and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDeleteProfile}
                                            className={cn(
                                                buttonVariants({ variant: "destructive" }),
                                                "bg-destructive hover:bg-destructive/90"
                                            )}
                                        >
                                            Delete Profile
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ) : null}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Account Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            name="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                        <Input
                            name="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <Input
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <Input
                        name="phone"
                        placeholder="+880..."
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <Input
                        name="title"
                        placeholder="Your title or role"
                        value={formData.title}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <Textarea
                        name="bio"
                        placeholder="Short biography..."
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />

                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Profile Image</label>
                        <Input
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Social Profile */}
                    <Input
                        name="website"
                        placeholder="https://..."
                        value={formData.website}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {["facebook", "instagram", "linkedin", "twitter", "whatsapp", "youtube"].map((platform) => (
                            <Input
                                key={platform}
                                name={platform}
                                placeholder={platform.charAt(0).toUpperCase() + platform.slice(1)}
                                value={formData[platform as keyof FormData]}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        ))}
                    </div>

                    {/* Work Experience and Change Password */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Textarea
                            name="experience"
                            rows={4}
                            placeholder="Your experience..."
                            value={formData.experience}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />

                        <div className="space-y-4">
                            <Input
                                type="password"
                                name="currentPassword"
                                placeholder="Current Password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            <Input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm New Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex space-x-4">
                            <Button
                                type="submit"
                                className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                )}
                            >
                                Save Profile
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="text-white border-white hover:bg-white/10"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}