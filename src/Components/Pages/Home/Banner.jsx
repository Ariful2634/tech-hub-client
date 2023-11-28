import { motion } from "framer-motion"
import { useState } from "react";

const Banner = () => {

    const [rotate,setRotate]=useState(false)

    return (
        <motion.div animate={{rotate:rotate?360:0}} onClick={()=>setRotate(!rotate)}>
            <div className="bg-[url('https://i.ibb.co/2t7g0MK/pro.jpg')] mt-4 h-[300px] lg:h-[480px] rounded bg-blend-overlay bg-opacity-30 bg-black bg-center bg-cover">
               <h1 className="text-white text-4xl py-10 md:py-20 lg:py-44 italic text-center">Discover And Share The Latest Tech Products At One Place</h1>
            </div>
        </motion.div>
    );
};

export default Banner;