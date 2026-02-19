import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Calendar, ChevronLeft, Clock, Eye, CheckCircle, Zap, ChevronRight } from 'lucide-react';
import Loader from '../components/common/Loader';
import { useTranslation } from 'react-i18next';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/projects/${id}`);
                setProject(res.data);

                // Track unique view via sessionStorage
                const viewedKey = 'viewed_projects';
                const viewed: string[] = JSON.parse(sessionStorage.getItem(viewedKey) || '[]');
                if (id && !viewed.includes(id)) {
                    await api.post(`/projects/${id}/view`);
                    viewed.push(id);
                    sessionStorage.setItem(viewedKey, JSON.stringify(viewed));
                    setProject((prev: any) => prev ? { ...prev, views: (prev.views || 0) + 1 } : prev);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="py-20">
                <Loader />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">{t('project_detail.not_found')}</h1>
                <Link to="/projects" className="text-primary hover:underline mt-4 inline-block">{t('project_detail.back_to_list')}</Link>
            </div>
        );
    }

    const statusLabel = project.status === 'completed' ? t('project_detail.status_completed') : t('project_detail.status_active');
    const StatusIcon = project.status === 'completed' ? CheckCircle : Zap;
    const statusColor = project.status === 'completed' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50';

    return (
        <article className="bg-white min-h-screen">
            {/* Hero Image */}
            <div className="h-[500px] w-full relative">
                <img
                    src={project.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'}
                    className="w-full h-full object-cover"
                    alt={project.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
                    <Link to="/projects" className="flex items-center gap-1 text-[#1E3A8A] font-bold mb-8 hover:gap-2 transition-all">
                        <ChevronLeft size={20} /> {t('project_detail.back')}
                    </Link>

                    <header className="mb-10">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${statusColor}`}>
                                <StatusIcon size={16} />
                                {statusLabel}
                            </span>
                            <span className="flex items-center gap-2 text-gray-400">
                                <Calendar size={18} />
                                {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                            {project.deadline && (
                                <span className="flex items-center gap-2 text-gray-400">
                                    <Clock size={18} />
                                    {t('project_detail.deadline')}: {new Date(project.deadline).toLocaleDateString()}
                                </span>
                            )}
                            <span className="flex items-center gap-2 text-gray-400">
                                <Eye size={18} />
                                {project.views || 0}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                            {project.title}
                        </h1>
                    </header>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
                        {project.description.split('\n').map((para: string, i: number) => (
                            <p key={i} className="mb-6 text-lg leading-relaxed">{para}</p>
                        ))}
                    </div>

                    <div className="border-t pt-10 flex flex-wrap justify-between items-center gap-6">
                        <Link
                            to={`/apply?project=${project._id}`}
                            className="px-10 py-4 bg-[#1E3A8A] text-white text-[12px] font-black uppercase tracking-widest hover:bg-[#1E3A8A]/90 transition-all rounded-2xl flex items-center gap-3"
                        >
                            {t('project_detail.participate')} <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectDetail;
