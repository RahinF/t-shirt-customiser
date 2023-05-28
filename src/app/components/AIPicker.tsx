import { Dispatch, FC, SetStateAction } from "react";
import CustomButton from "./CustomButton";

interface Props {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
  generatingImage: boolean;
  handleSubmit: (type: "logo" | "full") => Promise<void>;
}

const AIPicker: FC<Props> = ({
  prompt,
  setPrompt,
  generatingImage,
  handleSubmit,
}) => {
  return (
    <div className="glassmorphism absolute left-full ml-3 flex h-56 w-52 flex-col gap-4 rounded-md p-3">
      <textarea
        className="w-full flex-1 rounded-md border border-gray-300 bg-transparent p-2 text-sm outline-none"
        placeholder="Enter a prompt"
        rows={4}
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        style={{ resize: "none" }}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImage ? (
          <CustomButton
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit("logo")}
              customStyles="text-xs"
            />

            <CustomButton
              type="filled"
              title="AI Texture"
              handleClick={() => handleSubmit("full")}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
