import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaUserTag } from "react-icons/fa";
import { PinData } from "../context/PinContext";
import axios from "axios";
import toast from "react-hot-toast";

const PinCard = ({ pin }) => {
  const userId = localStorage.getItem("userId");
  const [liked, setLiked] = useState(pin.likes.includes(userId));
  const { likeUnlike } = PinData();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tag, setTag] = useState("");

  const handleHeartClick = async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);

    try {
      await likeUnlike(pin._id, newLikedState ? "like" : "unlike", setLiked);
    } catch (error) {
      setLiked(liked);
      console.error("Error while liking/unliking:", error);
    }
  };

  const handleTagChange = (e) => setTag(e.target.value);

  const handleTagSubmit = async (e) => {
    e.preventDefault();

    if (tag) {
      try {
        const { data } = await axios.post(`/api/pin/tags/${pin._id}`, { tag });
        toast.success(data.message);
        setTag("");
        setIsPopupOpen(false);
      } catch (error) {
        console.error("Error while adding tag:", error);
      }
    }
  };

  return (
    <div className="p-4 sm:1/2 md:1/3 lg:1/4 bg-gray-100 rounded-lg shadow-lg">
      <div className="overflow-hidden rounded-lg relative group cursor-pointer bg-white">
        <img
          src={pin.image.url}
          alt={pin.title}
          className="w-[20rem] h-[25rem] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <div className="absolute flex items-center justify-between top-0 w-full">
            <div className="mr-2">
              <FaHeart
                onClick={handleHeartClick}
                className={`text-4xl p-1 ${
                  liked ? "text-red-600" : "text-white"
                }`}
              />
            </div>
            <div>
              <FaUserTag
                onClick={() => setIsPopupOpen(true)}
                className="text-white text-4xl p-1 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Link
              to={`/pin/${pin._id}`}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              View Pin
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-2 text-center">
        <h4 className="text-lg font-semibold bg-gray-300 text-black py-2 px-4 rounded-md">
          {pin.title}
        </h4>
      </div>
      {isPopupOpen && (
        <div className="fixed z-20 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Add a Tag</h3>
            <form onSubmit={handleTagSubmit}>
              <input
                type="text"
                value={tag}
                onChange={handleTagChange}
                placeholder="Enter tag"
                className="border p-2 w-full rounded mb-4"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PinCard;
