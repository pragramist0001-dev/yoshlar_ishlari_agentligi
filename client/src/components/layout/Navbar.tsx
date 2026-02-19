import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Eye, Globe, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SearchModal from '../common/SearchModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [accessibilityMode, setAccessibilityMode] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Handle Accessibility Mode
    useEffect(() => {
        if (accessibilityMode) {
            document.documentElement.classList.add('grayscale-mode');
        } else {
            document.documentElement.classList.remove('grayscale-mode');
        }
    }, [accessibilityMode]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLangOpen(false);
    };

    const navLinks = [
        { name: t('navbar.agency'), path: '/about' },
        { name: t('navbar.news'), path: '/news' },
        { name: t('navbar.documents'), path: '/documents' },
        { name: t('navbar.leadership'), path: '/leadership' },
        { name: t('navbar.projects'), path: '/projects' },
        { name: t('navbar.application'), path: '/apply' },
    ];

    const languages = [
        { code: 'uz', label: "O'zbekcha" },
        { code: 'ru', label: 'Русский' },
        { code: 'en', label: 'English' },
    ];

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <>
            <header className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
                {/* Main Header Row */}
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between">

                    {/* Logo & Agency Name */}
                    <Link to="/" className="flex items-center gap-3 shrink-0 group">
                        <img
                            src="/Logo.svg"
                            alt="Logo"
                            className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform group-hover:scale-105"
                        />
                        <div className="flex flex-col border-l border-gray-200 pl-3 sm:pl-4 h-10 sm:h-12 justify-center">
                            <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase leading-tight tracking-wide mb-0.5">
                                {t('navbar.republic_of_uzbekistan')}
                            </span>
                            <span className="text-[13px] sm:text-[15px] font-black text-[#1E3A8A] uppercase leading-tight tracking-tight group-hover:text-blue-700 transition-colors">
                                {t('navbar.youth_affairs_agency')}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 2xl:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative text-[11px] font-black uppercase tracking-widest transition-colors py-2 group ${location.pathname === link.path ? 'text-[#1E3A8A]' : 'text-gray-500 hover:text-[#1E3A8A]'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1E3A8A] transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                    }`} />
                            </Link>
                        ))}

                        {/* Utils & Language */}
                        <div className="flex items-center gap-4 border-l border-gray-200 pl-6 ml-2">
                            {/* Language Switcher */}
                            <div className="relative">
                                <button
                                    onClick={() => setLangOpen(!langOpen)}
                                    className="flex items-center gap-1.5 text-[11px] font-black text-gray-600 hover:text-[#1E3A8A] transition-colors py-2 uppercase"
                                >
                                    <Globe size={14} />
                                    {currentLang.label}
                                    <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown */}
                                {langOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setLangOpen(false)}
                                        />
                                        <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => changeLanguage(lang.code)}
                                                    className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 transition-colors ${i18n.language === lang.code ? 'text-[#1E3A8A]' : 'text-gray-600'
                                                        }`}
                                                >
                                                    {lang.label}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <button
                                onClick={() => setAccessibilityMode(!accessibilityMode)}
                                className={`transition-colors p-1.5 rounded-full hover:bg-gray-50 ${accessibilityMode ? 'text-[#1E3A8A] bg-blue-50' : 'text-gray-400 hover:text-[#1E3A8A]'}`}
                                title={t('accessibility_mode', 'Maxsus rejim')}
                            >
                                <Eye size={18} />
                            </button>
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="text-gray-400 hover:text-[#1E3A8A] transition-colors p-1.5 rounded-full hover:bg-gray-50"
                            >
                                <Search size={18} />
                            </button>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-gray-600 hover:text-[#1E3A8A] transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div className="lg:hidden absolute top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-white/95 backdrop-blur-lg z-40 overflow-y-auto animate-in slide-in-from-top-5 duration-300">
                        <div className="p-6 flex flex-col gap-6">
                            {/* Mobile Lang Switcher */}
                            <div className="flex justify-center gap-4 bg-gray-50 p-2 rounded-lg">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${i18n.language === lang.code
                                            ? 'bg-white shadow-sm text-[#1E3A8A]'
                                            : 'text-gray-500'
                                            }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`text-lg font-black uppercase tracking-widest py-4 border-b border-gray-100 ${location.pathname === link.path ? 'text-[#1E3A8A]' : 'text-gray-600'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
};

export default Navbar;
