import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import type { AuthState } from '../../store/slices/authSlice';
import type { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import GlobalLoader from '../../components/common/GlobalLoader';
import { useLoader } from '../../context/LoaderContext';
import { useEffect } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth as AuthState);
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        showLoader();
        hideLoader();
    }, [showLoader, hideLoader]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(login({ email, password }));
        if (login.fulfilled.match(result)) {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <GlobalLoader />
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-primary p-10 text-white text-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 p-3 shadow-2xl">
                        <img src="/Logo.svg" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Admin Portal</h1>
                    <p className="text-blue-200 font-bold uppercase text-[10px] tracking-widest mt-2 opacity-60">Yoshlar Ishlari Agentligi</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all"
                                placeholder="admin@yoshlar.uz"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Parol</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full pl-10 pr-12 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-sm whitespace-pre-wrap">
                            <AlertCircle size={18} className="flex-shrink-0" />
                            <span>{error.message || 'Login yoki parol xato!'}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 disabled:bg-gray-400"
                    >
                        {loading ? 'Kirilmoqda...' : 'Tizimga kirish'}
                    </button>
                </form>

                <div className="px-8 pb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold rounded-xl transition-all border border-gray-100 flex items-center justify-center gap-2 group"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Saytga qaytish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
