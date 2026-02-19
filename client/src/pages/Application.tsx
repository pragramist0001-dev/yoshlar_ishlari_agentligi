import { useState, useEffect } from 'react';
import api from '../services/api';
import { Send, User, Phone, MessageSquare, List, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const Application = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const projectId = queryParams.get('project');

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        type: projectId ? 'Grant ariza' : '',
        message: projectId ? `Loyiha ID: ${projectId} bo'yicha ariza` : '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        if (projectId) {
            setFormData(prev => ({
                ...prev,
                type: 'Grant ariza',
                message: `Loyiha ID: ${projectId} bo'yicha ariza qaydnomasi.`
            }));
        }
    }, [projectId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/applications', formData);
            setStatus('success');
            setFormData({ fullName: '', phone: '', type: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <div className="gov-page-header">
                <div className="gov-container">
                    <h1 className="text-4xl font-black text-[#1E3A8A] uppercase tracking-tighter">{t('application.title')}</h1>
                    <p className="text-gray-500 mt-2 font-medium">{t('application.subtitle')}</p>
                </div>
            </div>

            <div className="gov-container py-20">
                <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <div className="bg-[#1E3A8A] p-8 text-white rounded shadow-xl">
                            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                                <AlertCircle size={24} className="text-blue-300" /> Eslatma
                            </h3>
                            <ul className="space-y-6 text-xs font-medium text-blue-100 leading-relaxed">
                                <li className="flex gap-4">
                                    <span className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center shrink-0">1</span>
                                    Ism va sharifingizni to'liq kiriting.
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center shrink-0">2</span>
                                    Bog'lanish uchun telefon raqamingizni ko'rsatib o'ting.
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center shrink-0">3</span>
                                    Murojaatingiz 48 soat ichida ko'rib chiqiladi.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="lg:w-2/3">
                        {status === 'success' ? (
                            <div className="bg-green-50 border border-green-200 p-12 text-center rounded">
                                <CheckCircle2 size={56} className="mx-auto text-green-600 mb-6" />
                                <h2 className="text-2xl font-black text-green-800 uppercase tracking-tight mb-4">{t('application.success')}</h2>
                                <p className="text-sm text-green-700 font-medium mb-10">Tez orada mutaxassislarimiz siz bilan bog'lanishadi.</p>
                                <button onClick={() => setStatus('idle')} className="btn-gov">{t('application.submit')}</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 p-10 border border-gray-200 rounded">
                                <div>
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 block">{t('application.form_name')}</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            required
                                            className="gov-input pl-12"
                                            placeholder="F.I.SH."
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 block">{t('application.form_phone')}</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="tel"
                                                required
                                                className="gov-input pl-12"
                                                placeholder="+998"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 block">{t('documents.category')}</label>
                                        <div className="relative">
                                            <List className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <select
                                                required
                                                className="gov-input pl-12 appearance-none"
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            >
                                                <option value="">Tanlang...</option>
                                                <option value="Murojaat">Umumiy Murojaat</option>
                                                <option value="Grant ariza">Grant uchun ariza</option>
                                                <option value="Muammo yuborish">Muammo yoki shikoyat</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 block">{t('application.form_message')}</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <textarea
                                            required
                                            rows={5}
                                            className="gov-input pl-12"
                                            placeholder="Batafsil ma'lumot qoldiring..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>

                                {status === 'error' && (
                                    <div className="bg-red-50 text-red-700 p-4 rounded text-xs font-bold border border-red-200">
                                        {t('application.error')}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full btn-gov py-4 flex items-center justify-center gap-2"
                                >
                                    {status === 'loading' ? 'Yuborilmoqda...' : <><Send size={20} /> {t('application.submit')}</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Application;
