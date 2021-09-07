import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({selectedImg, setSelectedImg}) => {
    const clickHandler = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setSelectedImg(null);
        }
    }
    return (
        <motion.div className="backdrop" onClick={clickHandler}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.img src={selectedImg} alt="Modal Pic" 
                initial={{ y: "-100vh" }}
                animate={{ y: 0}}
                transition={{ delay: 0.3}}
            />
        </motion.div>
    )
};

export default Modal;