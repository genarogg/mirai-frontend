"use client";

import React, { useState, useEffect } from "react";

interface InputImageUploaderProps {
  htmlFor?: string;
  styles?: React.CSSProperties;
  imgUrl?: string;
  setState: any;
}

const InputImageUploader: React.FC<InputImageUploaderProps> = ({
  htmlFor,
  styles,
  imgUrl = "/",
  setState
}) => {
  const [imageSrc, setImageSrc] = useState<string>(imgUrl);
  const [rawFile, setRawFile] = useState<File | null>(null);

  useEffect(() => {
    setImageSrc(imgUrl);
  }, [imgUrl]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    let file: File | null = null;

    if (event.type === "change") {
      file = (event as React.ChangeEvent<HTMLInputElement>).target.files?.[0] || null;
    } else if (event.type === "drop") {
      file = (event as React.DragEvent<HTMLDivElement>).dataTransfer.files[0];
    }

    if (file) {
     

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        
        setImageSrc(result); 

        setState({file: file, base64: result});
   
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="uploader-img-container"
      style={styles}
      onDrop={handleImageChange}
      onDragOver={handleDragOver}
    >
      <label htmlFor={htmlFor}>
        <input
          type="file"
          id={htmlFor}
          name={htmlFor}
          accept="image/jpeg, image/png, image/webp, image/gif, image/bmp, image/svg+xml, image/tiff, image/x-icon"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <img src={imageSrc} alt="Uploaded" />
      </label>
    </div>
  );
};

export default InputImageUploader;
