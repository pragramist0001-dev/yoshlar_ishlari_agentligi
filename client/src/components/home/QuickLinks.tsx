import { FileText, Send, UserCheck, TrendingUp, Gavel, Award } from 'lucide-react';

const QuickLinks = () => {
    const services = [
        { title: "Murojaat yuborish", icon: <Send size={24} />, color: "bg-blue-600" },
        { title: "Grantlar va yordam", icon: <Award size={24} />, color: "bg-green-600" },
        { title: "Hujjatlar bazasi", icon: <FileText size={24} />, color: "bg-indigo-600" },
        { title: "Faoliyat statistikasi", icon: <TrendingUp size={24} />, color: "bg-orange-600" },
        { title: "Qarorlar va qonunlar", icon: <Gavel size={24} />, color: "bg-red-600" },
        { title: "Yoshlar reyestri", icon: <UserCheck size={24} />, color: "bg-teal-600" },
    ];

    return (
        <section className="bg-white py-12 border-b border-gray-100">
            <div className="gov-container">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {services.map((service, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-6 border border-gray-100 rounded hover:border-[#1E3A8A] hover:bg-gray-50 transition-all group cursor-pointer">
                            <div className={`w-12 h-12 ${service.color} text-white rounded flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                                {service.icon}
                            </div>
                            <span className="text-[11px] font-bold uppercase text-gray-600 tracking-tighter leading-tight group-hover:text-[#1E3A8A]">
                                {service.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickLinks;
