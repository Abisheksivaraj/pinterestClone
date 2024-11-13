import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import Navbar from "./Navbar";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pin", pin);
    formData.append("image", image); // Now you're sending the Base64 image

    try {
      const response = await axios.post(
        "http://localhost:5000/api/pin/newImage",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error creating pin:", error);
      alert("Error creating pin. Please try again.");
    }
  };


  return (
    <div>
      <Navbar />
      <div className="flex fixed w-full items-center justify-center min-h-screen bg-white">
        <div className="max-w-2xl p-4 bg-gray-100 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Create Pin</h2>

          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="w-1/3 flex flex-col items-center">
              <label className="block text-gray-700 mb-2">Upload Image:</label>
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full cursor-pointer"
              >
                <MdAddAPhoto size={32} className="text-gray-500" />
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Upload less than 10MB with a high-quality image
              </p>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Uploaded Preview"
                  className="w-full h-auto mt-4 border border-gray-300 rounded-md"
                />
              )}
            </div>

            <div className="w-2/3">
              {/* Title */}
              <div className="mb-4">
                <label className="block text-gray-700">Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Pin:</label>
                <input
                  type="text"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter pin"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Create Pin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
