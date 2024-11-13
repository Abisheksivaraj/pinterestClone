import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios

const Like = () => {
  const [likedPins, setLikedPins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = "67349eacfa9f020c27994b31"; // Replace with the actual userId
    fetchLikedPins(userId);
  }, []);

  async function fetchLikedPins(userId) {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/pin/getLikedPins/${userId}`);
      setLikedPins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching liked pins:", error);
      setLoading(false);
    }
  }

  return (
    <div className="liked-pins-container">
      <h2 className="text-center text-3xl font-serif font-semiBold mt-4">Liked Pins</h2>
      {loading ? (
        <p>Loading...</p>
      ) : likedPins && likedPins.length > 0 ? (
        <div className="flex items-center gap-5 p-5">
          {likedPins.map((pin) => {
            console.log("Image URL:", pin.image);
            console.log("Title:", pin.title);
            console.log("Pin:", pin);

            return (
              <div key={pin._id} className="pin-card">
                <img src={pin.image} alt={pin.title} className="pin-image" />
                <p>{pin.title}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No liked pins found.</p>
      )}
    </div>
  );
};

export default Like;
