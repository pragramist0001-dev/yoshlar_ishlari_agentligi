import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Newspaper, FileText, Briefcase, MessageSquare, LogOut, Bell, User, Settings, Globe, Menu, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import GlobalLoader from '../components/common/GlobalLoader';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { showLoader, hideLoader } = useLoader();
    const [notificationCount, setNotificationCount] = useState(0);
    const { t, i18n } = useTranslation();
    const [langOpen, setLangOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
        });
    }, []);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLangOpen(false);
    };

    const fetchNotifications = async () => {
        try {
            // Note: We need to import api here or use the one from services
            const api = (await import('../services/api')).default;
            const res = await api.get('/applications/count');
            setNotificationCount(res.data.count);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 15000); // Poll every 15 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        showLoader();
        hideLoader();
        setIsSidebarOpen(false); // Close sidebar on route change
    }, [location.pathname, showLoader, hideLoader]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: t('admin.dashboard'), path: '/admin' },
        { icon: <Newspaper size={20} />, label: t('admin.news'), path: '/admin/news' },
        { icon: <FileText size={20} />, label: t('admin.documents'), path: '/admin/documents' },
        { icon: <Briefcase size={20} />, label: t('admin.projects'), path: '/admin/projects' },
        { icon: <MessageSquare size={20} />, label: t('admin.applications'), path: '/admin/applications' },
        { icon: <Settings size={20} />, label: t('admin.settings'), path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <GlobalLoader />
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`w-64 bg-primary dark:bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-white/10">
                    <Link to="/admin" className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 overflow-hidden">
                            <img src="/Logo.svg" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <h2 className="text-xl font-bold">{t('admin.panel_title')}</h2>
                    </Link>
                </div>

                <nav className="flex-grow p-4 mt-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path ? 'bg-white text-primary font-bold' : 'hover:bg-white/10'}`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition-colors text-blue-100 hover:text-white"
                    >
                        <LogOut size={20} />
                        {t('admin.logout')}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow lg:ml-64 flex flex-col transition-all bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
                <header className="h-20 bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-40 px-4 sm:px-8 flex justify-between items-center transition-colors">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white truncate">
                            {menuItems.find(item => item.path === location.pathname)?.label || t('admin.dashboard')}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-primary px-4 py-2 rounded-xl group">
                            <Globe size={16} className="group-hover:rotate-12 transition-transform" />
                            {t('admin.back_to_site')}
                        </Link>

                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 dark:bg-gray-800 dark:text-yellow-400 rounded-xl"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-primary bg-gray-50 dark:bg-gray-800 rounded-xl"
                            >
                                {i18n.language.toUpperCase()}
                                <ChevronDown size={14} />
                            </button>
                            {langOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                                    <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl py-2 z-20">
                                        {['uz', 'ru', 'en'].map((lng) => (
                                            <button
                                                key={lng}
                                                onClick={() => changeLanguage(lng)}
                                                className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-700 ${i18n.language === lng ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}
                                            >
                                                {lng === 'uz' ? "O'zbekcha" : lng === 'ru' ? "Русский" : "English"}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <button className="text-gray-400 hover:text-primary transition-colors relative">
                            <Bell size={24} />
                            {notificationCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center animate-pulse">
                                    {notificationCount > 9 ? '9+' : notificationCount}
                                </span>
                            )}
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l dark:border-gray-700">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-800 dark:text-white">{t('admin.super_admin')}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{t('admin.main_admin')}</p>
                            </div>
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400">
                                <User size={24} />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
