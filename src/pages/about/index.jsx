"use client";
import React from "react";
import { Header } from "@/components/HeaderLandingPage";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import teamImage from "../../../public/run.jpg";

const AboutPage = () => {
  return (
    <div className="font-sans">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gray-100 py-16 text-white mb-6">
        <div className="container mx-auto relative z-10 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          <div className="text-center md:text-left pt-24">
            <h1 className="text-4xl text-black sm:text-5xl font-bold tracking-tight mb-6">
              About Our Platform
            </h1>
            <p className="text-lg text-black opacity-90 mb-8">
              We are dedicated to transforming the way you automate web browser
              interactions. Our mission is to provide intuitive tools that save
              you time and effort while delivering exceptional results.
            </p>
          </div>
          <div className="ms-10 mt-10">
            <Image
              src="/Moto.svg"
              alt="About Hero Image"
              width={500}
              height={500}
              className=""
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl text-gray-500 mb-8">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            At the heart of our platform is a commitment to empowering
            developers, testers, and businesses with tools to automate workflows
            seamlessly. We believe that automation should be accessible,
            efficient, and tailored to your unique needs.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "User-Friendly Design",
                description:
                  "Our platform is built with simplicity and usability in mind, making it accessible for everyone, regardless of their technical expertise.",
              },
              {
                title: "AI-Driven Automation",
                description:
                  "Leverage the power of AI to generate precise, actionable scripts for browser automation.",
              },
              {
                title: "Comprehensive Features",
                description:
                  "From action recording to script generation, we cover every step of the automation journey.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-md p-6 transform transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            The future
          </h2>
          <Image
            src={teamImage}
            alt="Our Team"
            width={800}
            height={400}
            className="rounded-lg mx-auto mb-6 shadow-md"
          />
          <p className="text-lg text-gray-700">
            Our dedicated team of developers, designers, and engineers work
            tirelessly to create a platform that simplifies web automation for
            everyone.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-b from-[#FF7A00] to-[#FF4C00] py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of users who are transforming their workflows with
            our automation platform.
          </p>
          <div className="flex justify-center gap-6">
            <Button
              onClick={() => router.push("/auth/signup")}
              variant="default"
              className="transition-all duration-300 hover:scale-105"
            >
              Register Now
            </Button>
            <Button
              onClick={() => router.push("/auth/signin")}
              variant="outline"
              className="transition-all duration-300 hover:scale-105 text-black border-white hover:bg-white hover:text-black"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} auto. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
