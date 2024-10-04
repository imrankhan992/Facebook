import React, { useEffect, useState } from "react";
import { Photo } from "@/svg";

const PreviewImage = ({
  showImageUpload,
  setShowImageUpload,
  mediaFiles,
  setMediaFiles,
}) => {
  const imageInputRef = React.useRef();
  const handleMediaFiles = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        setMediaFiles((images) => [...images, readerEvent.target.result]);
      };
    });
  };

  const MediaGrid = ({ files, cols, height }) => (
    <div
      className={`grid grid-cols-${cols} gap-1 ${height} overflow-hidden rounded-lg`}
    >
      {files.map((file, index) => (
        <div key={index} className="w-full">
          <img src={file} alt={`uploaded ${index}`} className="w-full" />
        </div>
      ))}
    </div>
  );

  const renderMediaGrid = () => {
    const mediaCount = mediaFiles.length;

    switch (mediaCount) {
      case 1:
        return (
          <MediaGrid
            files={mediaFiles.slice(0, 1)}
            cols={1}
            height={"h-[200px]"}
          />
        );
      case 2:
        return <MediaGrid files={mediaFiles.slice(0, 2)} cols={2} />;
      case 3:
        return (
          <div className="flex flex-col rounded-lg items-center justify-center gap-1">
            <MediaGrid
              files={mediaFiles.slice(0, 1)}
              cols={1}
              height={"h-[200px]"}
            />
            <MediaGrid files={mediaFiles.slice(1, 3)} cols={2} />
          </div>
        );
      case 4:
        return <MediaGrid files={mediaFiles.slice(0, 4)} cols={2} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-1">
            <MediaGrid
              files={mediaFiles.slice(0, 2)}
              cols={2}
              height={"h-[200px]"}
            />
            <MediaGrid files={mediaFiles.slice(2, 5)} cols={3} />
            {mediaCount > 5 && (
              <div className="grid grid-cols-3 gap-2">
                <div className="relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold">
                    +{mediaCount - 5} more
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="p-2 border rounded-lg">
      <div className="w-full cursor-pointer rounded-xl flex-col flex items-center justify-between gap-2">
        <input
          type="file"
          multiple
          hidden
          ref={imageInputRef}
          accept="image/*"
          onChange={handleMediaFiles}
        />

        {mediaFiles.length > 0 ? (
          <div className="relative">
            <div
              onClick={() => {
                setShowImageUpload(false);
                setMediaFiles([]);
              }}
              className="absolute right-3 shadow-lg active:scale-95 transform transition select-none duration-150 hover:bg-gray-100 bg-white top-3 w-8 h-8 flex items-center justify-center rounded-full"
            >
              <i className="exit_icon"></i>
            </div>
            <div className="absolute select-none left-3 bg-white top-3 gap-2 px-3 py-1 font-semibold flex items-center justify-center rounded-lg transition transform duration-150 hover:bg-gray-100 active:scale-95 shadow-lg cursor-pointer">
              <i className="edit_icon"></i>
              {mediaFiles.length <= 1 ? "Edit" : "Edit All"}
            </div>
            <div
              onClick={() => imageInputRef.current.click()}
              className="shadow-lg absolute active:scale-95 transform transition select-none duration-150 hover:bg-gray-100 left-32 bg-white top-3 gap-2 px-3 py-1 font-semibold flex items-center justify-center rounded-lg"
            >
              <i className="addPhoto_icon"></i>
              Add Photos/Videos
            </div>
            {renderMediaGrid()}
          </div>
        ) : (
          <div className="w-full rounded-lg relative p-8 h-full hover:bg-secondaryColorBg bg-secondaryColor2 flex items-center justify-center">
            <div
              onClick={() => setShowImageUpload(false)}
              className="absolute top-2 right-2 rounded-full bg-white flex items-center justify-center p-1.5 border-shadow cursor-pointer"
            >
              <i className="exit_icon"></i>
            </div>
            <div
              onClick={() => imageInputRef.current.click()}
              className="flex items-center justify-center flex-col"
            >
              <div className="add_circle bg-iconsBg w-10 h-10 flex items-center justify-center rounded-full">
                <i className="addPhoto_icon"></i>
              </div>
              <span className="font-bold">Add Photos/Videos</span>
              <span className="text-sm">or drag and drop</span>
            </div>
          </div>
        )}

        <div className="flex justify-between p-4 bg-secondaryColor2 w-full rounded-lg items-center">
          <div className="bg-iconsBg rounded-full flex items-center justify-center w-10 h-10">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add media from your mobile device.</div>
          <span className="bg-iconsBg px-3 py-2 text-sm font-bold rounded-lg">
            Add
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreviewImage;
