import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../store/slices/newsSlice';
import type { RootState, AppDispatch } from '../store';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Newspaper } from 'lucide-react';

import Loader from '../components/common/Loader';
import { useTranslation } from 'react-i18next';

const News = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { newsList, loading } = useSelector((state: RootState) => state.news as any);
    const [category, setCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchNews({ category, search: searchTerm }));
    }, [dispatch, category, searchTerm]);

    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <div className="bg-gray-50 border-b border-gray-100 py-20">
                <div className="max-w-[1440px] mx-auto px-6">
                    <h1 className="text-5xl font-black text-[#1E3A8A] uppercase tracking-tighter leading-tight">{t('news.title')}</h1>
                    <p className="text-gray-400 mt-4 font-bold uppercase text-[11px] tracking-[0.3em]">{t('navbar.agency')}</p>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar / Filters */}
                    <aside className="lg:w-1/4 space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-black text-[#1E3A8A] uppercase tracking-[0.2em]">{t('home.latest_news')}</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder={t('search_placeholder', "Qidirish...")}
                                    className="w-full bg-white border border-gray-100 px-4 py-4 text-sm focus:border-[#1E3A8A] outline-none transition-all font-bold placeholder:text-gray-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-200" size={16} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[11px] font-black text-[#1E3A8A] uppercase tracking-[0.2em]">{t('news.all_categories')}</h3>
                            <div className="flex flex-col gap-1">
                                {['', 'Tadbirlar', "E'lonlar", 'Grantlar', 'Tanlovlar'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`text-left px-5 py-4 text-[11px] font-black uppercase tracking-widest transition-all border-l-2 ${category === cat ? 'border-[#1E3A8A] text-[#1E3A8A] bg-gray-50' : 'border-transparent text-gray-400 hover:text-gray-800'}`}
                                    >
                                        {cat || t('news.all_categories')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* News List */}
                    <main className="lg:w-3/4">
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {newsList && newsList.map((item: any) => (
                                    <Link
                                        key={item._id}
                                        to={`/news/${item.slug}`}
                                        className="group flex flex-col cursor-pointer bg-white border border-gray-50 rounded-sm hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500"
                                    >
                                        <div className="h-60 overflow-hidden relative">
                                            <img
                                                src={item.image || 'https://via.placeholder.com/800x600'}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-10 flex flex-col flex-grow">
                                            <h3 className="text-[15px] font-black text-gray-800 leading-snug mb-10 group-hover:text-[#1E3A8A] transition-colors uppercase tracking-tight line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</span>
                                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-200 group-hover:text-[#1E3A8A] group-hover:bg-blue-50 transition-all">
                                                    <ChevronRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {!loading && (!newsList || newsList.length === 0) && (
                            <div className="bg-gray-50 text-center py-32 rounded border border-dashed border-gray-200">
                                <Newspaper size={48} className="mx-auto text-gray-100 mb-6" />
                                <p className="text-gray-400 font-black uppercase text-[11px] tracking-[0.3em]">{t('home.nov_news')}</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default News;
