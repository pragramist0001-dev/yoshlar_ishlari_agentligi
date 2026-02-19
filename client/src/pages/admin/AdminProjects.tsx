import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Trash2, Edit3, Save, X, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../../context/LoaderContext';

const AdminProjects = () => {
    const { showToast } = useToast();
    const { showLoader, hideLoader } = useLoader();
    const { t, i18n } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'active',
        deadline: '',
        image: null as any
    });

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        showLoader();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('status', formData.status);
        if (formData.deadline) data.append('deadline', formData.deadline);
        if (formData.image instanceof File) {
            data.append('image', formData.image);
        }

        try {
            if (editingItem) {
                await api.put(`/projects/${editingItem._id}`, data);
                showToast(t('admin.success_update'), 'success');
            } else {
                await api.post('/projects', data);
                showToast(t('admin.success_add'), 'success');
            }
            setIsModalOpen(false);
            setEditingItem(null);
            setFormData({ title: '', description: '', status: 'active', deadline: '', image: null });
            fetchProjects();
        } catch (err: any) {
            console.error('Project submit error:', err);
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
                await api.delete(`/projects/${id}`);
                fetchProjects();
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('admin.projects')}</h2>
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setEditingItem(null);
                        setError(null);
                        setFormData({ title: '', description: '', status: 'active', deadline: '', image: null });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all"
                >
                    <Plus size={20} /> {t('admin.add')}
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400 text-sm uppercase tracking-wider">{t('admin.image')}</th>
                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400 text-sm uppercase tracking-wider">{t('admin.title')}</th>
                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400 text-sm uppercase tracking-wider">{t('admin.status')}</th>
                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400 text-sm uppercase tracking-wider">{t('admin.date')}</th>
                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400 text-sm uppercase tracking-wider text-right">{t('admin.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {projects.map((project: any, index) => (
                            <tr key={project._id} data-aos="fade-up" data-aos-delay={index * 50} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-700 overflow-hidden border border-gray-200 dark:border-gray-600">
                                        <img src={project.image} className="w-full h-full object-cover" alt="" onError={(e: any) => e.target.src = 'https://via.placeholder.com/150'} />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">{project.title}</td>
                                <td className="px-6 py-4">
                                    {project.status === 'active' ? (
                                        <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-xs font-black uppercase tracking-tighter">{t('admin.active') || 'Aktiv'}</span>
                                    ) : (
                                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-black uppercase tracking-tighter">{t('admin.completed') || 'Yakunlangan'}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} />
                                        {project.deadline ? new Date(project.deadline).toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US') : 'Noma\'lum'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 translate-x-2 group-hover:translate-x-0 transition-transform">
                                        <button
                                            onClick={() => {
                                                setEditingItem(project);
                                                setError(null);
                                                setFormData({
                                                    title: project.title,
                                                    description: project.description,
                                                    status: project.status,
                                                    deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : '',
                                                    image: null
                                                });
                                                setIsModalOpen(true);
                                            }}
                                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project._id)}
                                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
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
                    <div className="bg-white dark:bg-gray-800 rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl">
                                    <CheckCircle2 size={24} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">{editingItem ? t('admin.edit') : t('admin.add')}</h3>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors inline-flex text-gray-500 dark:text-gray-400"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-bold flex items-center gap-2 border border-red-100 dark:border-red-900/50">
                                    <AlertCircle size={18} />
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('admin.title')}</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-3 border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl focus:border-blue-600 outline-none transition-all font-medium placeholder:text-gray-300"
                                    placeholder={t('admin.title')}
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-inter">{t('admin.status')}</label>
                                    <select
                                        className="w-full px-5 py-3 border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl focus:border-blue-600 outline-none transition-all font-medium"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="active">Faol</option>
                                        <option value="completed">Yakunlangan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('admin.date')}</label>
                                    <input
                                        type="date"
                                        className="w-full px-5 py-3 border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl focus:border-blue-600 outline-none transition-all font-medium"
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('admin.image')}</label>
                                <div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center hover:border-blue-400 transition-colors relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] })}
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <Clock size={24} className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors" />
                                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{formData.image ? formData.image.name : t('admin.image')}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('admin.description')}</label>
                                <textarea
                                    rows={4}
                                    required
                                    className="w-full px-5 py-3 border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl focus:border-blue-600 outline-none transition-all font-medium placeholder:text-gray-300"
                                    placeholder={t('admin.description')}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 overflow-hidden">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 border-2 border-gray-100 dark:border-gray-700 rounded-2xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">{t('admin.cancel')}</button>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-extrabold flex items-center gap-2 transition-all shadow-lg shadow-blue-200 dark:shadow-none active:scale-95">
                                    <Save size={20} /> {t('admin.save')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProjects;
