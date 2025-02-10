"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormFieldsProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  copyToClipboard: (text: string) => void;
}

export function LoginFormFields({
  username,
  setUsername,
  password,
  setPassword,
  copyToClipboard,
}: LoginFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
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
          className="rounded-md px-4 py-2 bg-inherit border border-gray-300 mb-2"
        />
        <p className="text-xs text-muted-foreground mb-2">
          Hint:{" "}
          <code
            className="bg-gray-300 rounded px-1 py-0.5 text-gray-800 font-mono text-sm cursor-pointer"
            onClick={() => copyToClipboard("hacker")}
          >
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
            className="rounded-md px-4 py-2 bg-inherit border border-gray-300 mb-2"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full rounded-md p-0 hover:bg-transparent"
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
          <code
            className="bg-gray-300 rounded px-1 py-0.5 text-gray-800 font-mono text-sm cursor-pointer"
            onClick={() => copyToClipboard("htn2025")}
          >
            htn2025
          </code>
        </p>
      </div>
    </>
  );
}
