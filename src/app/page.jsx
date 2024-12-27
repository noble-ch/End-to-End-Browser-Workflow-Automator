"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Header } from "@/components/HeaderLandingPage";

const LandingPage = () => {
  const router = useRouter();

  const handleLearnMore = () => {
    alert("Learn more about Jadoo!");
  };

  const handleLogin = () => {
    router.push("/auth/signin"); // Navigate to the login page
  };

  const handleRegister = () => {
    router.push("/auth/signup"); // Navigate to the registration page
  };

  return (
    <div className="font-sans">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white py-16">
        <img
          src="/Decore.svg"
          alt="Decoration"
          className="absolute top-0 right-0 z-0 max-w-[400px] sm:max-w-[700px]"
        />
        <div className="container mx-auto relative z-10 max-w-6xl grid grid-rows-1 grid-cols-2 gap-8 p-4">
          <div className="text-center md:text-left pt-24">
            {/* <h1 className="text-primary font-bold mb-6 uppercase">
              Your Automation Ally for Seamless Web Interaction
            </h1>
            <h1 className="text-4xl sm:text-7xl font-bold text-gray-800 mb-6 font-volkhov">
              Automate, Your Tasks & Enjoy Easy Life
            </h1> */}
            <Image
              src="/Moto.svg"
              alt="Relaxing Person"
              width={500}
              height={500}
              className=""
            />

            <p className="text-sm text-gray-500 mb-8 font-volkhov">
              Empowering you with automated web workflows and interaction
              recording.From Clicks to Code, We’ve Got You Covered.Smart
              Automation for Smarter Work.Delivering Results, One Line of Code
              at a Time."
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Button onClick={handleLearnMore} variant="default">
                Find out more
              </Button>
              <Button onClick={() => alert("Play Demo")} variant="outline">
                Play Demo
              </Button>
            </div>
          </div>
          <div className="ms-10 mt-10">
            <Image
              src="/chilingperson.png"
              alt="Relaxing Person"
              width={500}
              height={500}
              className=""
            />
          </div>
        </div>
      </section>

      {/* Services */}

      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">We Offer Best Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              "Calculated Weather",
              "Best Flights",
              "Local Events",
              "Customization",
            ].map((service, index) => (
              <div key={index} className="p-4 bg-white shadow rounded-md">
                <Image
                  src={`/icons/service-${index + 1}.png`}
                  alt={service}
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold">{service}</h3>
                <p className="text-sm text-gray-600">
                  Brief description about {service}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Top Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Rome, Italy", price: "$5.42k", days: "10 Days Trip" },
              { name: "London, UK", price: "$4.2k", days: "12 Days Trip" },
              { name: "Full Europe", price: "$15k", days: "28 Days Trip" },
            ].map((destination, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-md p-4 text-left"
              >
                <Image
                  src={`/images/destination-${index + 1}.jpg`}
                  alt={destination.name}
                  width={300}
                  height={200}
                  className="w-full rounded-md mb-4"
                />
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p className="text-gray-600">
                  {destination.price} • {destination.days}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What People Say About Us</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            {[
              { name: "Mike Taylor", location: "Lahore, Pakistan" },
              { name: "Chris Thomas", location: "CEO of Red Button" },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-md p-4 w-full sm:w-1/2"
              >
                <p className="italic text-gray-600 mb-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                </p>
                <h3 className="font-bold">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Jadoo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
