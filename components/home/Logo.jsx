import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="">
      <img src="/assets/logo.svg" className="w-[160px] h-auto " alt="" />
    </Link>
  );
};

export default Logo;
