import { useEffect, useState } from 'react';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../common/Loader';
import { useTranslation } from 'react-i18next';

const NewsSection = () => {
    const [newsItems, setNewsItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await api.get('/news?limit=6');
                setNewsItems(res.data.news || res.data); // Support both structures
            } catch (err) {
                console.error('News fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) return <div className="py-20"><Loader /></div>;

    return (
        <section className="bg-white pb-20">
            <div className="max-w-[1440px] mx-auto px-6">
                {newsItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {newsItems.map((item, i) => (
                            <Link
                                key={item._id}
                                to={`/news/${item.slug}`}
                                className="group flex flex-col cursor-pointer bg-white border border-gray-100 rounded-sm hover:shadow-xl hover:shadow-gray-100 transition-all duration-500"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={item.image || `https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800&q=80&sig=${i}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 shadow-sm">
                                        <span className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest">{item.category || 'Yangilik'}</span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-[14px] font-black text-gray-800 leading-snug mb-8 group-hover:text-[#1E3A8A] transition-colors uppercase tracking-tight line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-[#1E3A8A] group-hover:bg-blue-50 transition-all">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-sm border border-dashed border-gray-200">
                        <Newspaper size={48} className="mx-auto text-gray-100 mb-6" />
                        <p className="text-gray-400 font-black uppercase text-[11px] tracking-[0.3em]">{t('home.nov_news', 'Yangiliklar mavjud emas')}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewsSection;
