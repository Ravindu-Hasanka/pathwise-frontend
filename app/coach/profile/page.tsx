"use client";
import { useState, ChangeEvent, FormEvent, use } from "react"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Button } from "@/app/components/ui/button"
import { Link } from "lucide-react";


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
        firstName: "",
        lastName: "",
        username: "",
        phone: "",
        title: "",
        bio: "",
        website: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        twitter: "",
        whatsapp: "",
        youtube: "",
        experience: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Account Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} />
                        <Input name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} />
                    </div>

                    <Input name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
                    <Input name="phone" placeholder="+880..." value={formData.phone} onChange={handleChange} />
                    <Input name="title" placeholder="Your title or role" value={formData.title} onChange={handleChange} />
                    <Textarea name="bio" placeholder="Short biography..." value={formData.bio} onChange={handleChange} />

                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Profile Image</label>
                        <Input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
                    </div>

                    <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        Save Changes
                    </Button>

                    {/* Social Profile */}
                    <Input name="website" placeholder="https://..." value={formData.website} onChange={handleChange} />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {["facebook", "instagram", "linkedin", "twitter", "whatsapp", "youtube"].map((platform) => (
                            <Input
                                key={platform}
                                name={platform}
                                placeholder={platform.charAt(0).toUpperCase() + platform.slice(1)}
                                value={formData[platform as keyof FormData]}
                                onChange={handleChange}
                            />
                        ))}
                    </div>
                    <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        Save Changes
                    </Button>

                    {/* Work Experience and Change Password */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Textarea
                            name="experience"
                            rows={4}
                            placeholder="Your experience..."
                            value={formData.experience}
                            onChange={handleChange}
                        />

                        <div className="space-y-4">
                            <Input
                                type="password"
                                name="currentPassword"
                                placeholder="Current Password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                            />
                            <Input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm New Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        Save Changes
                    </Button>
                </form>
            </div>

        </div>
    )
}