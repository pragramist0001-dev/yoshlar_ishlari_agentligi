import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Trash2, Edit3, FileText, Save, X, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../../context/LoaderContext';

const AdminDocuments = () => {
    const { showToast } = useToast();
    const { showLoader, hideLoader } = useLoader();
    const { t, i18n } = useTranslation();
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Prezident qarori',
        date: new Date().toISOString().split('T')[0],
        file: null as any
    });

    const fetchDocs = async () => {
        try {
            setLoading(true);
            const res = await api.get('/documents');
            setDocs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocs();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        showLoader();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('date', formData.date);
        if (formData.file) {
            data.append('file', formData.file);
        }

        try {
            if (editingItem) {
                await api.put(`/documents/${editingItem._id}`, data);
                showToast(t('admin.success_update'), 'success');
            } else {
                await api.post('/documents', data);
                showToast(t('admin.success_add'), 'success');
            }
            setIsModalOpen(false);
            setEditingItem(null);
            setFormData({ title: '', category: 'Prezident qarori', date: new Date().toISOString().split('T')[0], file: null });
            fetchDocs();
        } catch (err: any) {
            console.error('Document submit error:', err);
            const msg = err.response?.data?.message || err.message || 'Xatolik yuz berdi';
            setError(msg);
            showToast(msg, 'error');
        } finally {
            hideLoader();
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm(t('admin.confirm_delete'))) {
            showLoader();
            try {
                await api.delete(`/documents/${id}`);
                fetchDocs();
                showToast(t('admin.success_delete'), 'success');
            } catch (err) {
                console.error(err);
            } finally {
                hideLoader();
            }
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tight">{t('admin.documents')}</h2>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setError(null);
                        setFormData({ title: '', category: 'Prezident qarori', date: new Date().toISOString().split('T')[0], file: null });
                        setIsModalOpen(true);
                    }}
                    className="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
                >
                    <Plus size={20} /> {t('admin.add')}
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4 font-black text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-widest">{t('admin.type')}</th>
                            <th className="px-6 py-4 font-black text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-widest">{t('admin.title')}</th>
                            <th className="px-6 py-4 font-black text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-widest">{t('admin.date')}</th>
                            <th className="px-6 py-4 font-black text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-widest text-right">{t('admin.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                        {docs.map((doc: any, index) => (
                            <tr key={doc._id} data-aos="fade-up" data-aos-delay={index * 50} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl inline-block group-hover:scale-110 transition-transform">
                                        <FileText size={20} />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{doc.title}</p>
                                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-tighter mt-1">{doc.category}</p>
                                </td>
                                <td className="px-6 py-4 text-gray-400 dark:text-gray-500 text-xs font-bold font-inter">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        {new Date(doc.date).toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US')}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 translate-x-4 group-hover:translate-x-0 transition-transform">
                                        <button
                                            onClick={() => {
                                                setEditingItem(doc);
                                                setError(null);
                                                setFormData({
                                                    title: doc.title,
                                                    category: doc.category,
                                                    date: new Date(doc.date).toISOString().split('T')[0],
                                                    file: null
                                                });
                                                setIsModalOpen(true);
                                            }}
                                            className="p-2.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doc._id)}
                                            className="p-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-2xl">
                                    <CheckCircle2 size={24} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{editingItem ? t('admin.edit') : t('admin.add')}</h3>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-500 dark:text-gray-400"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-bold flex items-center gap-2 border border-red-100 dark:border-red-900/50 animate-in slide-in-from-top">
                                    <AlertCircle size={18} />
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">{t('admin.title')}</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-3 border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl focus:border-primary outline-none transition-all font-bold placeholder:text-gray-200 dark:placeholder:text-gray-600"
                                    placeholder={t('admin.title')}
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">{t('admin.category')}</label>
                                <select
                                    className="w-full px-5 py-3 border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl focus:border-primary outline-none transition-all font-bold"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Prezident qarori">Prezident qarori</option>
                                    <option value="Vazirlar qarori">Vazirlar qarori</option>
                                    <option value="Agentlik buyrug'i">Agentlik buyrug'i</option>
                                    <option value="Nizomlar">Nizomlar</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">{t('admin.date')}</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-5 py-3 border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl focus:border-primary outline-none transition-all font-bold"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">{t('admin.file')} (PDF)</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            required={!editingItem}
                                            accept=".pdf"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] })}
                                        />
                                        <div className={`px-5 py-3 border-2 border-dashed rounded-2xl text-[10px] font-black uppercase text-center flex flex-col items-center justify-center gap-1 transition-colors ${formData.file ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary' : 'border-gray-100 dark:border-gray-700 text-gray-300 dark:text-gray-500 group-hover:border-primary group-hover:text-primary'}`}>
                                            <FileText size={16} />
                                            <span className="truncate max-w-[120px]">{formData.file ? formData.file.name : 'Tanlash'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-50 dark:border-gray-700">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3.5 border-2 border-gray-50 dark:border-gray-700 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">{t('admin.cancel')}</button>
                                <button type="submit" className="bg-primary hover:bg-primary-light text-white px-10 py-3.5 rounded-2xl font-black uppercase tracking-tight flex items-center gap-2 transition-all shadow-xl shadow-blue-100 dark:shadow-none active:scale-95">
                                    <Save size={20} /> {editingItem ? t('admin.save') : t('admin.add')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDocuments;
