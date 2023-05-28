import { Image } from "@phosphor-icons/react";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import CustomButton from "./CustomButton";

interface Props {
  file: Blob | null;
  setFile: Dispatch<SetStateAction<Blob | null>>;
  readFile: (type: "logo" | "full") => void;
}

const FilePicker: FC<Props> = ({ setFile, readFile, file }) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    const file = files[0];

    setFile(file);
  };
  return (
    <div className="glassmorphism absolute left-full ml-3 flex h-60 w-52 flex-col rounded-md p-3">
      <label
        className="mb-2 flex h-full w-full cursor-pointer flex-col gap-3 rounded-md border border-gray-300 p-2"
        htmlFor="file"
      >
        {file ? (
          <div className="flex h-full flex-col justify-between">
            <p className="text-sm">{file.name} selected.</p>

            <p className="text-sm">
              Apply image to shirt: Choose an option below.
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <Image size={32} />
            <p className="text-sm">Select file</p>
          </div>
        )}
      </label>
      <input
        id="file"
        type="file"
        accept="image/*"
        onChange={handleOnChange}
        className="hidden"
      />

      <div className="flex w-full gap-2">
        <CustomButton
          title="Logo"
          type="outline"
          handleClick={() => readFile("logo")}
          customStyles="text-xs"
        />
        <CustomButton
          title="Texture"
          type="filled"
          handleClick={() => readFile("full")}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
