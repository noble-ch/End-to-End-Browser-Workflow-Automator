"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Header } from "@/components/HeaderLandingPage";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import image1 from "../../public/actionRecord.png";
import image2 from "../../public/stepAction.png";
import image3 from "../../public/scriptGeneration.png";
import image4 from "../../public/run.jpg";
import image5 from "../../public/rome_office.jpg";
import image6 from "../../public/workspace.jpg";
import image7 from "../../public/workspace2.jpg";
import { FaArrowRight } from "react-icons/fa";
import BackToTopButton from "../components/BackToTopButton";

const LandingPage = () => {
  const router = useRouter();

  const handleLearnMore = () => {
    // Ideally, navigate to a detailed page or open a modal
    alert("Learn more about how our platform automates browser interactions!");
  };

  const handleLogin = () => {
    router.push("/auth/signin");
  };

  const handleRegister = () => {
    router.push("/auth/signup");
  };

  const handleDemoPlay = () => {
    router.push("/auth/signup");
  };

  // Image data for services
  const serviceImages = [
    { src: image1, alt: "Step 4: Email", text: "Action Recording" },
    { src: image2, alt: "Step 5: Password", text: "Step Descriptions" },
    { src: image3, alt: "Step 6: Click Password", text: "Script Generation" },
    {
      src: image4,
      alt: "Step 7: Keyboard Down Control",
      text: "Run & Analyze",
    },
  ];

  // Destination data corrected with the appropriate object structure
  const destinationImages = [
    { src: image5, name: "web Testing ", price: "$199", days: "5 tasks" },
    {
      src: image6,
      name: "performance metrics",
      price: "$99",
      days: "result log for every test ",
    },
    {
      src: image7,
      name: "web automation ",
      price: "$599",
      days: "task scheduler and screenshots",
    },
  ];

  return (
    <div className="font-sans">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#FF7A00] to-[#FF4C00] py-16 mb-6 text-white">
        <div className="container mx-auto relative z-10 max-w-6xl grid grid-rows-1 grid-cols-2 gap-8 p-4">
          <div className="text-center md:text-left pt-24">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Empower Your Web Automation
            </h1>
            <p className="text-lg text-white opacity-90 mb-8">
              Effortlessly automate your browser interactions and turn them into
              executable code using our intuitive platform. No need to write
              complex scripts.
            </p>
            <div className="flex justify-center md:justify-start gap-6">
              <Button
                onClick={handleLearnMore}
                variant="default"
                className="transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
              <Button
                onClick={handleDemoPlay}
                variant="outline"
                className="transition-all duration-300 hover:scale-105 text-black border-white hover:bg-white hover:text-black"
              >
                Get Started
              </Button>
            </div>
          </div>
          <div className="ms-10 mt-10">
            <Image
              src="/chilingperson.png"
              alt="Relaxing Person"
              width={500}
              height={500}
              className="rounded-xl  "
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl text-gray-500 mb-8">Our Key Features</h2>
          <h3 className="text-3xl font-bold text-gray-800 mb-12">
            Transform Your Workflow with Automation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceImages.map((image, index) => (
              <CardContainer key={index} className="inter-var">
                <CardBody className="bg-gray-50 relative group/card h-full border shadow-lg rounded-md p-6 transform transition-all duration-300 hover:scale-105 w-[18rem]">
                  <CardItem translateZ="100" className="w-full ">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={180}
                      height={180}
                      className="h-60 w-full object-contain rounded-xl group-hover/card:shadow-xl"
                    />{" "}
                  </CardItem>

                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white mt-4"
                  >
                    {image.text}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {index === 0
                      ? "Record your browser actions effortlessly and convert them into structured data with ease."
                      : index === 1
                      ? "Generate detailed step-by-step descriptions of your recorded actions using AI-powered processing."
                      : index === 2
                      ? "Automatically generate Puppeteer scripts from your recorded actions for seamless automation."
                      : "Run your generated scripts in a headless environment and analyze their performance with real-time feedback."}
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>
      {/* {why choose us} */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            {[
              {
                title: "Easy to Use",
                description: "No coding skills required to automate tasks.",
              },
              {
                title: "Scalable Solutions",
                description: "Handle tasks of any complexity effortlessly.",
              },
              {
                title: "24/7 Support",
                description: "We’re here to assist you every step of the way.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white text-gray-800 p-6 rounded-md shadow-lg"
              >
                <h3 className="font-bold text-xl mb-4">{feature.title}</h3>
                <p className="text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Products Section */}
      <section id="about" className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Top Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationImages.map((destination, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-md overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <Image
                  src={destination.src}
                  alt={destination.name}
                  width={400} // Set equal width
                  height={300} // Set equal height
                  className="w-full h-64 object-cover rounded-md mb-4" // Ensure images cover the space
                />
                <h3 className="text-xl font-bold text-gray-800">
                  {destination.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {destination.price} • {destination.days}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Our Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Choose a plan that fits your needs. No hidden fees. Pay only for
            what you use.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="bg-gray-50  p-8 ">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Basic Plan
              </h3>
              <p className="text-xl font-bold text-gray-900 mb-4">$19/month</p>
              <ul className="text-left text-gray-600 mb-6">
                <li>
                  <span className="mr-2">✔</span> 5 Automation Tasks
                </li>
                <li>
                  <span className="mr-2">✔</span>Basic Reporting
                </li>
                <li>
                  <span className="mr-2">✔</span> Email Support
                </li>
                <li>
                  <span className="mr-2">✔</span> 1 User
                </li>
              </ul>
              <Button
                onClick={() => router.push("/auth/signup")}
                variant="default"
                className="w-full py-3 text-white bg-orange-500 hover:bg-orange-600 transition-all"
              >
                Get Started
              </Button>
            </div>

            {/* Plan 2 */}
            <div className="bg-gray-50 shadow-xl rounded-md p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Professional Plan
              </h3>
              <p className="text-xl font-bold text-gray-900 mb-4">$49/month</p>
              <ul className="text-left text-gray-600 mb-6">
                <li>
                  <span className="mr-2">✔</span> 20 Automation Tasks
                </li>
                <li>
                  <span className="mr-2">✔</span> Advanced Reporting
                </li>
                <li>
                  <span className="mr-2">✔</span> Priority Support
                </li>
                <li>
                  <span className="mr-2">✔</span> Up to 5 Users
                </li>
              </ul>
              <Button
                onClick={() => router.push("/auth/signup")}
                variant="default"
                className="w-full py-3 text-white bg-orange-500 hover:bg-orange-600 transition-all"
              >
                Get Started
              </Button>
            </div>

            {/* Plan 3 */}
            <div className="bg-gray-50 shadow-xl rounded-md p-8 ">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Enterprise Plan
              </h3>
              <p className="text-xl font-bold text-gray-900 mb-4">$99/month</p>
              <ul className="text-left text-gray-600 mb-6">
                <li>
                  <span className="mr-2">✔</span>Unlimited Automation Tasks
                </li>
                <li>
                  <span className="mr-2">✔</span> Full Reporting Suite
                </li>
                <li>
                  <span className="mr-2">✔</span> 24/7 Support
                </li>
                <li>
                  <span className="mr-2">✔</span> Unlimited Users
                </li>
              </ul>
              <Button
                onClick={() => router.push("/auth/signup")}
                variant="default"
                className="w-full py-3 text-white bg-orange-500 hover:bg-orange-600 transition-all"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            What People Say About Us
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            {[
              {
                name: "Mike Taylor",
                location: "Lahore, Pakistan",
                testimonial:
                  "This platform has revolutionized how we handle web automation. It was quick to set up and super intuitive to use!",
              },
              {
                name: "Chris Thomas",
                location: "CEO of Red Button",
                testimonial:
                  "As a company, we save countless hours on manual testing. This tool has significantly boosted our productivity and testing efficiency.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-md p-6 w-full sm:w-1/2 transform transition-all duration-300 hover:scale-105"
              >
                <p className="italic text-gray-600 mb-4">
                  "{testimonial.testimonial}"
                </p>
                <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="information" className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Address Section */}
            <div className="">
              <h3 className="text-xl font-semibold mb-4">Our Address</h3>
              <p className="text-lg">1234 Web Automation St.</p>
              <p className="text-lg">San Francisco, CA 94101</p>
              <p className="text-lg">United States</p>
            </div>

            {/* Contact Section */}
            <div className="">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-lg">Phone: +1 800-123-4567</p>
              <p className="text-lg">Email: support@webautomation.com</p>
              <p className="text-lg">
                Operating Hours: 9 AM - 6 PM (Mon - Fri)
              </p>
            </div>

            {/* Social Media Links */}
            <div className="">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center gap-6">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-blue-600"
                >
                  Facebook
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-blue-400"
                >
                  Twitter
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-blue-700"
                >
                  LinkedIn
                </a>
              </div>
            </div>
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
      <div>
        <BackToTopButton />
      </div>
    </div>
  );
};

export default LandingPage;
