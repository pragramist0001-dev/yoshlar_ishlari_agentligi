import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Calendar, ChevronLeft, Facebook, Instagram, Send, Eye } from 'lucide-react';
import Loader from '../components/common/Loader';
import { useTranslation } from 'react-i18next';

const NewsDetail = () => {
    const { slug } = useParams();
    const [news, setNews] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const res = await api.get(`/news/${slug}`);
                setNews(res.data);

                // Track unique view via localStorage
                const viewedKey = 'viewed_news';
                const viewed: string[] = JSON.parse(sessionStorage.getItem(viewedKey) || '[]');
                if (slug && !viewed.includes(slug)) {
                    await api.post(`/news/${slug}/view`);
                    viewed.push(slug);
                    sessionStorage.setItem(viewedKey, JSON.stringify(viewed));
                    // Update local views count
                    setNews((prev: any) => prev ? { ...prev, views: (prev.views || 0) + 1 } : prev);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNewsDetail();
    }, [slug]);

    if (loading) {
        return (
            <div className="py-20">
                <Loader />
            </div>
        );
    }

    if (!news) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">{t('news_detail.not_found')}</h1>
                <Link to="/news" className="text-primary hover:underline mt-4 inline-block">{t('news_detail.back_to_list')}</Link>
            </div>
        );
    }

    return (
        <article className="bg-white min-h-screen">
            <div className="h-[500px] w-full relative">
                <img
                    src={news.image || 'https://via.placeholder.com/1200x600'}
                    className="w-full h-full object-cover"
                    alt={news.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
                    <Link to="/news" className="flex items-center gap-1 text-[#1E3A8A] font-bold mb-8 hover:gap-2 transition-all">
                        <ChevronLeft size={20} /> {t('news_detail.back')}
                    </Link>

                    <header className="mb-10">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="bg-blue-50 text-[#1E3A8A] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                                {news.category}
                            </span>
                            <span className="flex items-center gap-2 text-gray-400">
                                <Calendar size={18} />
                                {new Date(news.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-2 text-gray-400">
                                <Eye size={18} />
                                {news.views || 0}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                            {news.title}
                        </h1>
                        <p className="text-xl text-gray-500 italic border-l-4 border-[#1E3A8A] pl-6 py-2">
                            {news.description}
                        </p>
                    </header>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
                        {news.content.split('\n').map((para: string, i: number) => (
                            <p key={i} className="mb-6">{para}</p>
                        ))}
                    </div>

                    <div className="border-t pt-10 flex flex-wrap justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-500 font-bold">{t('news_detail.share')}:</span>
                            <div className="flex gap-2">
                                <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Facebook size={20} /></button>
                                <button className="p-2 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition-all"><Instagram size={20} /></button>
                                <button className="p-2 bg-sky-50 text-sky-600 rounded-full hover:bg-sky-600 hover:text-white transition-all"><Send size={20} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default NewsDetail;
