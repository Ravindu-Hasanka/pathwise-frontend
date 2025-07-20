"use client";
import { useState, useRef, ChangeEvent, FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button, buttonVariants } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { cn } from "@/app/lib/utils";

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
}

type PasswordForm = {
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
    })

    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>("/default-avatar.jpg");
    const [tempImage, setTempImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                if (event.target?.result) {
                    setTempImage(event.target.result as string);
                }
            };

            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // If a new image was selected, update the profile image
        if (tempImage) {
            setProfileImage(tempImage);
            setTempImage(null);
        }

        setIsEditing(false);
        toast({
            title: "Profile Updated",
            description: "Your profile has been successfully updated.",
            duration: 3000,
        });
    }

    const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Password validation
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast({
                title: "Password Mismatch",
                description: "New password and confirm password do not match.",
                variant: "destructive",
                duration: 3000,
            });
            return;
        }

        // Password change logic would go here
        toast({
            title: "Password Changed",
            description: "Your password has been successfully updated.",
            duration: 3000,
        });

        // Reset form and exit password change mode
        setPasswordForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setIsChangingPassword(false);
    }

    const handleDeleteProfile = () => {
        setDeleteDialogOpen(false);
        toast({
            title: "Profile Deleted",
            description: "Your profile has been permanently deleted.",
            duration: 3000,
        });
    }

    const handleCancel = () => {
        setTempImage(null);
        setIsEditing(false);
    }

    const handleCancelPasswordChange = () => {
        setPasswordForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setIsChangingPassword(false);
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
                            <Link href="/coach/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                Dashboard
                            </Link>
                            <Link
                                href="/coach/myCoachees/view"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                My Coachees
                            </Link>
                            <Link
                                href="/coach/myCoachees/schedule"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Schedule
                            </Link>
                            <Link
                                href="/coach/incomingRequests/list"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Requests
                            </Link>
                            <Link href="/coach/earnings" className="text-gray-300 hover:text-white transition-colors">
                                Earnings
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-white font-medium">Alex Thompson</p>
                                <p className="text-gray-400 text-sm">Software Developer</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white font-bold">AT</span>
                                )}
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
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center mb-8">
                        {!isEditing ? (
                            // View mode - show profile image
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/50">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // Edit mode - show image upload and preview
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/50">
                                        {tempImage ? (
                                            <img
                                                src={tempImage}
                                                alt="Profile preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : profileImage ? (
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    name="profileImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-white border-white hover:bg-white/10"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Change Profile Image
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Personal Information Section */}
                    <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                    First Name
                                </label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                    Last Name
                                </label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                    Username
                                </label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                    Phone Number
                                </label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    placeholder="+880..."
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                Professional Title
                            </label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Your title or role"
                                value={formData.title}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="mt-6">
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                                Biography
                            </label>
                            <Textarea
                                id="bio"
                                name="bio"
                                placeholder="Short biography..."
                                value={formData.bio}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* Social Profiles Section */}
                    <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                            Social Profiles
                        </h2>

                        <div className="mt-6">
                            <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                                Website
                            </label>
                            <Input
                                id="website"
                                name="website"
                                placeholder="https://..."
                                value={formData.website}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {["facebook", "instagram", "linkedin", "twitter", "whatsapp", "youtube"].map((platform) => (
                                <div key={platform}>
                                    <label
                                        htmlFor={platform}
                                        className="block text-sm font-medium text-gray-300 mb-2 capitalize"
                                    >
                                        {platform}
                                    </label>
                                    <Input
                                        id={platform}
                                        name={platform}
                                        placeholder={`Your ${platform} profile`}
                                        value={formData[platform as keyof FormData]}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Work Experience Section */}
                    <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                            Work Experience
                        </h2>

                        <div className="mt-6">
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                                Professional Experience
                            </label>
                            <Textarea
                                id="experience"
                                name="experience"
                                rows={6}
                                placeholder="Describe your professional experience..."
                                value={formData.experience}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex space-x-4 justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                className="text-white border-white hover:bg-white/10"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                )}
                            >
                                Save Profile
                            </Button>
                        </div>
                    )}
                </form>

                {/* Change Password Section */}
                <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 mt-8">
                    <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white">
                            Password Settings
                        </h2>
                        {!isChangingPassword ? (
                            <Button
                                onClick={() => setIsChangingPassword(true)}
                                variant="outline"
                                className="text-white border-white hover:bg-white/10"
                            >
                                Change Password
                            </Button>
                        ) : null}
                    </div>

                    {isChangingPassword ? (
                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                    Current Password
                                </label>
                                <Input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    placeholder="Enter your current password"
                                    value={passwordForm.currentPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                        New Password
                                    </label>
                                    <Input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        placeholder="Enter a new password"
                                        value={passwordForm.newPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                        Confirm New Password
                                    </label>
                                    <Input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Confirm your new password"
                                        value={passwordForm.confirmPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4 justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-white border-white hover:bg-white/10"
                                    onClick={handleCancelPasswordChange}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className={cn(
                                        buttonVariants({ variant: "default" }),
                                        "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                    )}
                                >
                                    Update Password
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <p className="text-gray-400">
                            For security, your password is not shown here. Click "Change Password" to update it.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}