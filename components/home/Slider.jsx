import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SliderBtns from "./SliderBtns";

const Slider = () => {
  return (
    <Swiper className="bg-white shadow-custom w-full max-w-[630px] h-[200px] ">
      {/* Slider 1 */}
      <SwiperSlide>
        <div className="px-12 md:pl-[60px] flex items-center gap-9 h-full ">
          {/* avatar img */}
          <div className="relative flex w-[90px] h-[90px] ">
            <img
              src={"/assets/img/testimonials/avatar.jpg"}
              className="w-[90px] h-[90px] object-cover"
              alt=""
            />
          </div>
          {/* text */}
          <div className="flex-1 xl:max-w-[340px] flex flex-col gap-2 ">
            <p>
              Exceeded expectation. On time, whitin budget and top quality work.
              High recommend!
            </p>
            <p className="font-primary font-semibold text-primary  ">
              Jane Doe
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slider 2 */}
      <SwiperSlide>
        <div className="px-12 md:pl-[60px] flex items-center gap-9 h-full ">
          {/* avatar img */}
          <div className="relative flex w-[90px] h-[90px] ">
            <img
              src={"/assets/img/testimonials/avatar.jpg"}
              className="w-[90px] h-[90px] object-cover"
              alt=""
            />
          </div>
          {/* text */}
          <div className="flex-1 xl:max-w-[340px] flex flex-col gap-2 ">
            <p>
              Exceeded expectation. On time, whitin budget and top quality work.
              High recommend!
            </p>
            <p className="font-primary font-semibold text-primary  ">
              Jane Doe
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slider 3 */}
      <SwiperSlide>
        <div className="px-12 md:pl-[60px] flex items-center gap-9 h-full ">
          {/* avatar img */}
          <div className="relative flex w-[90px] h-[90px] ">
            <img
              src={"/assets/img/testimonials/avatar.jpg"}
              className="w-[90px] h-[90px] object-cover"
              alt=""
            />
          </div>
          {/* text */}
          <div className="flex-1 xl:max-w-[340px] flex flex-col gap-2 ">
            <p>
              Exceeded expectation. On time, whitin budget and top quality work.
              High recommend!
            </p>
            <p className="font-primary font-semibold text-primary  ">
              Jane Doe
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slider btn */}
      <SliderBtns />
    </Swiper>
  );
};

export default Slider;
