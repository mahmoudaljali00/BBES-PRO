import Image from "next/image";
import Pretitle from "./Pretitle";
import Button from "./Button";

import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

const About = () => {
  return (
    <div className="pt-16 xl:pt-32" id="about">
      <div className="container mx-auto">
        <div className="flex flex-col gap-12 xl:gap-0 xl:flex-row xl:items-center">
          {/* text */}
          <div className="flex-1">
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: "some" }}
              className="max-w-[540px]"
            >
              {/* pretitle */}
              <Pretitle text="About us" />
              <h2 className="h2 mb-6">
                Focused On Excellence In Every Project
              </h2>
              <p className="mb-11">
                Our unwavering commitment to Excellence drives every project we
                undertake. We meticulously craft solutions that embody quality,
                precision, and innovation from concept to completion.
              </p>
              <div className="w-max flex flex-col text-right mb-10">
                <img        
                  src="/assets/img/about/signature.svg"
                  className="w-[160px] h-auto "
                  alt=""
                />
              </div>
              {/* btn */}
              <Button text="Contact us" />
            </motion.div>
          </div>
          {/* img */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: "some" }}
            className="flex-1 xl:flex xl:justify-center "
          >
            <div className="xl:w-[444px] xl:h-[493px] relative">
              {/* bg */}
              <div className="hidden xl:flex w-[444px] h-[493] bg-accent absolute -top-4 -left-4 -z-10"></div>
              <img
                src={"/assets/img/about/img.jpg"}
                className="w-[444px] h-[493px] object-cover"
                alt=""
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
