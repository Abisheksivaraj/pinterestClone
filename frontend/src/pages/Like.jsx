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
    <div>
      <h2>Liked Pins</h2>
      {loading ? (
        <p>Loading...</p>
      ) : likedPins && likedPins.length > 0 ? (
        likedPins.map((pin) => {
          console.log("Image URL:", pin.image);
          console.log("Title:", pin.title);
          console.log("Pin:", pin);

          return (
            <div key={pin._id} className="pin-card">
              <img src={pin.image} alt={pin.title} className="pin-image" />
              <p>{pin.title}</p>
            </div>
          );
        })
      ) : (
        <p>No liked pins found.</p>
      )}
    </div>
  );
};

export default Like;
