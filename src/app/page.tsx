"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/app/assets/logo-24.png";
import events from "@/app/assets/events.png";
import build from "@/app/assets/build.png";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isGuestLogin, setIsGuestLogin] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (isGuestLogin) return;

        // hardcoded login details
        if (username === "hacker" && password === "htn2025") {
            toast.success("Login Successful!", {
                description: "Public and private events are visible.",
            });
            localStorage.setItem("loggedIn", "true");
            router.push("/events");
        } else {
            toast.error("Login Failed", {
                description: "Incorrect username or password.",
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // permission passed to only display public events
    const handleGuestLogin = () => {
        setIsGuestLogin(true);
        toast.success("Success!", {
            description: "Public events are visibile.",
        });
        localStorage.setItem("loggedIn", "guest");
        router.push("/events");
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="absolute inset-0">
                <img
                    src={build.src}
                    alt="building blocks"
                    className="w-full h-full object-cover opacity-20"
                />
            </div>
            {/* logos */}
            <div className="mb-8 relative z-10 ">
                <img src={logo.src} alt="Logo" className="h-16 mx-auto" />
            </div>
            <div className="mb-8 relative z-10">
                <img src={events.src} alt="Events" className="h-28 w-[500px]" />
            </div>
            <div className="border rounded-lg w-1/3 p-6 relative z-10 bg-white/40 backdrop-blur-sm">
                <form
                    onSubmit={handleSubmit}
                    className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground items-start"
                >
                    <div className="w-full">
                        <Label htmlFor="username" className="text-sm">
                            Username
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="rounded-md px-4 py-2 bg-inherit border mb-2"
                        />
                        <p className="text-xs text-muted-foreground mb-2">
                            Hint:{" "}
                            <code className="bg-gray-100 rounded px-1 py-0.5 text-gray-800 font-mono text-sm">
                                hacker
                            </code>
                        </p>
                    </div>
                    <div className="w-full">
                        <Label htmlFor="password" className="text-sm">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="rounded-md px-4 py-2 bg-inherit border mb-2"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full rounded-md p-0"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <Eye className="h-4 w-4" />
                                ) : (
                                    <EyeOff className="h-4 w-4" />
                                )}
                                <span className="sr-only">Toggle password visibility</span>
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">
                            Hint:{" "}
                            <code className="bg-gray-100 rounded px-1 py-0.5 text-gray-800 font-mono text-sm">
                                htn2025
                            </code>
                        </p>
                    </div>
                    <Button type="submit" className="rounded-md w-full text-sm hover:bg-[#ADB2F3]">
                        Sign In
                    </Button>
                    <Button
                        type="button"
                        variant="link"
                        onClick={handleGuestLogin}
                        className="w-full underline"
                    >
                        Continue as Guest
                    </Button>
                </form>
            </div>
        </div>
    );
}
