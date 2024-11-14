import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PinContext = createContext();

export const PinProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPins() {
    try {
      const { data } = await axios.get("/api/pin/all");
      setPins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [pin, setPin] = useState([]);

  async function fetchPin(id) {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/pin/" + id);
      setPin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [isPin, setIsPin] = useState([]);

  async function fetchLikedPins(userId) {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/pin/getLikedPins" + userId);
      setIsPin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function updatePin(id, title, pin, setEdit) {
    try {
      const { data } = await axios.put("/api/pin/" + id, { title, pin });
      toast.success(data.message);
      fetchPin(id);
      setEdit(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function addComment(id, comment, setComment) {
    try {
      const { data } = await axios.post("/api/pin/comment/" + id, { comment });
      toast.success(data.message);
      fetchPin(id);
      setComment("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function addTags(id, tags, setTags) {
    try {
      const { data } = await axios.post(`/api/pin/tags/${id}`, { tags });
      toast.success(data.message);
      
      setTags("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function likeUnlike(id, like, setLike) {
    try {
      const { data } = await axios.post("/api/pin/likeAndUnlike/" + id, {
        like,
      });
      toast.success(data.message);
      fetchPin(id);
      setLike(like === "like" ? "unlike" : "like");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function deleteComment(id, commentId) {
    try {
      const { data } = await axios.delete(
        `/api/pin/comment/${id}?commentId=${commentId}`
      );
      toast.success(data.message);
      fetchPin(id);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function deletePin(id, navigate) {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/api/pin/${id}`);
      toast.success(data.message);
      navigate("/");
      setLoading(false);
      fetchPins();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  async function addPin(
    formData,
    setFilePrev,
    setFile,
    setTitle,
    setPin,
    navigate
  ) {
    try {
      const { data } = await axios.post("/api/pin/new", formData);
      toast.success(data.message);
      setFile([]);
      setFilePrev("");
      setPin("");
      setTitle("");
      fetchPins();
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchPins();
  }, []);
  return (
    <PinContext.Provider
      value={{
        isPin,
        pins,
        loading,
        fetchPin,
        pin,
        updatePin,
        addComment,
        likeUnlike,
        deleteComment,
        deletePin,
        addPin,
        fetchPins,
        fetchLikedPins,
        addTags,
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);
