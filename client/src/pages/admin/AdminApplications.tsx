import { useEffect, useState } from 'react';
import api from '../../services/api';
import { MessageSquare, Eye, Phone, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../../context/LoaderContext';

const AdminApplications = () => {
    const { showToast } = useToast();
    const { showLoader, hideLoader } = useLoader();
    const { t, i18n } = useTranslation();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState<any>(null);
    const [statusUpdating, setStatusUpdating] = useState(false);

    const fetchApps = async () => {
        try {
            setLoading(true);
            const res = await api.get('/applications');
            setApps(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            setStatusUpdating(true);
            showLoader();
            await api.patch(`/applications/${id}`, { status });
            showToast(t('admin.success_update'), 'success');
            fetchApps();
            if (selectedApp && selectedApp._id === id) {
                setSelectedApp({ ...selectedApp, status });
            }
        } catch (err) {
            console.error(err);
            showToast('Xatolik yuz berdi!', 'error');
        } finally {
            setStatusUpdating(false);
            hideLoader();
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
                <h2 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tight">{t('admin.applications')}</h2>
                <div className="bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">
                    Jami: {apps.length}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* List Side */}
                <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden self-start">
                    <div className="p-6 bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 font-black text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-[0.2em]">
                        {t('admin.applications')}
                    </div>
                    <div className="divide-y divide-gray-50 dark:divide-gray-700 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        {apps.length === 0 ? (
                            <div className="p-12 text-center text-gray-300 dark:text-gray-600">
                                <MessageSquare className="mx-auto mb-4 opacity-10" size={48} />
                                <p className="text-[10px] font-black uppercase tracking-widest">Hozircha murojaatlar yo'q</p>
                            </div>
                        ) : (
                            apps.map((app: any, index) => (
                                <div
                                    key={app._id}
                                    data-aos="fade-in"
                                    data-aos-delay={index * 50}
                                    onClick={() => setSelectedApp(app)}
                                    className={`p-6 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all group relative ${selectedApp?._id === app._id ? 'bg-blue-50/50 dark:bg-blue-900/20 border-r-4 border-primary' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-900 dark:text-gray-100 truncate pr-2 group-hover:text-primary transition-colors">{app.fullName}</h4>
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest border ${app.status === 'new' ? 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 border-red-100 dark:border-red-900/50' :
                                            app.status === 'seen' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 border-blue-100 dark:border-blue-900/50' :
                                                'bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 border-green-100 dark:border-green-900/50'
                                            }`}>
                                            {t(`admin.${app.status}`) || app.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">{app.type}</p>
                                        <div className="flex items-center gap-1 text-[9px] text-gray-300 dark:text-gray-600 font-medium">
                                            <Clock size={10} />
                                            {new Date(app.createdAt).toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US')}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-8">
                    {selectedApp ? (
                        <div data-aos="zoom-in" className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 p-10 space-y-10 animate-in fade-in slide-in-from-right duration-500">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-20 h-20 bg-primary text-white rounded-[1.8rem] flex items-center justify-center font-black text-3xl shadow-xl shadow-blue-100 dark:shadow-none overflow-hidden">
                                        {selectedApp.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-tight">{selectedApp.fullName}</h3>
                                        <p className="text-gray-400 dark:text-gray-500 font-bold mt-1 flex items-center gap-2 text-sm">
                                            <Phone size={16} className="text-primary" /> {selectedApp.phone}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    {selectedApp.status === 'new' && (
                                        <button
                                            disabled={statusUpdating}
                                            onClick={() => updateStatus(selectedApp._id, 'seen')}
                                            className="px-6 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {t('admin.seen') || "Ko'rib chiqmoqda"}
                                        </button>
                                    )}
                                    {selectedApp.status !== 'closed' && (
                                        <button
                                            disabled={statusUpdating}
                                            onClick={() => updateStatus(selectedApp._id, 'closed')}
                                            className="px-6 py-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-100 dark:hover:bg-green-900/50 transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {t('admin.closed') || "Bajarildi (Yopish)"}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 dark:bg-gray-900/50 p-8 rounded-[2rem] border border-gray-50 dark:border-gray-700">
                                <div>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-[0.2em] mb-2">{t('admin.type')}</p>
                                    <p className="font-black text-primary uppercase text-sm tracking-tight">{selectedApp.type}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-[0.2em] mb-2">{t('admin.date')}</p>
                                    <p className="font-bold text-gray-600 dark:text-gray-300 text-sm">
                                        {new Date(selectedApp.createdAt).toLocaleString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US')}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-[0.2em] px-2">{t('admin.message')}</h4>
                                <div className="p-10 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2rem] text-gray-800 dark:text-gray-200 leading-relaxed min-h-[250px] shadow-inner font-medium text-lg">
                                    {selectedApp.message}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 h-[600px] flex flex-col items-center justify-center text-center p-12">
                            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-700 text-gray-200 dark:text-gray-600 rounded-[2rem] flex items-center justify-center mb-10 transition-transform hover:rotate-12 duration-500">
                                <Eye size={56} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-300 dark:text-gray-600 uppercase tracking-tighter">Murojaatni tanlang</h3>
                            <p className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-[0.25em] mt-3">Batafsil ma'lumotni ko'rish uchun chap ro'yxatdan foydalaning</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminApplications;
