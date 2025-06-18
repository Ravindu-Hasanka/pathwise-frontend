import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Brain,
  BarChart3,
  CheckCircle,
  Star,
  Play
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Card, CardContent } from "./components/ui/card";

export default function Home() {
  const features = [
    {
      icon: Target,
      title: "Career Path Matching",
      description: "AI-powered career recommendations based on your skills and goals"
    },
    {
      icon: BarChart3,
      title: "Skill Gap Analysis", 
      description: "Identify gaps between current skills and dream job requirements"
    },
    {
      icon: Brain,
      title: "AI Resume Builder",
      description: "Create compelling resumes tailored to specific roles"
    },
    {
      icon: TrendingUp,
      title: "Predictive Market Trends",
      description: "Stay ahead with job market forecasts and industry insights"
    },
    {
      icon: Zap,
      title: "Gamified Progress",
      description: "Earn badges and track achievements on your career journey"
    },
    {
      icon: Users,
      title: "Community & Mentorship",
      description: "Connect with peers and industry experts for guidance"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "Pathwise helped me transition from marketing to tech in just 8 months. The AI recommendations were spot-on!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Data Scientist at Netflix",
      content: "The skill gap analysis showed me exactly what I needed to learn. Got my dream job 6 months later!",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "UX Designer at Adobe",
      content: "Amazing platform! The career path visualization made everything clear. Highly recommend!",
      rating: 5
    }
  ];

  const integrations = [
    "LinkedIn", "Coursera", "Glassdoor", "Indeed", "GitHub", "Udemy"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
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
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Smarter Career Moves
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Start Here
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Personalized AI-powered career coaching to help you navigate your professional journey with confidence and clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/onboarding">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-3">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Dashboard Preview */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Career Dashboard</h3>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      85% Match
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">127</div>
                      <div className="text-sm text-gray-400">Skills</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">4.2k</div>
                      <div className="text-sm text-gray-400">Jobs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">94%</div>
                      <div className="text-sm text-gray-400">Profile</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">12</div>
                      <div className="text-sm text-gray-400">Goals</div>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Interactive Career Path Visualization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What you get?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to accelerate your career growth and land your dream job
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-white/10 hover:bg-slate-800/70 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-300">
              See how Pathwise transformed careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Seamless Integrations
            </h2>
            <p className="text-gray-300">
              Connect with platforms you already use
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-slate-800/30 border border-white/10 rounded-lg px-6 py-3">
                <span className="text-gray-300 font-medium">{integration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-12 backdrop-blur-sm border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of professionals who've accelerated their careers with Pathwise
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-3">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-white font-bold text-xl">Pathwise</span>
              </div>
              <p className="text-gray-400">
                AI-powered career coaching for the modern professional.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Pathwise. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};