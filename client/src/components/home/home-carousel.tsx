"use client";
// import { useGetProfile } from "@/hooks/users/use-get-profile-hooks";
import Carousel from "../carousel";
import Image from "next/image";
// import { useDispatch } from "react-redux";
// import Cookies from "js-cookie";
// import { setUserDetail } from "@/store/slices/userSlice";

const imgPreview = [
  "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1584043204475-8cc101d6c77a?q=80&w=1200&auto=format",
];

const HomeCarousel = () => {
  // const { data, isSuccess } = useGetProfile();
  // console.log(data, "Sdfsdf");
  // const dispatch = useDispatch();
  // if (isSuccess) {
  // dispatch(setUserDetail(data?.userDetail));
  // }

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:w-screen lg:h-[calc(100vh-64px)] relative">
      <Carousel
        items={imgPreview.map((url, index) => (
          <div key={index} className="w-full h-full relative">
            <Image
              src={url}
              alt={`Carousel Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="w-full h-full"
            />
          </div>
        ))}
        autoPlay={true}
        interval={3000}
      />
    </div>
  );
};

export default HomeCarousel;
