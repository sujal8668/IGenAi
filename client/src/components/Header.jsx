import React, { useContext } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

// Staggered animation config
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Tag */}
      <motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
        variants={itemVariants}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="star" />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
        variants={itemVariants}
      >
        Turn text to <span className="text-blue-600">image</span>, in seconds.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-center max-w-xl mx-auto mt-5"
        variants={itemVariants}
      >
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic.
      </motion.p>

      {/* Generate Button */}
      <motion.button
        onClick={onClickHandler}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="sm:text-lg cursor-pointer text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full"
      >
        Generate Images
        <img className="h-6" src={assets.star_group} alt="stars" />
      </motion.button>

      {/* Image Grid */}
      <motion.div
        className="flex flex-wrap justify-center mt-16 gap-3"
        variants={itemVariants}
      >
        {Array(6)
          .fill("")
          .map((_, index) => (
            <img
              key={index}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt={`sample-${index}`}
              width={70}
            />
          ))}
      </motion.div>

      {/* Footer */}
      <motion.p className="mt-2 text-neutral-600" variants={itemVariants}>
        Generated images from IGen AI
      </motion.p>
    </motion.div>
  );
};

export default Header;
