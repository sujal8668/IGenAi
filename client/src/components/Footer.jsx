import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex justify-between items-center gap-4 py-3  mt-20">
      <div className="flex items-center gap-2">
        <img src={assets.logo_icon} className="w-10" alt="" />
        <h1 className="text-2xl font-semibold">IGen AI</h1>
      </div>
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">Copyright @IGen AI | All right reserved.</p>
      <div className="flex gap-2.5 ">
        <img className="cursor-pointer hover:scale-105" src={assets.facebook_icon} alt="" width={35} />
        <img className="cursor-pointer hover:scale-105" src={assets.instagram_icon} alt="" width={35} />
        <img className="cursor-pointer hover:scale-105" src={assets.twitter_icon} alt="" width={35} />
      </div>
    </div>
  );
};

export default Footer;
