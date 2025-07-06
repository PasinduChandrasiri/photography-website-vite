import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { StepBack, X } from "lucide-react";
import { motion } from "framer-motion";
import { GALLERY } from "../constants";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"; // <-- Add this

const CategoryGallery = () => {
  const { slug } = useParams();
  const [images, setImages] = useState([]);
  const [modalImg, setModalImg] = useState(null);

  // Get title/subtitle from GALLERY constant
  const category = GALLERY.find((item) => item.slug === slug) || {
    title: "",
    subtitle: ""
  };

  useEffect(() => {
    const q = query(
      collection(db, "galleryImages"),
      where("category", "==", slug)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const imgs = [];
      snapshot.forEach(doc => imgs.push({ id: doc.id, ...doc.data() }));
      setImages(imgs);
    });
    return () => unsub();
  }, [slug]);

  // Modal close on esc
  useEffect(() => {
    if (!modalImg) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setModalImg(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalImg]);

  const titleVariant = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const subtitleVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="w-full flex justify-start mb-8">
        <Link
          to="/#gallery"
          className="flex items-center justify-center
            rounded-lg bg-black/30 py-3 px-5
            backdrop-blur-lg border border-white/20 shadow-lg
            gap-2 text-white font-medium transition
            hover:bg-black/50 hover:shadow-xl"
        >
          <StepBack size={20} />
          <span className="font-medium">Back to Gallery</span>
        </Link>
      </div>
      <motion.h2
        className="text-4xl font-semibold mb-6 text-center"
        variants={titleVariant}
        initial="hidden"
        animate="visible"
      >
        {category.title}
      </motion.h2>
      <motion.p
        className="text-center mb-8"
        variants={subtitleVariant}
        initial="hidden"
        animate="visible"
      >
        {category.subtitle}
      </motion.p>
      {/* Masonry Grid for Images */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="16px">
          {images.length > 0 ? (
            images.map((img) => (
              <img
                key={img.id}
                src={img.imageUrl}
                alt={category.title}
                className="w-full mb-4 rounded shadow cursor-pointer transition-transform hover:scale-95"
                onClick={() => setModalImg(img.imageUrl)}
                style={{ display: "block", width: "100%" }}
              />
            ))
          ) : (
            <p className="text-center">Loading gallery.........</p>
          )}
        </Masonry>
      </ResponsiveMasonry>
      {modalImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg"
          onClick={() => setModalImg(null)}
        >
          <div
            className="relative max-w-3xl w-full flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModalImg(null)}
              className="absolute top-2 right-2 bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
              aria-label="Close image"
            >
              <X size={28} className="text-white" />
            </button>
            <img
              src={modalImg}
              alt="Full size"
              className="max-h-[80vh] w-auto rounded-lg shadow-2xl border-4 border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryGallery;
