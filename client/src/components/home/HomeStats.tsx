import { useEffect, useState } from 'react';
import { Users, FileText, Newspaper, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const HomeStats = () => {
    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getIcon = (label: string) => {
        if (label.includes('Yangilik')) return <Newspaper size={32} />;
        if (label.includes('Loyiha')) return <Target size={32} />;
        if (label.includes('Hujjat')) return <FileText size={32} />;
        return <Users size={32} />;
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/public/stats');
                setStats(res.data);
            } catch (err) {
                console.error('Public stats fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading || stats.length === 0) return null;

    return (
        <section className="py-20 bg-white border-t border-gray-100 shadow-inner">
            <div className="gov-container">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="text-[#1E3A8A] mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
                                {getIcon(stat.label)}
                            </div>
                            <h3 className="text-3xl font-black text-gray-800 mb-2">{stat.value}</h3>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-tight">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeStats;
