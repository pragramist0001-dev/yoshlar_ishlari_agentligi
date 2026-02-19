import { useEffect, useState } from 'react';
import api from '../services/api';
import { FileText, Download, FileCheck } from 'lucide-react';
import Loader from '../components/common/Loader';
import { useTranslation } from 'react-i18next';

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const res = await api.get('/documents');
                setDocuments(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, []);

    const filteredDocs = category ? documents.filter((doc: any) => doc.category === category) : documents;

    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <div className="bg-gray-50 border-b border-gray-100 py-20">
                <div className="max-w-[1440px] mx-auto px-6">
                    <h1 className="text-5xl font-black text-[#1E3A8A] uppercase tracking-tighter leading-tight">{t('documents.title')}</h1>
                    <p className="text-gray-400 mt-4 font-bold uppercase text-[11px] tracking-[0.3em]">{t('navbar.agency')}</p>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar / Filters */}
                    <aside className="lg:w-1/4 space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-black text-[#1E3A8A] uppercase tracking-[0.2em]">{t('documents.category')}</h3>
                            <div className="flex flex-col gap-1">
                                {['', 'Prezident qarori', 'Vazirlar qarori', "Agentlik buyrug'i", 'Nizomlar'].map((cat) => (
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

                    {/* Main Content */}
                    <main className="lg:w-3/4">
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="space-y-8">
                                {filteredDocs.map((doc: any) => (
                                    <div key={doc._id} className="group bg-white p-10 border border-gray-100 hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 rounded-sm flex flex-col sm:flex-row items-center gap-10">
                                        <div className="w-20 h-20 bg-gray-50 flex items-center justify-center text-gray-200 group-hover:text-[#1E3A8A] group-hover:bg-blue-50 transition-all shrink-0">
                                            <FileText size={40} />
                                        </div>
                                        <div className="flex-grow text-center sm:text-left">
                                            <div className="flex flex-wrap justify-center sm:justify-start gap-6 mb-4">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[#1E3A8A] bg-blue-50/50 px-3 py-1">
                                                    {doc.category}
                                                </span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    {doc.date ? new Date(doc.date).toLocaleDateString() : '--'}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-black text-gray-800 leading-snug group-hover:text-[#1E3A8A] transition-colors line-clamp-2 uppercase tracking-tight">{doc.title}</h3>
                                        </div>
                                        <a
                                            href={doc.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-4 bg-gray-50 text-[11px] font-black text-[#1E3A8A] uppercase tracking-widest hover:bg-[#1E3A8A] hover:text-white transition-all flex items-center gap-3 shrink-0 border border-gray-100"
                                        >
                                            <Download size={18} /> {t('documents.download')}
                                        </a>
                                    </div>
                                ))}

                                {filteredDocs.length === 0 && (
                                    <div className="bg-gray-50 text-center py-32 rounded border border-dashed border-gray-200">
                                        <FileCheck size={48} className="mx-auto text-gray-100 mb-6" />
                                        <p className="text-gray-400 font-black uppercase text-[11px] tracking-[0.3em]">Hujjatlar topilmadi</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Documents;
