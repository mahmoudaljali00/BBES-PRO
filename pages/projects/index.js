import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function projects() {
  const { alldata, loading } = useFetchData("/api/projects");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    // filter project based on selectedcategory
    if (selectedCategory === "All") {
      setFilteredProjects(alldata.filter((pro) => pro.status === "publish"));
    } else {
      setFilteredProjects(
        alldata.filter(
          (pro) =>
            pro.status === "publish" &&
            pro.projectcategory[0] === selectedCategory
        )
      );
    }
  }, [selectedCategory, alldata]);

  return (
    <>
      <Head>
        <title>Project</title>
      </Head>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Our Recent Works</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
              similique sint repellendus nobis quod fuga!
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              className={`px-5 py-2 border transition ${
                selectedCategory === "All"
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-accent/10"
              }`}
              onClick={() => handleCategoryChange("All")}
            >
              All
            </button>
            <button
              className={`px-5 py-2 border transition ${
                selectedCategory === "Wibsite Development"
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-accent/10"
              }`}
              onClick={() => handleCategoryChange("Wibsite Development")}
            >
              Website
            </button>
            <button
              className={`px-5 py-2 border transition ${
                selectedCategory === "App Development"
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-accent/10"
              }`}
              onClick={() => handleCategoryChange("App Development")}
            >
              Apps
            </button>
            <button
              className={`px-5 py-2 border transition ${
                selectedCategory === "E-commerce Site"
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-accent/10"
              }`}
              onClick={() => handleCategoryChange("E-commerce Site")}
            >
              Digital
            </button>
            <button
              className={`px-5 py-2 border transition ${
                selectedCategory === "Prefomance Evaluation"
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-accent/10"
              }`}
              onClick={() => handleCategoryChange("Prefomance Evaluation")}
            >
              Content
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="flex justify-center items-center col-span-full h-48">
                <Spinner />
              </div>
            ) : filteredProjects.length === 0 ? (
              <h1 className="text-2xl font-semibold text-center col-span-full">
                No Project Found
              </h1>
            ) : (
              filteredProjects.map((pro) => (
                <Link
                  href={`/projects/${pro.slug}`}
                  key={pro._id}
                  className="block bg-white shadow hover:shadow-lg transition overflow-hidden group"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={pro.images[0]}
                      alt={pro.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex items-center justify-between px-5 pt-4 mb-1">
                    <h2 className="text-lg font-semibold">{pro.title}</h2>
                    <GoArrowUpRight className="text-xl text-accent group-hover:translate-x-1 group-hover:rotate-45 transition-transform" />
                  </div>
                  <div className="flex items-center justify-start px-5 pb-4">
                    <h2 className="text-gray-500 text-sm line-clamp-2">
                      {pro.description}
                    </h2>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
