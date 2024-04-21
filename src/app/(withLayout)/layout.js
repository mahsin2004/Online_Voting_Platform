import Footer from "@/Component/Footer/Footer";
import Navbar from "@/Component/Navbar/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata = {
  title: "Digital Voting System",
  description: "An online voting system is a software platform that allows groups to securely conduct votes and elections.The system should verify the identity and eligibility of the voters and candidate, and prevent unauthorized or duplicate voting.",
};

const Layout = ({ children }) => {
  return (
    <div>
      <div className="bg-gray-900">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
