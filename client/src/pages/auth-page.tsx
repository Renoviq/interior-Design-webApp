import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  baseUserSchema,
  insertUserSchema,
  verifyOtpSchema,
} from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { Redirect } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function AuthPage() {
  const { user, loginMutation, registerMutation, verifyOtpMutation } = useAuth();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState("login"); // "login", "signup", "otp"
  const [registrationEmail, setRegistrationEmail] = useState("");

  const handleResendOtp = async () => {
    try {
      const response = await fetch("/api/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: registrationEmail }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to resend OTP");
      }
      toast({
        title: "Code resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Resend failed",
        description: error instanceof Error ? error.message : "Failed to resend OTP",
        variant: "destructive",
      });
    }
  };

  const loginForm = useForm({
    resolver: zodResolver(
      baseUserSchema.pick({ username: true, password: true })
    ),
    defaultValues: { username: "", password: "" },
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const otpForm = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  if (user) return <Redirect to="/studio" />;

  const handleRegister = async (data: any) => {
    try {
      setRegistrationEmail(data.email);
      otpForm.setValue("email", data.email);
      await registerMutation.mutateAsync(data);
      setCurrentView("otp");
      toast({
        title: "Check your email",
        description: "We've sent you a verification code to complete your registration.",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleVerifyOtp = async (data: any) => {
    try {
      console.log("Verifying OTP with data:", {
        email: registrationEmail,
        otp: data.otp,
      });
      const result = await verifyOtpMutation.mutateAsync({
        email: registrationEmail,
        otp: data.otp,
      });
      console.log("Verification result:", result);
      toast({
        title: "Welcome to RenoviqAI!",
        description: "Your account has been verified successfully.",
      });
    } catch (error) {
      console.error("OTP verification error:", error);
      toast({
        title: "Verification failed",
        description:
          error instanceof Error ? error.message : "Invalid or expired verification code",
        variant: "destructive",
      });
    }
  };

  const handleGoogleAuth = () => {
    // Redirect to backend Google OAuth route
    window.location.href = "/auth/google";
  };

  // Logo Component
  const Logo = ({ size = "large" }) => (
    <div className={`flex items-center justify-center ${size === "large" ? "mb-8" : "mb-4"}`}>
      <div className={`${size === "large" ? "text-3xl" : "text-2xl"} font-bold`}>
        <span className="text-green-600">Renoviq</span>
        <span className="text-black">AI</span>
      </div>
    </div>
  );

  // Login View
  if (currentView === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Logo />
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Sign in to RenoviqAI
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Transform your spaces with AI-powered renovation suggestions
            </p>
          </div>

          <Card className="mt-8 shadow-lg">
            <CardContent className="p-8">
              {/* Google OAuth Button */}
              <Button
                onClick={handleGoogleAuth}
                variant="outline"
                className="w-full mb-6 h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </Button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Login Form */}
              <Form {...loginForm}>
                <div className="space-y-6">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter your username"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter your password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="font-medium text-green-600 hover:text-green-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
                    disabled={loginMutation.isPending}
                    onClick={loginForm.handleSubmit((data) =>
                      loginMutation.mutate(data)
                    )}
                  >
                    {loginMutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setCurrentView("signup")}
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Signup View
  if (currentView === "signup") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Logo />
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Join RenoviqAI and transform your living spaces
            </p>
          </div>

          <Card className="mt-8 shadow-lg">
            <CardContent className="p-8">
              {/* Google OAuth Button */}
              <Button
                onClick={handleGoogleAuth}
                variant="outline"
                className="w-full mb-6 h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </Button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Signup Form */}
              <Form {...registerForm}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">First Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                              placeholder="John"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Last Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                              placeholder="Doe"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Controller
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="john.doe@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="johndoe"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="Create a strong password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="Confirm your password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium mt-6"
                    disabled={registerMutation.isPending}
                    onClick={registerForm.handleSubmit(handleRegister)}
                  >
                    {registerMutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => setCurrentView("login")}
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // OTP Verification View
  if (currentView === "otp") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Logo />
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Verify your email
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We've sent a verification code to
              </p>
              <p className="font-medium text-gray-900">{registrationEmail}</p>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <Form {...otpForm}>
                <div className="space-y-6">
                  <div className="text-center">
                    <FormLabel className="text-gray-700 text-sm font-medium">
                      Enter verification code
                    </FormLabel>
                    <Controller
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormControl>
                            <div className="flex justify-center">
                              <InputOTP
                                maxLength={6}
                                value={field.value}
                                onChange={field.onChange}
                                className="gap-3"
                              >
                                <InputOTPGroup className="gap-3">
                                  {[...Array(6)].map((_, i) => (
                                    <InputOTPSlot
                                      key={i}
                                      index={i}
                                      className="w-12 h-12 text-lg font-semibold border-2 border-gray-300 focus:border-green-500 focus:ring-green-500"
                                    />
                                  ))}
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                          </FormControl>
                          <FormMessage className="mt-2" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
                    disabled={otpForm.formState.isSubmitting}
                    onClick={otpForm.handleSubmit(handleVerifyOtp)}
                  >
                    {otpForm.formState.isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Verify Account"
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        className="font-medium text-green-600 hover:text-green-500"
                        onClick={handleResendOtp}
                      >
                        Resend
                      </button>
                    </p>
                  </div>
                </div>
              </Form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setCurrentView("signup")}
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to signup
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}