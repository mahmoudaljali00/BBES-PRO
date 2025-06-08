import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";

export default function Blog() {
  ///////////////////date formatting////////////////////

  // function to format the date as '20 may 2024 14:11 pm'
  const formatDate = (date) => {
    // check if date if valid
    if (!date || isNaN(date)) {
      return ""; // or handle the error as needed
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true, // use 12-hour format
    };

    return new Intl.DateTimeFormat("en-UK", options).format(date);
  };
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchOpen = () => {
    setSearchInput(!searchInput); // open the search input
  };

  const handleSearchClose = () => {
    setSearchInput(false);
  };

  const [searchInput, setSearchInput] = useState(false); // initialize blogs with fetched data

  // fetch blog data
  const { alldata, loading } = useFetchData("/api/blogs");

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filter all data based on search query
  const filteredBlogs =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Calculate the index of the First blog displayed on the current page
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastblog = currentPage * perPage;

  const publishedblogs = filteredBlogs.filter((ab) => ab.status === "publish");

  // Get the current pages blogs
  const currentBlogs = publishedblogs.slice(indexOfFirstBlog, indexOfLastblog);

  // total number of blogs
  const allblog = publishedblogs.length;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Head>
        <title>BBES Blog - Professional Insights</title>
        <meta
          name="description"
          content="Stay informed with construction industry trends, expert tips, and project highlights from BBES."
        />
      </Head>

      {/* Page Description */}
      <section className="max-w-4xl mx-auto mt-10 mb-6 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          BBES Blog
        </h1>
        <p className="text-lg text-gray-600">
          Explore our latest articles, industry insights, and project
          highlights. Stay ahead with professional tips and updates from the
          world of construction and engineering.
        </p>
      </section>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto py-8 px-6 flex flex-col items-center">
        <input
          type="text"
          placeholder="Search blog posts by title, tag, or date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-accentdark transition"
        />
        <p className="text-gray-400 text-sm mt-2">
          {publishedblogs.length} posts • Page {currentPage} of{" "}
          {pageNumbers.length}
        </p>
      </div>

      {/* Blog Posts Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-[500px]">
          <Spinner />
        </div>
      ) : (
        <section className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentBlogs.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg py-20">
              No blog posts found. Try a different search.
            </div>
          ) : (
            currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-xl overflow-hidden group transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={blog.images[0]}
                    alt={blog.title}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="absolute top-4 left-4 bg-accentdark text-white text-xs px-3 py-1 shadow">
                      {blog.tags[0]}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-accentdark transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(new Date(blog.createdAt))}
                    </span>

                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      BY BBES TEAM
                    </span>

                    {/* {blog.readTime && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        {blog.readTime} min read
                      </span>
                    )} */}
                  </div>
                  <div className="h-14">
                    {/* <p className="text-gray-700 mt-3 line-clamp-3">{blog.blogcategory}</p> */}
                    {blog.description && (
                      <p className=" text-gray-500 mt-2 text-sm line-clamp-2">
                        {blog.description}
                      </p>
                    )}
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-block text-accentdark font-semibold hover:text-accentdark transition-colors underline-offset-4 hover:underline"
                    >
                      Read More →
                    </Link>
                    <div className="flex gap-2">
                      {blog.tags &&
                        blog.tags.slice(1, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 "
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* Pagination */}
      {publishedblogs.length > 0 && (
        <div className="flex justify-center items-center mt-10 space-x-2 mb-20">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          {pageNumbers
            .slice(
              Math.max(currentPage - 3, 0),
              Math.min(currentPage + 2, pageNumbers.length)
            )
            .map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-2 border border-gray-300 transition ${
                  currentPage === number
                    ? "bg-yellow-500 text-white font-bold shadow"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {number}
              </button>
            ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={publishedblogs.length <= indexOfLastblog}
            className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
