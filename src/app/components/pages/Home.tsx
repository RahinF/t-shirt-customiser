"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import { useSnapshot } from "valtio";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../../config/motion";
import state from "../../store";
import CustomButton from "../CustomButton";

const Home: FC = () => {
  const snap = useSnapshot(state);

  const turnIntroOff = () => (state.intro = false);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section
          className="absolute z-10 flex w-fit flex-col items-start justify-start p-6 max-xl:gap-7 sm:p-8 xl:h-full xl:justify-between xl:px-36 xl:py-8"
          {...slideAnimation("left")}
        >
          <motion.header {...slideAnimation("down")}>
            <Image src="/threejs.png" alt="logo" width={24} height={24} />
          </motion.header>
          <motion.div
            className="flex flex-1 flex-col justify-start gap-10 xl:justify-center"
            {...headContainerAnimation}
          >
            <motion.div {...headTextAnimation}>
              <h1 className="text-7xl font-bold uppercase">
              Design<br className="hidden xl:block" /> Your Tee.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md text-base font-normal text-gray-600">
                Unleash your creativity with our AI-powered t-shirt
                customization website. Express yourself like never before!
              </p>

              <CustomButton
                type="filled"
                title="Customize"
                handleClick={turnIntroOff}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm uppercase"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
