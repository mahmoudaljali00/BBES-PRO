import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState } from "react";

export default function projectslug() {
  const router = useRouter();

  const { slug } = router.query;

  const { alldata, loading } = useFetchData(`/api/projects?slug=${slug}`);

  if (loading) {
    return (
      <div className="flex flex-center wh_100">
        <Spinner />
      </div>
    );
  }

  const createdAtDate =
    alldata && alldata[0]?.createdAt
      ? new Date(alldata && alldata[0]?.createdAt)
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

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>

      <div className="bg-white min-h-screen">
        <div className="w-full bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8">
              <img
                src={alldata && alldata[0]?.images[0]}
                alt={alldata && alldata[0]?.title}
                className="shadow-lg w-[100%] h-auto object-cover"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">
                  {alldata && alldata[0]?.title}
                </h1>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolore cupiditate sint magni rem, id quae sunt enim non
                  adipisci quas facere excepturi amet debitis repellat?
                </p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={alldata && alldata[0]?.livepreview}
                  className="inline-block bg-accent text-white px-6 py-2 hover:bg-accent-dark transition"
                >
                  Live Preview
                </a>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-gray-500">Category</h3>
                  <h2 className="text-lg font-semibold">
                    {alldata && alldata[0]?.projectcategory}
                  </h2>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Client</h3>
                  <h2 className="text-lg font-semibold">
                    {alldata && alldata[0]?.client}
                  </h2>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Start Date</h3>
                  <h2 className="text-lg font-semibold">
                    {formatDate(createdAtDate)}
                  </h2>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Designer</h3>
                  <h2 className="text-lg font-semibold">Seaside Group</h2>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                freeMode={true}
                grabCursor={true}
                modules={[FreeMode]}
                className="mySwiper"
              >
                {alldata &&
                  alldata[0]?.images.map((image, index) => (
                    <SwiperSlide
                      key={index}
                      className="flex flex-col max-w-[250px] "
                    >
                      <img
                        src={image}
                        alt="project"
                        className="shadow-md object-cover w-[250px] h-48"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-accent">
                Project Description
              </h2>
              <div className="prose prose-blue max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code: Code,
                  }}
                >
                  {alldata[0]?.description}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
