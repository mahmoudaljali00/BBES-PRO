import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

export default function gallery() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const { alldata, loading } = useFetchData("/admin/api/photos");
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <>
      <Head>
        <title>Seaside: Gallery Photos</title>
      </Head>

      <div className="bg-white min-h-screen">
        <div className="flex w-full h-full border-[7px] border-accent  mx-auto items-center justify-center">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[Autoplay, EffectCoverflow, Pagination]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper relative "
          >
            {alldata.map((photo, idx) => (
              <>
                <SwiperSlide
                  key={idx}
                  className="max-w-[400px] h-full items-center justify-center my-5"
                >
                  <img
                    src={photo.images}
                    alt=""
                    className="w-[400px] h-[300px] object-cover shadow-custom shadow-accent/35"
                  />
                </SwiperSlide>
              </>
            ))}
            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20">
                  ----
                </circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </div>
        <div className="bg-gray-50 py-16" id="galleryimages">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-lg font-semibold text-accent mb-2">
                <span className="mr-2">01//</span> OUR PORTFOLIO
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold">
                Seaside captuer <span className="text-accent">All of your</span>{" "}
                <br /> beautiful memories
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {alldata.map((photo, idx) => (
                    <div
                      className="bg-white shadow hover:shadow-lg transition overflow-hidden"
                      key={idx}
                    >
                      <img
                        src={photo.images[0]}
                        alt=""
                        className="w-full h-56 object-cover"
                        onClick={() => setSelectedImage(photo.images[0])}
                      />
                      {/* Full-Screen Modal */}
                      {selectedImage && (
                        <div className="fixed z-50 inset-0 bg-black bg-opacity-75 flex justify-center items-center">
                          {/* Close Button Positioned Relative to Viewport */}
                          <button
                            className="fixed top-6 right-6 bg-white text-black px-4 py-2 shadow-lg hover:bg-gray-200 transition"
                            onClick={() => setSelectedImage(null)}
                          >
                            ❌ Close
                          </button>

                          <img
                            src={selectedImage}
                            alt="Full View"
                            className="max-w-full max-h-full"
                          />
                        </div>
                      )}

                      <div className="p-4">
                        <h2 className="text-xl font-semibold mb-1">
                          {photo.title}
                        </h2>
                        <p className="text-gray-500 text-sm">By Seaside</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
