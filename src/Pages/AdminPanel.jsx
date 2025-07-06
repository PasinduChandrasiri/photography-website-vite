import React, { useState, useEffect, useRef } from "react";
import { storage, db, auth } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Adminbg from "../assets/1.jpg";

const categories = [
  "landscape",
  "portrait",
  "macro",
  "travel",
  "night",
  "black-and-white",
  "wildlife",
  "street"
];

function getStoragePathFromUrl(url) {
  try {
    const matches = decodeURIComponent(url).match(/\/o\/(.*?)\?/);
    if (matches && matches[1]) {
      return matches[1];
    }
  } catch (e) { }
  return null;
}

const AdminPanel = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(categories[0]);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  // Auth check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/login");
    });
    return () => unsub();
  }, [navigate]);

  // Fetch images for the selected category
  useEffect(() => {
    setLoadingImages(true);
    const q = query(
      collection(db, "galleryImages"),
      where("category", "==", category)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const imgs = [];
      snapshot.forEach(doc => imgs.push({ id: doc.id, ...doc.data() }));
      setImages(imgs);
      setLoadingImages(false);
    });
    return () => unsub();
  }, [category]);

  // Hide success message after a short delay
  useEffect(() => {
    if (message && message.toLowerCase().includes("success")) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setMessage("");
    const storageRef = ref(storage, `gallery/${category}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => setMessage("Upload failed"),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "galleryImages"), {
          category,
          imageUrl: url
        });
        setMessage("Upload successful!");
        setFile(null);
        setProgress(0);
        // Clear file input visually
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    );
  };

  const handleDelete = async (img) => {
    const storagePath = getStoragePathFromUrl(img.imageUrl);
    if (!storagePath) {
      setMessage("Could not determine storage path for deletion.");
      return;
    }
    try {
      await deleteObject(ref(storage, storagePath));
      await deleteDoc(doc(db, "galleryImages", img.id));
      setMessage("Image deleted successfully!");
    } catch (error) {
      setMessage("Failed to delete image.");
    }
  };

  return (
    <div className="min-h-screen bg-black/70 py-20"
      style={{
        backgroundImage: `url(${Adminbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <AdminNavbar />
      <div className="max-w-xl mx-auto bg-black/30 backdrop-blur-lg rounded-lg p-8 shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Upload Image</h2>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="p-2 rounded bg-black/50 border border-white/80 text-white"
          >
            {categories.map(cat => (
              <option className="bg-black" key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
            className="text-white"
            required
            ref={fileInputRef}
          />
          <button
            type="submit"
            className="bg-white text-black rounded py-2 font-semibold hover:scale-105"
          >
            Upload
          </button>
          {progress > 0 && <progress value={progress} max="100" />}
          {message && <p className="text-green-400">{message}</p>}
        </form>
      </div>

      <div className="max-w-3xl mx-auto mt-12 bg-black/30 backdrop-blur-lg rounded-lg p-8 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-white capitalize">
          Images in "{category}" section
        </h3>
        {loadingImages ? (
          <p className="text-white">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-white">No images in this section.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map(img => (
              <div key={img.id} className="relative group">
                <img
                  src={img.imageUrl}
                  alt={category}
                  className="w-full h-48 object-cover rounded shadow"
                />
                <button
                  onClick={() => handleDelete(img)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-80 hover:opacity-100 transition"
                  title="Delete image"
                >
                  &#10006;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
