"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";

import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from "..";
import {
  EditorTabs,
  decalTypes,
  editorTabs,
  filterTabs,
} from "../../config/constants";
import { reader } from "../../config/helpers";
import { fadeAnimation, slideAnimation } from "../../config/motion";
import useStore from "../../store/useStore";

type tabName = "logoShirt" | "stylishShirt";

interface ActiveTabs  {
  [key: string]: boolean
}[]

const Customiser: FC = () => {
  const { snap, state } = useStore();

  const [file, setFile] = useState<Blob | null>(null);
  const [prompt, setPrompt] = useState<string>("");

  const [generateImage, setGenerateImage] = useState<boolean>(false);

  const [activeEditorTab, setActiveEditorTab] = useState<EditorTabs>("none");
  const [activeFilterTab, setActiveFilterTab] = useState<ActiveTabs>({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateContentTab = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;

      case "filepicker":
        return <FilePicker setFile={setFile} file={file} readFile={readFile}  />;

      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImage={generateImage}
            handleSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (type: "logo" | "full") => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGenerateImage(true);

      const response = await fetch("/api/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGenerateImage(false);
      setActiveEditorTab("none");
    }
  };

  const handleActiveFilterTab = (tabName: tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const handleDecals = (type: "logo" | "full", result: any) => {
    const decalType = decalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const readFile = (type: "logo" | "full") => {
    if (!file) return;

    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("none");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute left-0 top-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex min-h-screen items-center">
              <div className="glassmorphism ml-1 flex w-16 flex-col items-center justify-center gap-4 rounded-lg border-2 py-4">
                {editorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateContentTab()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute right-5 top-5 z-10"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="absolute bottom-5 left-0 right-0 z-10 flex w-full flex-wrap items-center justify-center gap-4"
            {...slideAnimation("up")}
          >
            {filterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customiser;
