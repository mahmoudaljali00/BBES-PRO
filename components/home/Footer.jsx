import Image from "next/image";
import Link from "next/link";

import {
  RiMapPin2Line,
  RiPhoneFill,
  RiMailFill,
  RiArrowRightLine,
} from "react-icons/ri";

import Socials from "./Socials";

import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

const Footer = () => {
  return (
    <motion.footer
      variants={fadeIn("up", 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.1 }}
      className="mt-16 xl:mt-32 bg-primary"
    >
      <div className="container mx-auto">
        <div className="py-16 xl:py-[100px] flex flex-col xl:flex-row gap-[60px] xl:gap-[30px] ">
          {/* logo & text */}
          <div className="flex-1">
            <Link href="/" className="flex mb-6">
              <img  src="/assets/logo.svg" className="w-[160px] h-auto " alt="" />
            </Link>
            <p className="text-border max-w-[270px]">
            The BBEST is a non-profit organization that provides free education to children in need.
            </p>
          </div>
          {/* contact */}
          <div className="flex-1 text-border">
            <h4 className="h4 text-white mb-10">Contact</h4>
            <ul className="flex flex-col gap-6 ">
              <li className="flex items-center gap-4">
                <RiMapPin2Line className="text-accent text-xl" />
                <p>1250 Brickstone Ave, Dallas, TX 75201, USA</p>
              </li>

              <li className="flex items-center gap-4">
                <RiPhoneFill className="text-accent text-xl" />
                <p>+249 - 90 924 7608</p>
              </li>

              <li className="flex items-center gap-4">
                <RiMailFill className="text-accent text-xl" />
                <p>bbes@info.com</p>
              </li>
            </ul>
          </div>
          {/* newsletter */}
          <div className="flex-1 text-border">
            <h4 className="h4 text-white mb-10">Newsletter</h4>
            <p className="mb-9">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
              dolorum, excepturi mollitia fugiat velit sed.
            </p>
            {/* input */}
            <div className="relative max-w-[370] ">
              <input
                type="text"
                placeholder="Enter yoyr email"
                className="bg-[#222427] h-16 w-full pl-7 rounded-none outline-none flex items-center "
              />
              <button
                className="bg-accent w-12 h-12 absolute right-2 top-2 bottom-2
              text-primary text-xl flex items-center justify-center "
              >
                <RiArrowRightLine />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* copyright */}
      <div className="container mx-auto xl:px-0 py-12 border-t border-border/10 flex flex-col gap-6 xl:flex-row items-center justify-between">
        <p>Copyright &copy; 2025 ACTMOUD. All rights reserved </p>
        <Socials
          containerStyles="flex gap-6 text-white"
          iconStyles="hover:text-accent transition-all"
        />
      </div>
    </motion.footer>
  );
};

export default Footer;
