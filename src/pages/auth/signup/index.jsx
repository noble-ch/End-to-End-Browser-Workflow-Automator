import { useState } from "react";
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

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  return (
    <div className="flex justify-center items-center  min-h-screen bg-gray-100">
      <img
        src="/Decore.svg"
        className="absolute inset-0 w-50 h-full object-cover z-0 left-96 ms-96"
      />
      <Card className="p-8 bg-white shadow-lg z-20 w-[600px]">
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
          className="mt-6"
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
          <div className="mt-4">
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
          <div className="mt-4">
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
          <div className="mt-4">
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
          <div className="mt-4 flex items-center">
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
            className="mt-6 w-full text-white hover:text-primary border py-2 px-4 rounded-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={!isTermsChecked}
          >
            Create account
          </Button>
          <div className=" my-6 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Login with Apple</span>
            </Button>
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Login with Google</span>
            </Button>
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
