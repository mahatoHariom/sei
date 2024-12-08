"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <motion.div
        className="relative h-[400px] w-[500px] p-8 rounded-lg"
        animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
        transition={{
          y: { duration: 2, repeat: Infinity },
          scale: { duration: 2, repeat: Infinity },
        }}
      >
        <Image fill src={"/error.svg"} alt="error" className="object-cover " />
      </motion.div>
    </div>
  );
};

export default NotFound;
