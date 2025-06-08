import Head from "next/head";
import Link from "next/link";
import { HiXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";

export default function Services() {
  return (
    <>
      <Head>
        <title>Services</title>
      </Head>

      <div className="bg-white min-h-screen">
        {/* Top Section */}
        <div className="bg-accent py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-2">
              SeaSide Services
            </h2>
            <p className="text-white/80">
              Home <span className="mx-1">&gt;</span>{" "}
              <span className="text-white font-semibold">Services</span>
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start hover:shadow-xl transition"
                >
                  <span className="text-accent text-2xl font-bold mb-2">
                    {num.toString().padStart(2, "0")}
                  </span>
                  <div className="flex items-center mb-4 gap-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Web Development
                    </h2>
                    <img
                      src="/assets/img/website_icon.svg"
                      alt=""
                      className="w-8 h-auto object-cover"
                    />
                  </div>
                  <ul className="mb-4 space-y-1 text-gray-700 list-disc list-inside">
                    <li>Performance & Load Time</li>
                    <li>Reusable Components</li>
                    <li>Responsiveness</li>
                    <li>Quality assurance and testing.</li>
                    <li>Quality maintenance, updates, and bug fixes.</li>
                  </ul>
                  <p className="text-gray-600 text-sm">
                    We are very good in web development offering service, I
                    offer reliable web development services to generate the
                    remarkable results which your business need.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="flex items-center justify-center gap-2 text-accent font-semibold text-lg mb-2">
                <img src="/img/chevron_right.png" alt="" className="w-5 h-5" />{" "}
                PRICING PLAN
              </h3>
              <h2 className="text-3xl font-bold text-gray-800">
                Pricing My Work
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Life Plan */}
              <div className="bg-gray-50 rounded-xl shadow p-8 flex flex-col items-center">
                <h4 className="text-xl font-bold text-accent mb-2">
                  Life Plan
                </h4>
                <p className="text-gray-600 mb-4">
                  Perfect Choice for individual
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  $29.00{" "}
                  <span className="text-base font-normal text-gray-500">
                    Monthly
                  </span>
                </h2>
                <Link href="/contact" className="w-full">
                  <button className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent/90 transition mb-6">
                    Get Start Now
                  </button>
                </Link>
                <div className="w-full">
                  <h5 className="font-semibold text-gray-700 mb-2">
                    Lite includes:
                  </h5>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <IoMdCheckmark className="text-accent" /> Powerful admin
                      panel
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <IoMdCheckmark className="text-accent" /> 1 Native android
                      app
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <HiXMark className="text-red-400" /> Multi-language
                      support
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <HiXMark className="text-red-400" /> Full Access
                    </li>
                  </ul>
                </div>
              </div>
              {/* Premium Plan */}
              <div className="bg-gray-50 rounded-xl shadow p-8 flex flex-col items-center">
                <h4 className="text-xl font-bold text-accent mb-2">
                  Premium Plan
                </h4>
                <p className="text-gray-600 mb-4">
                  Perfect Choice for individual
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  $59.00{" "}
                  <span className="text-base font-normal text-gray-500">
                    Monthly
                  </span>
                </h2>
                <Link href="/contact" className="w-full">
                  <button className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent/90 transition mb-6">
                    Get Start Now
                  </button>
                </Link>
                <div className="w-full">
                  <h5 className="font-semibold text-gray-700 mb-2">
                    Everything in Lite, plus:
                  </h5>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <IoMdCheckmark className="text-accent" /> Powerful admin
                      panel
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <IoMdCheckmark className="text-accent" /> 1 Native android
                      app
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <HiXMark className="text-red-400" /> Multi-language
                      support
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <HiXMark className="text-red-400" /> Full Access
                    </li>
                  </ul>
                </div>
              </div>
              {/* Pro Plan */}
              <div className="bg-gray-50 rounded-xl shadow p-8 flex flex-col items-center">
                <h4 className="text-xl font-bold text-accent mb-2">Pro Plan</h4>
                <p className="text-gray-600 mb-4">
                  Perfect Choice fo individual
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  $79.00{" "}
                  <span className="text-base font-normal text-gray-500">
                    Monthly
                  </span>
                </h2>
                <Link href="/contact" className="w-full">
                  <button className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent/90 transition mb-6">
                    Get Start Now
                  </button>
                </Link>
                <div className="w-full">
                  <h5 className="font-semibold text-gray-700 mb-2">
                    Everything in pro, plus:
                  </h5>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <IoMdCheckmark className="text-accent" /> Powerful admin
                      panel
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <IoMdCheckmark className="text-accent" /> 1 Native android
                      app
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <HiXMark className="text-red-400" /> Multi-language
                      support
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <HiXMark className="text-red-400" /> Full Access
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
