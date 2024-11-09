import Header from "@/includes/header";
import FirstDiv from "./FirstDiv";
import SecondDiv from "./SecondDiv";
import ThirdDiv from "./ThirdDiv";
import Footer from "@/includes/footer";

const Homepage = () => {
  return (
    <>
      <div className="gap-7 relative flex flex-col items-center">
        <Header />
        <FirstDiv/>
        <SecondDiv />
        <ThirdDiv />
        <Footer />
      </div>
    </>
  );
};

export default Homepage;
