import { useEffect, useState } from 'react';
import { Users, FileText, Newspaper, Target, TrendingUp, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import Loader from '../../components/common/Loader';

const Dashboard = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Newspaper': return <Newspaper size={24} />;
            case 'Target': return <Target size={24} />;
            case 'FileText': return <FileText size={24} />;
            case 'Users': return <Users size={24} />;
            default: return <TrendingUp size={24} />;
        }
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/dashboard/stats');
                setData(res.data);
            } catch (err) {
                console.error('Stats fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader /></div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.stats.map((stat: any, i: number) => (
                    <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 ${stat.color} text-white rounded-2xl`}>
                                {getIcon(stat.icon)}
                            </div>
                            <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">Real-vaqt</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div data-aos="fade-up" data-aos-delay="400" className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        Oxirgi murojaatlar
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full uppercase tracking-tighter">Top 5</span>
                    </h3>
                    <div className="space-y-4">
                        {data?.recentApplications.length > 0 ? (
                            data.recentApplications.map((app: any) => (
                                <div key={app._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-blue-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                                            {app.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">{app.fullName}</h4>
                                            <p className="text-xs text-gray-500 line-clamp-1">{app.subject} • {new Date(app.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter ${app.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                                        app.status === 'viewed' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                        }`}>
                                        {app.status}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-400">
                                <AlertCircle className="mx-auto mb-2 opacity-20" size={32} />
                                <p className="text-xs font-bold uppercase tracking-widest">Murojaatlar mavjud emas</p>
                            </div>
                        )}
                    </div>
                </div>

                <div data-aos="fade-up" data-aos-delay="600" className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center min-h-[400px]">
                    <h3 className="text-xl font-bold mb-6 self-start">Tizim holati</h3>
                    <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center animate-pulse">
                            <TrendingUp size={48} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-gray-900 uppercase tracking-tighter">Barcha tizimlar soz</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Sinxronizatsiya: 100%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
