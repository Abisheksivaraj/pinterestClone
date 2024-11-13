import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { PinData } from "../context/PinContext";

const PinCard = ({ pin }) => {
  const userId = localStorage.getItem("userId");
  const [liked, setLiked] = useState(pin.likes.includes(userId));
  const { likeUnlike } = PinData();

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

  return (
    <div className="p-4 sm:1/2 md:1/3 lg:1/4">
      <div className="bg-white overflow-hidden shadow rounded-lg relative group cursor-pointer">
        <img src={pin.image.url} alt="" className="w-[15rem] h-[15rem]" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <FaHeart
            onClick={handleHeartClick}
            className={`absolute top-1 left-1 text-4xl p-1 ${
              liked ? "text-red-600" : "text-white"
            }`}
          />
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
    </div>
  );
};

export default PinCard;
