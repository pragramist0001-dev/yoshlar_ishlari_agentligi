import { motion, AnimatePresence } from 'framer-motion';
import { useLoader } from '../../context/LoaderContext';

const GlobalLoader = () => {
    const { isLoading } = useLoader();

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center space-y-8"
                >
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
                            className="w-24 h-24 object-contain"
                        />
                        <div className="absolute inset-0 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin -m-6"></div>
                    </motion.div>
                    <span className="text-[12px] font-black text-[#1E3A8A] uppercase tracking-[0.6em] animate-pulse">
                        Yuklanmoqda...
                    </span>
                    <div className="absolute bottom-12 left-0 right-0 text-center">
                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Yoshlar ishlari agentligi</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalLoader;
