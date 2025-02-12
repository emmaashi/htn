"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import icon from "@/app/assets/icon.png";
import build from "@/app/assets/build.png";
import { EventsLogo } from "./login/components/events-logo";
import { LoginFormFields } from "./login/components/login-form";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isGuestLogin, setIsGuestLogin] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isGuestLogin) return;
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

  // function to copy login details to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied "${text}" to clipboard.`);
  };

  const handleGuestLogin = () => {
    setIsGuestLogin(true);
    toast.success("Success!", {
      description: "Public events are visibile.",
    });
    localStorage.setItem("loggedIn", "guest");
    router.push("/events");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen ambient-background">
      <div className="absolute inset-0">
        <img
          src={build.src}
          alt="building blocks"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="mb-2 relative z-10 ">
        <img src={icon.src} alt="Logo" className="h-28 mx-auto" />
      </div>
      <div className="mb-7 relative z-10">
        <EventsLogo />
      </div>
      <div className="border rounded-lg w-1/4 p-6 relative z-10 bg-white/45 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300">
        <form
          onSubmit={handleSubmit}
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground items-start"
        >
          <LoginFormFields
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            copyToClipboard={copyToClipboard}
          />
          <Button
            type="submit"
            className="rounded-md w-full text-sm hover:bg-[#ADB2F3]"
          >
            Sign In
          </Button>
          <div className="flex justify-center w-full mt-2">
            <Button
              type="button"
              variant="link"
              onClick={handleGuestLogin}
              className="underline"
            >
              Continue as Guest
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
