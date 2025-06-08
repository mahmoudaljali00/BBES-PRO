import Image from "next/image";
import Link from "next/link";
import Pretitle from "./Pretitle";

import { RiArrowRightUpLine, RiCheckboxCircleFill } from "react-icons/ri";
import Button from "./Button";

import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

const workData = [
  {
    img: "/assets/img/work/restoration.jpg",
    name: "restoration",
    Description: "Your short description",
    href: "",
  },
  {
    img: "/assets/img/work/construction.jpg",
    name: "construction",
    Description: "Your short description",
    href: "",
  },
  {
    img: "/assets/img/work/renovation.jpg",
    name: "renovation",
    Description: "Your short description",
    href: "",
  },
  {
    img: "/assets/img/work/consulting.jpg",
    name: "consulting",
    Description: "Your short description",
    href: "",
  },
];

const Work = () => {
  return (
    <div className="pt-16 xl:pt-32" id="projects">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: "some" }}
          className="text-center max-w-[540px] mx-auto xl:mb-20"
        >
          <Pretitle text={"Our work"} center />
          <h2 className="h2 mb-3">Discover Our Project</h2>
          <p className="mb-11 max-w-[480px] mx-auto ">
            Providing expert services designer to deliver quality and innovation
            in every project we undertake.
          </p>
        </motion.div>
      </div>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: "some" }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
      >
        {workData.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-[492px] flex-1 relative overflow-hidden group flex justify-center"
            >
              <img
                src={item.img}
                className="w-full h-full object-cover"
                alt=""
                quality={100}
              />
              <div
                className="w-[90%] h-[84px] bg-primary absolute bottom-4 flex
              justify-between items-center text-white md:translate-y-[108px] 
              md:group-hover:translate-y-0 transition-all duration-500 "
              >
                <div className="pl-8">
                  <h4
                    className=" text-white font-primary font-semibold tracking-[1px]
                  uppercase"
                  >
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    <RiCheckboxCircleFill className="text-accent text-xl" />
                    <p>{item.Description}</p>
                  </div>
                </div>
                <Link
                  href={item.href}
                  className="w-[44px] xl:w-[60px] h-[44px] xl:h-[60px] bg-accent
                text-primary text-2xl flex justify-center items-center absolute
                  right-3 "
                >
                  <RiArrowRightUpLine className="group-hover:rotate-45 transition-all duration-500 delay-700" />
                </Link>
              </div>
            </div>
          );
        })}
      </motion.div>
      <div className="flex items-center justify-center text-center  m-10">
        <div>
          <Button text={"See more"} />
        </div>
      </div>
    </div>
  );
};

export default Work;
