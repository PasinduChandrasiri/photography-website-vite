import React from 'react'
import {GALLERY} from "../constants"
import Card from "./Card"
import {motion} from "framer-motion";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0, y: -20},
  visible: {
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.4,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 0.8},
  visible: {
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
}

const Gallery = () => {
  return (
    <div id='gallery'>
        <motion.h2 className=' mt-20 text-center text-4xl font-semibold'
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true}}>Gallery</motion.h2>
        <motion.div className=' flex flex-wrap justify-center py-8'
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true}}>
            {GALLERY.map((gallery, index) =>(
                <motion.div key={index}
                variants={itemVariants}>
                  <Link to={`/gallery/${gallery.slug}`}>
                    <Card
                      image={gallery.image}
                      title={gallery.title}
                      subtitle={gallery.subtitle}
                    />
                  </Link>    
                </motion.div>
            ))}
        </motion.div>
    </div>
  )
}

export default Gallery