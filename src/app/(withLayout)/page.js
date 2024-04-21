import Toggle from "@/Component/Bot/toggle/Toggle";
import Facilities from "@/Component/HomeComponents/Facilities/Facilities";
import Features from "@/Component/HomeComponents/Features/Features";
import Hero from "@/Component/HomeComponents/Hero/Hero";
import Statistics from "@/Component/HomeComponents/Statistics/Statistics";
import Feedback from "@/Component/feebbacks/feedback/Feedback";


export default function Home() {
  return (
    <div className="">
      <div className="fixed bottom-0 right-0 pr-3 pb-3 md:pr-6 md:pb-6 z-10 max-w-7xl">
        <Toggle />
      </div>
      <div>
        <Hero />
        <Statistics />
        <Features />
        <Facilities />
        <Feedback></Feedback>
      </div>
    </div>
  );
}
