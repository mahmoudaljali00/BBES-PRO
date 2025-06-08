import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import Blogsearch from "@/components/Blogsearch";

const posts = {
  "building-excellence": {
    title: "Building with Excellence",
    content: "Discover how we ensure top-tier quality in every project...",
    date: "May 20, 2025",
    image: "/images/excellence.jpg",
  },
  "modern-construction-trends": {
    title: "Modern Construction Trends",
    content: "Stay updated with the latest industry insights...",
    date: "May 18, 2025",
    image: "/images/trends.jpg",
  },
};

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query; // fetch the slug parameter from the router

  // hook for all data fetching
  const { alldata } = useFetchData("/api/blogs");
  const publishedblogs = alldata.filter((ab) => ab.status === "publish");

  const [searchInput, setSearchInput] = useState(false); // initialize blogs with fetched data

  const handleSearchOpen = () => {
    setSearchInput(!searchInput); // open the search input
  };

  const handleSearchClose = () => {
    setSearchInput(false); // close the search input
  };

  const [blogData, setBlogData] = useState({ blog: {}, comments: [] }); // intialize comments as an empty array
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    title: "",
    contentpera: "",
    maincomment: true,
    parent: null, // track parent comment id for replies
    parentName: "", // track parent comment name
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageOk, setMessageOk] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blogs/${slug}`);
          setBlogData(response.data);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch data. please try again later.");
          setLoading(false);
        }
      }
    };

    fetchBlogData();
  }, [slug]); // fetch data whenever slug changes

  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission
    try {
      const response = await axios.post(`/api/blogs/${slug}`, newComment);

      //check if its a reply (nested comment) or root comment
      if (newComment.parent) {
        // add the new comment to its parent's children array
        setBlogData((prevData) => {
          const updatedComments = prevData.comments.map((comment) => {
            if (comment._id === newComment.parent) {
              return {
                ...comment,
                children: [
                  ...(comment.children || []), // ensure children is an array
                  response.data, // add the new reply comment
                ],
              };
            } else if (comment.children && comment.children.length > 0) {
              return {
                ...comment,
                children: updateChildrenComments(
                  comment.children,
                  newComment.parent,
                  response.data
                ),
              };
            }
            return comment;
          });
          return { ...prevData, comments: updatedComments };
        });
      } else {
        // add the new comment to the root comments array
        setBlogData((prevData) => ({
          ...prevData,
          comments: [response.data, ...prevData.comments],
        }));
        console.log("New comment added to root comments", newComment);
      }

      setMessageOk("✅ Comment posted successfully!");
      setTimeout(() => {
        setMessageOk("");
      }, 5000); // clear message after 5 seconds

      // clear the form after successfully submission
      setNewComment({
        name: "",
        email: "",
        title: "",
        contentpera: "",
        maincomment: true,
        parent: null, // reset parent comment id
        parentName: "", // reset parent comment name
      });
    } catch (error) {
      console.log(error);
      setMessageOk("❌ Failed to post comment. Please try again.");
      setTimeout(() => {
        setMessageOk("");
      }, 5000); // clear message after 5 seconds
    }
  };

  // function to update children comments recursively
  const updateChildrenComments = (comments, parentId, newComment) => {
    return comments.map((comment) => {
      if (comment._id === parentId) {
        // add the new reply to the children of array of the parent comment
        return {
          ...comment,
          children: [...(comment.children || []), newComment],
        };
      } else if (comment.children && comment.children.length > 0) {
        // recursively update children comments
        return {
          ...comment,
          children: updateChildrenComments(
            comment.children,
            parentId,
            newComment
          ),
        };
      }
      return comment;
    });
  };

  // for scroll down to the comment form after posting a comment
  const replyFormRef = useRef(null);

  const handleRyply = (parentComment) => {
    setNewComment({
      ...newComment,
      maincomment: false, // set main comment to false for replies
      parent: parentComment._id,
      parentName: parentComment.name, // set parent comment name
    });
    if (replyFormRef.current) {
      replyFormRef.current.scrollIntoView({ behavior: "smooth" }); // scroll to the comment form
    }
  };

  const removreply = useRef(null);
  // function to handle removing the reply
  const handleRemoveReply = () => {
    setNewComment({
      ...newComment,
      parent: null,
      parentName: null,
      maincomment: true, // reset main comment to true
    });
    if (removreply.current) {
      removreply.current.scrollIntoView({ behavior: "smooth" }); // scroll to the comment form
    }
  };

  if (loading) {
    return (
      <div className="flex flex-center wh_100">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  ///////////////////date formatting////////////////////
  const createdAtDate = blogData.blog.createdAt
    ? new Date(blogData && blogData.blog.createdAt)
    : null;

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

  //////////////////// URL for sharing the blog post/////////////////////
  const blogUrl = `http://localhost:3000/blogs/${slug}`;

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); // reset copied state after 3 seconds
  };

  //////////////////////////// Code component for syntax highlighting and copy functionality //////////////
  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); // reset copied state after 3 seconds
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            style={a11yDark}
            language={match[1]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflow: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "1",
              background: "#3d3d3d",
              color: "#fff",
              padding: "10px",
            }}
          >
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
      );
    } else {
      return (
        <code className="md-post-code" {...props}>
          {children}
        </code>
      );
    }
  };

  const renderComments = (comments) => {
    if (!comments) {
      return null; // handle case where comments are not yet available
    }

    // create a map to efficiently find children of each comment
    const commentsMap = new Map();
    comments.forEach((comment) => {
      if (comment.maincomment) {
        commentsMap.set(comment._id, []);
      }
    });

    // populate children comments into their respective parents
    comments.forEach((comment) => {
      if (!comment.maincomment && comment.parent) {
        if (commentsMap.has(comment.parent)) {
          commentsMap.get(comment.parent).push(comment);
        }
      }
    });

    // render the comments recursively
    return comments
      .filter((comment) => comment.maincomment)
      .map((parentComment) => {
        return (
          <div
            className="bg-white shadow-md p-4 mb-6 border border-gray-200"
            key={parentComment._id}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-gray-800">
                {parentComment.name}
              </h3>
              <span className="text-xs text-gray-400">
                {new Date(parentComment.createdAt).toLocaleString()}
              </span>
            </div>
            <h4 className="text-sm text-gray-600 mb-1">
              Topic:{" "}
              <span className="font-medium text-accent">
                {parentComment.title}
              </span>
            </h4>
            <p className="text-gray-700 mb-2">{parentComment.contentpera}</p>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => handleRyply(parentComment)}
                className="text-sm text-accent hover:underline font-medium"
              >
                Reply
              </button>
              {parentComment.parent && (
                <span className="text-xs text-gray-500 italic ml-2">
                  Reply to {parentComment.parentName}
                </span>
              )}
            </div>
            {/* Children comments */}
            <div className="pl-4 border-l-2 border-accent mt-3 space-y-4">
              {commentsMap.get(parentComment._id).map((childComment) => (
                <div
                  className="bg-gray-50 p-3 border border-gray-100"
                  key={childComment._id}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-700 text-base">
                      {childComment.name}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {new Date(childComment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 italic">
                    Replied to {childComment.parentName}
                  </span>
                  <h4 className="text-sm text-gray-600 mt-1">
                    Topic:{" "}
                    <span className="font-medium text-accent">
                      {childComment.title}
                    </span>
                  </h4>
                  <p className="text-gray-700 mt-1">
                    {childComment.contentpera}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      });
  };
  return (
    <>
      <Head>
        <title>{blogData.title} | BBES Blog</title>
        <meta
          name="description"
          content="Stay informed with the latest construction industry insights."
        />
      </Head>

      <div className="max-w-4xl mx-auto py-10 px-5">
        <img
          src={blogData.blog.images[0] || "/img/noimage.png"}
          alt={blogData.title}
          className="w-full h-60 object-cover  shadow-md"
        />
        <div className="flex flex-col mt-3 p-5  shadow-md bg-white">
          <div className="flex flex-col gap-5 xl:flex-row justify-between items-center text-center p-2 text-xl">
            <div className="flex flex-row gap-7 items-center">
              <div className="flex flex-row items-center gap-2">
                <img
                  src="/assets/img/testimonials/avatar.jpg"
                  alt=""
                  className=" w-10 h-10 object-cover"
                />
                <span className="text-base font-medium">By Seaside</span>
              </div>

              <div className="flex flex-row items-center gap-1">
                <SlCalender className="text-accent" />
                <span className="text-sm">{formatDate(createdAtDate)}</span>
              </div>

              <div className="flex flex-row items-center gap-1">
                <CiRead className="text-accent" />
                <span className="text-sm">
                  Comments ({blogData.comments ? blogData.comments.length : 0})
                </span>
              </div>
            </div>

            <div className="flex flex-row justify-between gap-6 items-center">
              {/* copy url button */}
              <div
                title="Copy URL"
                onClick={() => handleCopyUrl(blogUrl)}
                className="flex flex-col items-center gap-1 cursor-pointer relative"
              >
                <BsCopy className="text-accent" />
                <span className="absolute left-1/2 bottom-[-30px] -translate-x-1/2 text-[15px]">
                  {copied ? "Copied" : ""}
                </span>
              </div>

              {/* social media button */}
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  blogUrl
                )}`}
                rel="noopener noreferrer"
              >
                <RiFacebookFill className="text-accent" />
              </a>
              <a
                target="_blank"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  "Check out this blog post:" + blogUrl
                )}`}
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-accent" />
              </a>
              <a
                target="_blank"
                href={`https://wa.me/?text=Check out this blog post: ${encodeURIComponent(
                  blogUrl
                )}`}
                rel="noopener noreferrer"
              >
                <RiWhatsappFill className="text-accent" />
              </a>
              <a
                target="_blank"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  blogUrl
                )}`}
                rel="noopener noreferrer"
              >
                <BiLogoLinkedin className="text-accent" />
              </a>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mt-6">{blogData.blog.title}</h1>
            <p className="text-gray-500 text-sm">{blogData.blog.date}</p>
            <p className="text-gray-700 mt-4">{blogData.blog.description}</p>
          </div>
        </div>
        {/* Comments Section */}
        <div className="mt-8 p-5 bg-gray-100  shadow-md">
          <div className="relative w-full h-auto" ref={removreply}>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {renderComments(blogData.comments)}
          </div>

          {/* Comment Form */}
          <div
            className="w-full bg-accent h-1 mt-3 mb-3"
            ref={replyFormRef}
          ></div>
          {newComment.parentName && (
            <h2 className="mb-2">
              Leave a reply to{" "}
              <span className="font-semibold text-accent">
                {newComment.parentName}
              </span>{" "}
              <button
                onClick={handleRemoveReply}
                className="ml-2 px-2 py-1 bg-gray-200  text-xs hover:bg-gray-300 transition"
              >
                Remove Reply
              </button>
            </h2>
          )}
          {!newComment.parentName && <h2 className="mb-2">Leave a comment</h2>}
          <p className="text-sm text-gray-500 mb-4">
            Your email address will not be published. Required fields are marked
            *
          </p>
          <form
            onSubmit={handleCommentSubmit}
            className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
          >
            <input
              type="text"
              placeholder="Enter Name"
              value={newComment.name}
              onChange={(e) =>
                setNewComment({
                  ...newComment,
                  name: e.target.value,
                })
              }
              className="p-2 border  focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={newComment.email}
              onChange={(e) =>
                setNewComment({
                  ...newComment,
                  email: e.target.value,
                })
              }
              className="p-2 border  focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <input
              type="text"
              placeholder="Enter Title"
              value={newComment.title}
              onChange={(e) =>
                setNewComment({
                  ...newComment,
                  title: e.target.value,
                })
              }
              className="p-2 border  md:col-span-2 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <textarea
              rows={4}
              placeholder="Enter Your Comment"
              id="textcomment"
              value={newComment.contentpera}
              onChange={(e) =>
                setNewComment({
                  ...newComment,
                  contentpera: e.target.value,
                })
              }
              className="p-2 border  md:col-span-2 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accentdark text-white px-4 py-2  md:col-span-2 hover:bg-accent-dark transition"
            >
              Post
            </button>
          </form>
          {messageOk && (
            <div className="mt-4 text-center text-green-600 font-medium">
              {messageOk}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
