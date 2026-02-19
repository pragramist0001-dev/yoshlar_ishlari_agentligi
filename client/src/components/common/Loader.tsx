import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center py-32 space-y-8">
            <motion.div
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.9, 1, 0.9]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative"
            >
                <img
                    src="/Logo.svg"
                    alt="Logo"
                    className="w-20 h-20 object-contain"
                />
                <div className="absolute inset-0 border-2 border-[#1E3A8A] border-t-transparent rounded-full animate-spin -m-4"></div>
            </motion.div>
            <span className="text-[11px] font-black text-[#1E3A8A] uppercase tracking-[0.4em] animate-pulse">
                Yuklanmoqda...
            </span>
        </div>
    );
};

export default Loader;
