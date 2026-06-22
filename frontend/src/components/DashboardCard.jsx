import { motion } from "framer-motion";

function DashboardCard({title,value}) {

    return (

        <motion.div

            initial={{opacity: 0,y: 20}}
            animate={{opacity: 1,y: 0 }}
            whileHover={{y: -8, scale: 1.03}}

            className=" bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl ">

            <p className=" text-slate-400 text-sm ">

                {title}

            </p>

            <h1
                className="text-4xlfont-bold mt-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
                
            >

                {value}

            </h1>

        </motion.div>

    );
}

export default DashboardCard;