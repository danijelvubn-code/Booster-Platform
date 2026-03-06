import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, ArrowRight } from "lucide-react";
import boosterRocket from "@/assets/booster-rocket.png";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("bob@openrangeai.com");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex bg-booster-navy">
      {/* Left — Visual Panel */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        <img
          alt="Booster rocket launch"
          className="absolute inset-0 w-full h-full object-cover"
          src="/lovable-uploads/datacenter-login-bg.png" />

        {/* Gradient overlay for branding readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-booster-navy/80 via-transparent to-transparent" />
        {/* Branding overlay */}
        <div className="relative z-10 flex flex-col items-center w-full h-full">
          <div className="flex-1 flex items-center justify-center text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center gap-3">
                <Zap className="h-[168px] w-[168px] text-primary fill-primary" />
                <span className="text-9xl font-bold text-white tracking-tight">booster</span>
              </div>
              <span className="text-sm font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30">Beta Version</span>
            </div>
          </div>
          <div className="pb-12 text-center">
            <p className="text-white/60 text-4xl max-w-2xl leading-relaxed">
              Enterprise AI Model Management.<br />
              Deploy, route, and optimize at scale.
            </p>
          </div>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary)/0.04),transparent_60%)]" />

        <div className="w-full max-w-sm relative z-10">
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <Zap className="h-7 w-7 text-primary fill-primary" />
            <span className="text-2xl font-bold text-white">booster</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-white/50">Sign in to your Booster account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/70 text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 focus:border-primary focus:ring-primary/20" />

            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/70 text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 focus:border-primary focus:ring-primary/20" />

            </div>
            <div className="flex justify-end">
              <button type="button" className="text-xs text-white/40 hover:text-primary transition-colors">
                Forgot password?
              </button>
            </div>
            <Button type="submit" className="w-full h-12 text-base font-semibold gap-2 group" size="lg">
              Sign In
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </div>
      </div>
    </div>);

};

export default Login;