import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Phone, Mail } from 'lucide-react';

const Footer = () => {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/settings');
                setSettings(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="bg-white py-12 border-t border-gray-100">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 pb-8 border-b border-gray-50">
                    <div className="flex items-center gap-4">
                        <img
                            src="/Logo.svg"
                            alt="Logo"
                            className="w-10 h-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
                        />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                Rasmiy veb-portal
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#1E3A8A]"><Phone size={14} /></div>
                            <span className="text-[11px] font-black text-gray-500 uppercase tracking-tight">{settings?.contact.phone || '+998 76 224-24-24'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#1E3A8A]"><Mail size={14} /></div>
                            <span className="text-[11px] font-black text-gray-500 uppercase tracking-tight">{settings?.contact.email || 'termiz@yoshlar.uz'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <Link to="/about" className="hover:text-black transition-colors">SAYT HAQIDA</Link>
                        <Link to="/apply" className="hover:text-black transition-colors">QAYTA ALOQA</Link>
                        <Link to="/news" className="hover:text-black transition-colors">MATBUOT XIZMATI</Link>
                        <Link to="/documents" className="hover:text-black transition-colors">RASMIY HUJJATLAR</Link>
                    </div>

                    <div className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">
                        &copy; 2026 BARCHA HUQUQLAR HIMOYALANGAN
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
