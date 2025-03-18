"use client";
import { AboutSection } from "@/components/about/about";
import { AchievementsSection } from "@/components/about/about-achievement";
import { TeamSection } from "@/components/about/about-team";
// import CounterDetailPage from "@/components/home/counter-details";
import HomeCarousel from "@/components/home/home-carousel";
import { HomepageStructuredData } from "@/components/global/seo";
import { useGetProfile } from "@/hooks/users/use-get-profile-hooks";
import { setUserDetail } from "@/store/slices/user-detail-slice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { FeaturesSection } from "@/components/home/features";
import { OfferBanner } from "@/components/home/offer-banner";

export default function Home() {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.user);

  const { data, isSuccess } = useGetProfile(id);
  if (isSuccess) {
    dispatch(setUserDetail && setUserDetail(data));
  }

  return (
    <main className="flex flex-col">
      <HomepageStructuredData />

      <HomeCarousel />
      <OfferBanner />
      <FeaturesSection />
      <AboutSection hide />
      <AchievementsSection />
      <TeamSection />
    </main>
  );
  //
}
