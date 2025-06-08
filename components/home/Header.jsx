import { RiArrowRightUpLine } from "react-icons/ri";
//components
import Logo from "./Logo";
import NavMobile from "./NavMobile";
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


const Header = () => {
  const router = useRouter();
  return (
    <header className="bg-primary py-4">
      <div className=" mx-9 ">
        <div className="flex items-center justify-between">
          {/* logo */}
          <Logo/>
          {/* nav & btn */}
          <nav className="hidden xl:flex items-center gap-12">
            <ul className="flex">
              {links.map((link, index) => {
                return (
                  <li
                    key={index}
                    className="text-white text-sm uppercase font-primary font-medium
                    tracking-[1.2px] after:content-['/'] after:mx-4 last:after:content-none after:text-accent "
                  >
                    <Link
                      href={link.path}
                      className={`hover:text-accent transition-all duration-200 cursor-pointer ${ router.pathname === link.path ? "text-accent" : "text-white" } `}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* btn */}
            <button
              className="w-[200px] h-[54px] py-[5px] pl-[10px] pr-[5px] flex
           items-center justify-between min-w-[200px] bg-white group"
            >
              <div
                className="flex-1 text-center tracking-[1.2px] font-primary
             font-bold text-primary text-sm uppercase"
              >
                Get a quote
              </div>
              <div className="w-11 h-11 bg-primary flex items-center justify-center">
                <RiArrowRightUpLine
                  className="text-white text-xl group-hover:rotate-45
              transition-all duration-200"
                />
              </div>
            </button>
          </nav>

          {/* nav mobile */}
          <div className="xl:hidden">
          <NavMobile/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
