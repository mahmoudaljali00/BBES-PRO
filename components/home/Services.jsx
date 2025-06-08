import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Button from "./Button";

import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

import {
  PiWallFill,
  PiPaintRollerFill,
  PiWrenchFill,
  PiUserGearFill,
} from "react-icons/pi";
import Pretitle from "./Pretitle";

const serviceData = [
  {
    name: "construction",
    icon: <PiWallFill />,
    title: "Construction Services",
    description: `We build with precision and innovation, ensuring that every structure
    is strong, reliable, and build to last. From foundations to finishing touches, our
    expertise transforms ideas into reality.`,
    serviceList: [
      "Residential Builds",
      "Structural Design",
      "Site Perp",
      "Concrete Work",
      "Farming & Roofing",
      "Interior Finsh",
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-1.jpg" },
      { url: "/assets/img/services/thumb-2.jpg" },
    ],
  },
  /////////////////////
  {
    name: "renovation",
    icon: <PiPaintRollerFill />,
    title: "Renovation Services",
    description: `We build with precision and innovation, ensuring that every structure
    is strong, reliable, and build to last. From foundations to finishing touches, our
    expertise transforms ideas into reality.`,
    serviceList: [
      "Kitchen Remodel",
      "Basement Finish",
      "Flooring",
      "Energy Upgrades",
      "Carpentry",
      "Painting",
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-3.jpg" },
      { url: "/assets/img/services/thumb-4.jpg" },
    ],
  },
  /////////////////////
  {
    name: "restoration",
    icon: <PiWrenchFill />,
    title: "Restoration Services",
    description: `We build with precision and innovation, ensuring that every structure
    is strong, reliable, and build to last. From foundations to finishing touches, our
    expertise transforms ideas into reality.`,
    serviceList: [
      "Kitchen Remodel",
      "Basement Finish",
      "Flooring",
      "Energy Upgrades",
      "Carpentry",
      "Painting",
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-5.jpg" },
      { url: "/assets/img/services/thumb-6.jpg" },
    ],
  },
  ////////////////////
  {
    name: "consulting",
    icon: <PiUserGearFill />,
    title: "Consulting Services",
    description: `We build with precision and innovation, ensuring that every structure
    is strong, reliable, and build to last. From foundations to finishing touches, our
    expertise transforms ideas into reality.`,
    serviceList: [
      "Kitchen Remodel",
      "Basement Finish",
      "Flooring",
      "Energy Upgrades",
      "Carpentry",
      "Painting",
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-5.jpg" },
      { url: "/assets/img/services/thumb-6.jpg" },
    ],
  },
];

const fadeInVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
};

const Services = () => {
  const [activeTab, setActiveTab] = useState("construction");
  return (
    <section className="pt-16 xl:pt-32" id="services">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: "some" }}
          className="text-center max-w-[540px] mx-auto mb-20 "
        >
          <Pretitle text={"Our Services"} center />
          <h2 className="h2 mb-3">Solutions We Provide</h2>
          <p className="mb-11 max-w-[480px] mx-auto">
            Offering tailored construction Solutions, from planning to
            completion, with a foucs on quality and innovation.
          </p>
        </motion.div>
        {/* Tabs */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: "some" }}
        >
          <Tabs
            defaultValue="construction"
            onValueChange={(value) => setActiveTab(value)}
            className="flex flex-col xl:flex-row w-full gap0[30px] "
          >
            <TabsList
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-[30px] h-full w-full
           rounded-none p-0 bg-transparent xl:w-[345px] "
            >
              {serviceData.map((item) => {
                return (
                  <TabsTrigger
                    key={item.name}
                    value={item.name}
                    className="w-full rounded-none h-[100px] flex items-center relative
                  shadow-custom p-0 outline-none  "
                  >
                    <div
                      className={`w-[100px] h-[100px] flex items-center justify-center
                  absolute left-0 ${
                    activeTab === item.name
                      ? "bg-primary text-white"
                      : "bg-accent text-primary"
                  }`}
                    >
                      <div className="text-4xl">{item.icon}</div>
                    </div>
                    <div
                      className="uppercase font-primary text-base font-semibold 
                    tracking-[.6px] w-[100px] ml-16 "
                    >
                      {item.name}
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {/* Tabs content */}
            <div className="flex-1 bg-white shadow-custom h-[490px] p-[30px] ">
              {serviceData.map((item) => {
                return (
                  <TabsContent
                    key={item.name}
                    value={item.name}
                    className="m-0"
                  >
                    <motion.div
                      variants={fadeInVariant}
                      initial="hidden"
                      whileInView="show"
                      exit="hidden"
                      className="flex flex-col md:flex-row gap-[30px] "
                    >
                      {/* images */}
                      <div className="flex md:flex-col gap-5 xl:gap-[30px] ">
                        {item.thumbs.map((thumb, index) => {
                          return (
                            <div
                              key={index}
                              className="relative w-[140px] xl:w-[200px] h-[140px] xl:h-[200px] "
                            >
                              <img
                                src={thumb.url}
                                className="w-[140px] xl:w-[200px] h-[140px] xl:h-[200px] object-cover"
                                alt=""
                              />
                            </div>
                          );
                        })}
                      </div>
                      {/* text & btn */}
                      <div>
                        <div>
                          <h3 className="h3 mb-6">{item.title}</h3>
                          <p className="mb-10">{item.description}</p>
                          {/* services list */}
                          <ul className="grid grid-cols-2 gap-4 mb-12">
                            {item.serviceList.map((service, index) => {
                              return (
                                <li
                                  key={index}
                                  className="flex items-center gap-4"
                                >
                                  <div className="w-[6px] h-[6px] bg-accent "></div>
                                  <div className="capitalize font-medium text-primary ">
                                    {service}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                          {/* btn */}
                          <Button text={"Red More"} />
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
