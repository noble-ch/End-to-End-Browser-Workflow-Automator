"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Header } from "@/components/HeaderLandingPage";
import image1 from '../../output/6772c95ad9ba7b5b4f969b94/step4_email.png';
import image2 from '../../output/6772c95ad9ba7b5b4f969b94/step5_password.png';
import image3 from '../../output/6772c95ad9ba7b5b4f969b94/step6_password_click.png';
import image4 from '../../output/6772c95ad9ba7b5b4f969b94/step7_keyboard_down_control.png'; // Ensure this is the correct image path
import image5 from "../../public/rome_office.jpg";
import image6 from "../../public/workspace.jpg";
import image7 from "../../public/workspace2.jpg";

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
    // This can be replaced with actual demo logic
    alert("Play Demo");
  };

  // Image data for services
  const serviceImages = [
    { src: image1, alt: "Step 4: Email", text: "Action Recording" },
    { src: image2, alt: "Step 5: Password", text: "Step Descriptions" },
    { src: image3, alt: "Step 6: Click Password", text: "Script Generation" },
    { src: image4, alt: "Step 7: Keyboard Down Control", text: "Run & Analyze" },
  ];

  // Destination data corrected with the appropriate object structure
  const destinationImages = [
    { src: image5, name: "Rome, Italy", price: "$5.42k", days: "10 Days Trip" },
    { src: image6, name: "London, UK", price: "$4.2k", days: "12 Days Trip" },
    { src: image7, name: "Full Europe", price: "$15k", days: "28 Days Trip" },
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
              Effortlessly automate your browser interactions and turn them into executable code using our intuitive platform. No need to write complex scripts.
            </p>
            <div className="flex justify-center md:justify-start gap-6">
              <Button onClick={handleLearnMore} variant="default" className="transition-all duration-300 hover:scale-105">
                Learn More
              </Button>
              <Button onClick={handleDemoPlay} variant="outline" className="transition-all duration-300 hover:scale-105 text-black border-white hover:bg-white hover:text-black">
                Play Demo
              </Button>
            </div>
          </div>
          <div className="ms-10 mt-10">
            <Image src="/chilingperson.png" alt="Relaxing Person" width={500} height={500} className="rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl text-gray-500 mb-8">Our Key Features</h2>
          <h3 className="text-3xl font-bold text-gray-800 mb-12">Transform Your Workflow with Automation</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {serviceImages.map((image, index) => (
              <div key={index} className="p-6 bg-white shadow-lg rounded-md transform transition-all duration-300 hover:scale-105">
                <Image src={image.src} alt={image.alt} width={180} height={64} className="mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-800">{image.text}</h4>
                <p className="text-sm text-gray-600">
                  {index === 0 ? "Record your browser actions effortlessly and convert them into structured data with ease."
                  : index === 1 
                  ? "Generate detailed step-by-step descriptions of your recorded actions using AI-powered processing."
                  : index === 2 
                  ? "Automatically generate Puppeteer scripts from your recorded actions for seamless automation."
                  : "Run your generated scripts in a headless environment and analyze their performance with real-time feedback."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Top Destinations Section */}
<section className="bg-gray-100 py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">Top Destinations</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinationImages.map((destination, index) => (
        <div key={index} className="bg-white shadow-xl rounded-md overflow-hidden transition-all duration-300 hover:scale-105">
          <Image
            src={destination.src}
            alt={destination.name}
            width={400}  // Set equal width
            height={300} // Set equal height
            className="w-full h-64 object-cover rounded-md mb-4"  // Ensure images cover the space
          />
          <h3 className="text-xl font-bold text-gray-800">{destination.name}</h3>
          <p className="text-sm text-gray-600">
            {destination.price} • {destination.days}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">What People Say About Us</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            {[{
              name: "Mike Taylor", location: "Lahore, Pakistan", testimonial: "This platform has revolutionized how we handle web automation. It was quick to set up and super intuitive to use!"
            }, {
              name: "Chris Thomas", location: "CEO of Red Button", testimonial: "As a company, we save countless hours on manual testing. This tool has significantly boosted our productivity and testing efficiency."
            }].map((testimonial, index) => (
              <div key={index} className="bg-white shadow-lg rounded-md p-6 w-full sm:w-1/2 transform transition-all duration-300 hover:scale-105">
                <p className="italic text-gray-600 mb-4">"{testimonial.testimonial}"</p>
                <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">© {new Date().getFullYear()} Jadoo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

