import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (formData) => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/auth/signin");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed");
    }
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();
      if (res.ok) {
        // Save tokens or user data
        localStorage.setItem("accessToken", data.accessToken);
        router.push("/dashboard");
      } else {
        console.error("Google login failed:", data.error);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  return (
    <div className="flex justify-center items-center  min-h-screen ">
      <img
        src="/Decore.svg"
        alt="Decoration"
        className="absolute top-0 right-0 z-0 max-w-[600px] sm:max-w-[900px]"
      />
      <Card className="px-8 pt-2 pb-6 mb-0 bg-white shadow-lg z-20 w-[600px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign up</CardTitle>
          <CardDescription className="text-center">
            Let's get you all set up so you can access your personal account.
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target).entries()
            );
            handleSubmit(formData);
          }}
          className="mt-1"
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="firstName" className="block text-sm font-medium ">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                required
                className=""
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName" className="block text-sm font-medium ">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="mt-2">
            <Label htmlFor="email" className="block text-sm font-medium ">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@gmail.com"
              required
            />
          </div>
          <div className="mt-2">
            <Label htmlFor="password" className="block text-sm font-medium ">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "🐵"}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <Label
              htmlFor="confirmPassword"
              className="block text-sm font-medium "
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "🐵"}
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              onChange={(e) => setIsTermsChecked(e.target.checked)}
            />
            <Label htmlFor="terms" className="ml-2 block text-sm ">
              I agree to all the{" "}
              <a href="#" className="text-indigo-600">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600">
                Privacy Policies
              </a>
              .
            </Label>
          </div>
          <Button
            type="submit"
            className="mt-2 w-full text-white hover:text-primary border py-2 px-4 rounded-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={!isTermsChecked}
          >
            Create account
          </Button>
          <div className=" my-2 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-center ">
              <div id="google-signin-btn"></div>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-indigo-600">
              Login
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
}
