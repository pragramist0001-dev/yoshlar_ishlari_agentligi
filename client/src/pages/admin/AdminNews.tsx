import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Search, Edit2, Trash2, X, Save, Image as ImageIcon, Calendar, Eye } from 'lucide-react';
import Loader from '../../components/common/Loader';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../../context/LoaderContext';

const AdminNews = () => {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { t, i18n } = useTranslation();
    const { showLoader, hideLoader } = useLoader();

    // Form State
    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        content: '',
        category: 'Yangiliklar',
        image: null as File | null,
        imageUrl: ''
    });

    const fetchNews = async () => {
        try {
            const res = await api.get('/news');
            setNews(Array.isArray(res.data) ? res.data : (res.data.news || []));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        showLoader();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('category', formData.category);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (formData._id) {
                await api.put(`/news/${formData._id}`, data);
            } else {
                await api.post('/news', data);
            }
            fetchNews();
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            console.error(error);
        } finally {
            hideLoader();
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm(t('admin.confirm_delete'))) {
            showLoader();
            try {
                await api.delete(`/news/${id}`);
                fetchNews();
            } catch (error) {
                console.error(error);
            } finally {
                hideLoader();
            }
        }
    };

    const handleEdit = (item: any) => {
        setFormData({
            _id: item._id,
            title: item.title,
            content: item.content,
            category: item.category,
            image: null,
            imageUrl: item.image
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            _id: '',
            title: '',
            content: '',
            category: 'Yangiliklar',
            image: null,
            imageUrl: ''
        });
    };

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="h-full flex items-center justify-center"><Loader /></div>;

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder={t('admin.search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-800 dark:text-white placeholder:text-gray-400"
                    />
                </div>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30 active:scale-95"
                >
                    <Plus size={20} />
                    {t('admin.add')}
                </button>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNews.map((item, index) => (
                    <div key={item._id} data-aos="fade-up" data-aos-delay={index * 100} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group flex flex-col h-full">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={item.image || '/placeholder-news.jpg'}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg text-xs font-bold text-primary shadow-sm">
                                    {item.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-medium">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(item.createdAt).toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US')}</span>
                                <span className="flex items-center gap-1"><Eye size={14} /> {item.views}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-6 flex-grow">
                                {item.content}
                            </p>
                            <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                                >
                                    <Edit2 size={16} /> {t('admin.edit')}
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} /> {t('admin.delete')}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-20">
                            <h2 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-tight">
                                {formData._id ? t('admin.edit') : t('admin.add')}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Image Upload */}
                            <div className="w-full aspect-video bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-primary transition-colors">
                                <input
                                    type="file"
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                {(formData.image || formData.imageUrl) ? (
                                    <img
                                        src={formData.image ? URL.createObjectURL(formData.image) : formData.imageUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center text-gray-400 group-hover:text-primary transition-colors">
                                        <ImageIcon size={48} className="mx-auto mb-2" />
                                        <p className="text-sm font-bold">{t('admin.image')}</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('admin.category')}</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-800 dark:text-white"
                                    >
                                        <option value="Yangiliklar">Yangiliklar</option>
                                        <option value="Tadbirlar">Tadbirlar</option>
                                        <option value="E'lonlar">E'lonlar</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('admin.title')}</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-800 dark:text-white placeholder:text-gray-400"
                                        placeholder={t('admin.title')}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('admin.content')}</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium h-40 text-gray-800 dark:text-white placeholder:text-gray-400 resize-none"
                                    placeholder={t('admin.content')}
                                    required
                                />
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-xl transition-all"
                                >
                                    {t('admin.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Save size={20} />
                                    {t('admin.save')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNews;
