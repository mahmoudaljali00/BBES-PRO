import { useEffect, useState } from "react";

// components
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Work from "@/components/home/Work";
import Head from "next/head";

const index = () => {
  const [headerActive, setHeaderActive] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setHeaderActive(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="overflow-hidden">
      <Head>
        <title>BBES</title>
        <meta name="description" content="Generated For BBES App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <About />
      <Stats />
      <Services />
      <Work />
      <Testimonials />
      <Faq />
      <Contact />
    </div>
  );
};

export default index;
