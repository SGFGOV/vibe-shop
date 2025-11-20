"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";
import Container from "./Container";
import { toast } from "react-toastify";

interface FileWithPreview extends File {
  preview: string;
}

interface UploaderProps {
  setImageUrl: (url: string | string[]) => void;
  imageUrl: string | string[];
  product?: boolean;
  folder?: string;
}

const Uploader = ({
  setImageUrl,
  imageUrl,
  product = false,
  folder = "",
}: UploaderProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setError] = useState<string>("");
  const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: product,
    maxSize: 500000,
    maxFiles: 3,
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ) as FileWithPreview[]
      );
    },
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach((e) => {
          if (e.code === "too-many-files") {
            toast.error(`Maximum 3 Image Can be Upload!`);
          } else {
            toast.error(e.message);
          }
        });
      });
    }

    if (files.length > 0) {
      files.forEach((file) => {
        if (
          product &&
          Array.isArray(imageUrl) &&
          imageUrl.length + files.length > 3
        ) {
          toast.error(`Maximum 3 Image Can be Upload!`);
          return;
        }

        setLoading(true);
        setError("Uploading....");

        if (product) {
          const result = Array.isArray(imageUrl)
            ? imageUrl.find(
                (img) => img === process.env.NEXT_PUBLIC_CLOUDINARY_URL
              )
            : false;

          if (result) {
            setLoading(false);
            return;
          }
        }

        const name = file.name.replaceAll(/\s/g, "");
        const public_id = name?.substring(0, name.lastIndexOf("."));

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
        );
        formData.append(
          "cloud_name",
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
        );
        formData.append("folder", folder);
        formData.append("public_id", public_id);

        axios({
          url: cloudinaryUploadUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: formData,
        })
          .then((res) => {
            toast.success("Image Uploaded successfully!");
            setLoading(false);
            if (product) {
              setImageUrl([
                ...(Array.isArray(imageUrl) ? imageUrl : []),
                res.data.secure_url,
              ]);
            } else {
              setImageUrl(res.data.secure_url);
            }
          })
          .catch((err) => {
            console.error("err", err);
            toast.error(err.message || "Upload failed");
            setLoading(false);
          });
      });
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: files dependency is handled manually
  }, [files]);

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          className="d-inline-flex border border-2 border-light w-25"
          src={file.preview}
          alt={file.name}
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleRemoveImage = async (img: string) => {
    try {
      setLoading(false);
      toast.error("Image delete successfully!");
      if (product) {
        const result = Array.isArray(imageUrl)
          ? imageUrl.filter((i) => i !== img)
          : [];
        setImageUrl(result);
      } else {
        setImageUrl("");
      }
    } catch (err) {
      console.error("err", err);
      toast.error((err as Error).message || "Delete failed");
      setLoading(false);
    }
  };

  return (
    <div className="w-100 text-center">
      <div
        className="border border-2 border-secondary border-dashed rounded cursor-pointer px-3 pt-3 pb-3"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="d-flex justify-content-center mx-auto">
          <FiUploadCloud className="fs-1 text-success" />
        </span>
        <p className="small mt-2">DragYourImage</p>
        <em className="text-muted small">imageFormat</em>
      </div>

      <div className="text-success">{loading && err}</div>
      <aside className="d-flex flex-wrap mt-3">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container
              setImageUrl={setImageUrl}
              imageUrl={Array.isArray(imageUrl) ? imageUrl : []}
              handleRemoveImage={handleRemoveImage}
            />
          </DndProvider>
        ) : !product && imageUrl && !Array.isArray(imageUrl) ? (
          <div className="position-relative">
            <img
              className="d-inline-flex border rounded border-light w-25 p-2"
              src={imageUrl}
              alt="product"
            />
            <button
              type="button"
              className="position-absolute top-0 end-0 text-danger border-0 bg-transparent"
              onClick={() => handleRemoveImage(imageUrl)}
            >
              <FiXCircle />
            </button>
          </div>
        ) : (
          thumbs
        )}
      </aside>
    </div>
  );
};

export default Uploader;

