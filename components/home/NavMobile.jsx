import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { RiMenu3Fill } from "react-icons/ri";
import Logo from "./Logo";
import Socials from "./Socials";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blogs" },
  { name: "services", path: "/services" },
  { name: "projects", path: "/projects" },
  { name: "gallery", path: "/gallery" },
  { name: "contact", path: "/contact" },
];

const NavMobile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className="text-white flex items-center justify-center text-3xl"
        onChange={() => setIsOpen(true)}
      >
        <RiMenu3Fill />
      </SheetTrigger>
      <SheetContent className="bg-primary border-none text-white">
        <div className="flex flex-col pt-16 pb-8 items-center justify-between h-full">
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SheetDescription className="sr-only">
              Navigation menu
            </SheetDescription>
          </SheetHeader>
          <ul className="w-full flex flex-col gap-10 justify-center text-center">
            {links.map((link, index) => {
              return (
                <li
                  key={index}
                  className="text-white uppercase font-primary font-medium tracking-[1.2px]"
                >
                  <Link
                    href={link.path}
                    className={`hover:text-accent transition-all duration-200 cursor-pointer ${
                      router.pathname === link.path ? "text-accent" : "text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* socials */}
          <Socials containerStyles="text-white text-xl flex gap-6" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
