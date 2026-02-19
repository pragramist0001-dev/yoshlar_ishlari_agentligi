import { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mock data for initial implementation - will be replaced by API calls
// or we can fetch all data on mount if the dataset is small.
const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-gray-200">

                {/* Search Input Header */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
                    <Search className="text-gray-400" size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={t('search_placeholder', 'Sayt bo\'ylab qidirish...')}
                        className="flex-1 text-lg outline-none placeholder:text-gray-400 text-gray-700 bg-transparent"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Results Area */}
                <div className="min-h-[300px] max-h-[60vh] overflow-y-auto bg-gray-50/50 p-4">
                    {!query && (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-gray-400">
                            <Search size={48} className="mb-4 opacity-20" />
                            <p className="text-sm font-medium">Qidirish uchun yozing...</p>
                        </div>
                    )}

                    {query && (
                        <div className="space-y-6">
                            {/* Example Results Section - News */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                                    <Newspaper size={12} />
                                    {t('navbar.news', 'Yangiliklar')}
                                </h3>
                                <div className="space-y-1">
                                    {/* Placeholder results */}
                                    <Link to="/news/1" onClick={onClose} className="group flex items-center justify-between p-3 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all">
                                        <span className="font-medium text-gray-700 group-hover:text-[#1E3A8A]">Yoshlar ishlari agentligi yangi loyihani taqdim etdi</span>
                                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#1E3A8A]" />
                                    </Link>
                                    <Link to="/news/2" onClick={onClose} className="group flex items-center justify-between p-3 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all">
                                        <span className="font-medium text-gray-700 group-hover:text-[#1E3A8A]">Xalqaro hamkorlik aloqalari kengaymoqda</span>
                                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#1E3A8A]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400 flex justify-end gap-4 uppercase font-bold tracking-wider">
                    <span className="flex items-center gap-1">
                        <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-500">ESC</span> yopish
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
