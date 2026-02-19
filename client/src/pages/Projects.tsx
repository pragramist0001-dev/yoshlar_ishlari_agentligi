import { useEffect, useState } from 'react';
import api from '../services/api';
import { Clock, ChevronRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { useTranslation } from 'react-i18next';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <div className="bg-gray-50 border-b border-gray-100 py-20">
                <div className="max-w-[1440px] mx-auto px-6">
                    <h1 className="text-5xl font-black text-[#1E3A8A] uppercase tracking-tighter leading-tight">{t('projects.title')}</h1>
                    <p className="text-gray-400 mt-4 font-bold uppercase text-[11px] tracking-[0.3em]">{t('navbar.agency')}</p>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 py-20">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {projects.map((project: any) => (
                            <Link key={project._id} to={`/projects/${project._id}`} className="group bg-white border border-gray-50 rounded-sm hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 overflow-hidden flex flex-col">
                                <div className="h-64 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img
                                        src={project.image || 'https://via.placeholder.com/800x600'}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6 bg-white px-3 py-1 shadow-lg">
                                        <span className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest">{project.status === 'completed' ? t('projects.status_completed') : t('projects.status_active')}</span>
                                    </div>
                                </div>
                                <div className="p-10 flex flex-col flex-grow">
                                    <h3 className="text-[16px] font-black text-gray-800 leading-snug mb-6 uppercase tracking-tight group-hover:text-[#1E3A8A] transition-colors">{project.title}</h3>
                                    <p className="text-[14px] text-gray-400 font-medium line-clamp-3 mb-10 leading-relaxed">{project.description}</p>

                                    <div className="mt-auto space-y-6">
                                        <div className="flex items-center gap-6 text-[11px] font-bold text-gray-300 uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><Clock size={14} /> {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Muddatsiz'}</span>
                                            <span className="flex items-center gap-2 ml-auto"><Eye size={14} /> {project.views || 0}</span>
                                        </div>
                                        <div className="w-full py-4 bg-gray-50 border border-gray-100 text-[11px] font-black text-[#1E3A8A] uppercase tracking-widest group-hover:bg-[#1E3A8A] group-hover:text-white transition-all flex items-center justify-center gap-3">
                                            {t('projects.view_project')} <ChevronRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
