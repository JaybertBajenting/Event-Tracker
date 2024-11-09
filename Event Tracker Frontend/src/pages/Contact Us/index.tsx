import Header from "@/includes/header";
import phone from "@/assets/phone.svg";
import email from "@/assets/email.svg";
import location from "@/assets/location.svg";
import { TextField } from "@mui/material";

const ContactUs = () => {
  return (
    <>
      <Header />
      <div className="mx-auto mb-[100px] flex max-w-[2000px] flex-col items-center gap-10 xs:px-[25px] small:px-[100px]">
        <h1 className="mt-10 text-[40px] font-semibold text-opacity-90">
          <span className="text-gold">Contact</span>{" "}
          <span className="text-maroon">Us</span>
        </h1>
        <div className="max-w-[1186px] text-center text-[22.51px] text-zinc-600">
          <p>
            Got a question, suggestion, or just want to say hello? Reach out to
            us through our Contact Us page. We're here to make your experience
            with Event Tracker even better. Let's stay connected and keep the
            conversation going!
          </p>
        </div>
        <div className="flex w-full justify-between xs:flex-col small:flex-row small:gap-96">
          <div className="flex flex-1 flex-col items-center gap-3">
            <img src={phone} />
            <p className="text-[25px] font-semibold text-opacity-80 ">
              Call Us On
            </p>
            <p className="text-[22.51px] text-zinc-600">+63912345678</p>
          </div>
          <div className="flex flex-1 flex-col items-center gap-3">
            <img src={email} />
            <p className="text-[25px] font-semibold text-opacity-80 ">
              Email Us At
            </p>
            <p className="text-[22.51px] text-zinc-600">
              event.tracker@gmail.com
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center gap-3">
            <img src={location} />
            <p className="text-[25px] font-semibold text-opacity-80 ">
              Visit Office
            </p>
            <p className="text-[22.51px] text-zinc-600">
              123, Amoa Street, Skina.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-10 mt-[100px]">
          <div className="flex justify-between">
            <input
              className="w-[45%] rounded-[5px] border border-zinc-600 border-opacity-70 p-4"
              placeholder="Your Name*"
            ></input>
            <input
              className="w-[45%] rounded-[5px] border border-zinc-600 border-opacity-70 p-4"
              placeholder="Your Email*"
            ></input>
          </div>
          <div>
            <input
              className="w-full rounded-[5px] border border-zinc-600 border-opacity-70 p-4"
              placeholder="Your Subject*"
            ></input>
          </div>
          <div>
            <textarea
              className="customized_scrollbar h-[100px] w-full rounded-[5px] border border-zinc-600 border-opacity-70 p-4"
              placeholder="Your Message*"
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div className="flex justify-end mt-[40px]">
            <button className="w-[194px] h-[52px] bg-opacity-90 rounded-[5px] box-border bg-maroon px-[37px] py-[11px] text-white">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
