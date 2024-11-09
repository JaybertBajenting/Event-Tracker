import { motion } from "framer-motion";
import Header from "@/includes/header";
import Mission from "@/assets/Mission.png";
import Offer1 from "@/assets/Offer1.png";
import Offer2 from "@/assets/Offer2.png";
import Offer3 from "@/assets/Offer3.png";
import Footer from "@/includes/footer";
import leemar from "@/assets/leemar.png";
import jaybert from "@/assets/jaybert.png";
import kurt from "@/assets/kurt.png";
import mark from "@/assets/mark.png";
import Facebook from "@/assets/facebook_logo.svg";
import Instagram from "@/assets/instagram_logo.svg";
import useMediaQuery from "@/hooks/useMediaQuery";
const AboutUs = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <div className="">
      <Header />
      <div className="mx-auto max-w-[2000px]">
        <div className="flex flex-col">
          <div className="flex flex-col items-center bg-zinc-100">
            <div className="font-bold medium:mt-48 medium:text-5xl ">
              <span className="text-gold">Learn More About</span>{" "}
              <span className="text-maroon">Event Tracker</span>
            </div>

            <div className="font-semibold medium:mt-32 medium:text-3xl">
              <p>About Us</p>
            </div>

            <div className="w-4/6 text-center font-['Inter'] font-semibold md:mt-12 medium:text-[25px]">
              <span>
                Welcome to{" "}
                <span className="text-gold xs:text-[17px] medium:text-[30px]">
                  Event
                </span>{" "}
                <span className="text-maroon xs:text-[17px] medium:text-[30px]">
                  Tracker
                </span>
                , your go-to portal for staying updated on all the exciting
                events happening at your University. We are passionate about
                connecting you with the pulse of campus life, ensuring you never
                miss a beat when it comes to the latest gatherings, workshops,
                seminars, and more.
              </span>
            </div>

            <div className="flex flex-row rounded-[15px] bg-white px-5 shadow md:mt-32 md:h-[450px] md:w-5/6">
              {isAboveMediumScreens && (
                <div className="self-center md:w-3/6">
                  <img src={Mission}></img>
                </div>
              )}
              <div className="flex flex-col md:w-3/6">
                <div>
                  <h1 className="text-4xl font-semibold md:ml-4 md:mt-20">
                    Our Mission
                  </h1>
                </div>
                <div className="font-['Inter'] text-[19px] font-semibold md:mt-16">
                  <span>
                    At <span className="text-[20px] text-gold">Event</span>{" "}
                    <span className="text-[20px] text-maroon">Tracker</span>,
                    our mission is simple but significant: to bring the
                    university community together through seamless event
                    discovery and participation. We believe that every event,
                    whether big or small, contributes to the rich tapestry of
                    experiences that make a university journey unforgettable.
                    Our goal is to make it easier for you to explore and engage
                    with these experiences.
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="font-bold md:mt-32 md:text-5xl ">
                <span className="text-gold">What</span>{" "}
                <span className="text-[#434343]">We</span>{" "}
                <span className="text-maroon">Offer</span>
              </div>
            </div>

            <div className=" flex flex-row rounded-[15px] bg-white px-5 shadow md:mt-32 md:h-[450px] md:w-5/6 md:px-10">
              <div className="relative flex flex-col md:w-3/6">
                <div>
                  <h1 className="text-4xl font-semibold md:mt-20">
                    Comprehensive Event Listings
                  </h1>
                </div>
                <div className="font-['Inter'] text-[19px] font-semibold md:mt-16 md:w-5/6">
                  <span>
                    Our website offers a comprehensive and up-to-date list of
                    events spanning a wide range of interests, from academic
                    lectures to sports, arts, culture, and student
                    organizations. No matter what your passion, you'll find
                    something that piques your interest.
                  </span>
                </div>
              </div>
              {isAboveMediumScreens && (
                <div className="flex justify-end self-center md:w-3/6 ">
                  <img src={Offer1}></img>
                </div>
              )}
            </div>

            <div className=" flex flex-row rounded-[15px] bg-white px-5 shadow md:mt-12 md:h-[450px] md:w-5/6 md:px-10">
              {isAboveMediumScreens && (
                <div className=" self-center md:w-3/6 ">
                  <img src={Offer2}></img>
                </div>
              )}
              <div className=" relative flex flex-col items-end text-end md:w-3/6">
                <div>
                  <h1 className="text-4xl font-semibold md:mt-20">
                    User Community
                  </h1>
                </div>
                <div className="w-5/6 font-['Inter'] text-[20px] font-semibold md:mt-16">
                  <span>
                    <span className="text-[25px] text-gold">Event</span>{" "}
                    <span className="text-[25px] text-maroon">Tracker</span> is
                    not just a website; it's a community of dedicated students
                    who share a passion for university life and its vibrant
                    events. Connect, discuss, and share your experiences with
                    fellow student event enthusiasts.
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-row rounded-[15px] bg-white px-5 shadow md:mt-12 md:h-[450px] md:w-5/6 md:px-10">
              <div className="relative flex flex-col md:w-3/6">
                <div>
                  <h1 className="text-4xl font-semibold md:mt-20">
                    Easy Event Registration
                  </h1>
                </div>
                <div className="font-['Inter'] text-[23px] font-semibold md:mt-16 md:w-5/6">
                  <span>
                    With <span className="text-[25px] text-gold">Event</span>{" "}
                    <span className="text-[25px] text-maroon">Tracker</span>,
                    registering for events is a breeze. Say goodbye to missed
                    opportunities – we make it convenient for you to secure your
                    spot and join in on the fun.
                  </span>
                </div>
              </div>
              {isAboveMediumScreens && (
                <div className="flex justify-end self-center md:w-3/6 ">
                  <img src={Offer3}></img>
                </div>
              )}
            </div>
            {isAboveMediumScreens && (
              <>
                <div>
                  <div className="font-bold md:mt-32 md:text-5xl ">
                    <span className="text-gold">Our</span>{" "}
                    <span className="text-maroon">Team</span>
                  </div>
                </div>

                <div className="mb-28 flex flex-col justify-center rounded-[15px] bg-white py-80 shadow md:mt-32 md:h-[450px] md:px-[100px] ">
                  <div className="flex gap-10">
                    <div className="relative flex flex-1 items-end md:h-[375px]">
                      <div className="absolute h-[314px] w-full rounded-t-2xl border-white bg-gradient-to-b from-maroon to-gold" />
                      <img
                        className="z-10 min-h-[380px] min-w-[318px]"
                        src={leemar}
                      />
                    </div>
                    <div className="relative flex flex-1 items-end md:h-[375px]">
                      <div className="absolute h-[314px] w-full rounded-t-2xl bg-gradient-to-b from-maroon to-gold"></div>
                      <img
                        className="z-10 min-h-[380px] min-w-[318px]"
                        src={jaybert}
                      />
                    </div>
                    <div className="relative flex flex-1 items-end md:h-[375px]">
                      <div className="absolute h-[314px] w-full rounded-t-2xl bg-gradient-to-b from-maroon to-gold"></div>
                      <img
                        className="z-10 min-h-[380px] min-w-[318px] "
                        src={kurt}
                      />
                    </div>
                    <div className="relative flex flex-1 items-end md:h-[375px] ">
                      <div className="absolute  h-[314px] w-full rounded-t-2xl bg-gradient-to-b from-maroon to-gold "></div>
                      <img
                        className="z-10 min-h-[380px] min-w-[318px]"
                        src={mark}
                      />
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div className="mt-5 flex flex-1 justify-center text-2xl font-bold">
                      Leemar A. Paner
                    </div>
                    <div className="mt-5 flex flex-1 justify-center text-2xl font-bold">
                      Jaybert C. Bajenting
                    </div>
                    <div className="mt-5 flex flex-1 justify-center text-2xl font-bold">
                      Kurt Xander M. Cabural
                    </div>
                    <div className="mt-5 flex flex-1 justify-center text-2xl font-bold">
                      Mark Joseph Piodos
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div className="mt-5 flex flex-1 justify-center  text-xl font-light text-neutral-700 text-opacity-80">
                      <span className="text-center">
                        “Keep learning and
                        <br />
                        Growing”
                      </span>
                    </div>
                    <div className="mt-5 flex flex-1 justify-center  text-xl font-light text-neutral-700 text-opacity-80">
                      <span className="text-center">
                        “It&rsquo;s Liver Lover Boy”
                      </span>
                    </div>
                    <div className="mt-5 flex flex-1 justify-center  text-xl font-light text-neutral-700 text-opacity-80">
                      <span className="text-center">
                        “Do your best and God will do <br /> the rest”
                      </span>
                    </div>
                    <div className="mt-5 flex flex-1 justify-center  text-xl font-light text-neutral-700 text-opacity-80">
                      <span className="text-center">
                        “Chill and have fun living”
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div className="flex flex-1 justify-center gap-10 md:mt-5">
                      <img src={Facebook} />
                      <img src={Instagram} />
                    </div>{" "}
                    <div className="flex flex-1 justify-center gap-10 md:mt-5">
                      <img src={Facebook} />
                      <img src={Instagram} />
                    </div>{" "}
                    <div className="flex flex-1 justify-center gap-10 md:mt-5">
                      <img src={Facebook} />
                      <img src={Instagram} />
                    </div>{" "}
                    <div className="flex flex-1 justify-center gap-10 md:mt-5">
                      <img src={Facebook} />
                      <img src={Instagram} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
