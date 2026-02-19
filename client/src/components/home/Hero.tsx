import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../services/api';
import Loader from '../common/Loader';
import { useTranslation } from 'react-i18next';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Hero = () => {
    const [dbSlides, setDbSlides] = useState<any[]>([]); // Store only DB slides
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    // Default slides shown when DB is empty - defined in render scope so they react to 't' changes
    const defaultSlides = [
        {
            _id: 'default-1',
            type: 'image',
            mediaUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=2000&q=80',
            title: t('home.hero_default_1_title'),
            subtitle: t('home.hero_default_1_subtitle'),
            order: 0
        },
        {
            _id: 'default-2',
            type: 'video',
            mediaUrl: 'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
            title: t('home.hero_default_2_title'),
            subtitle: t('home.hero_default_2_subtitle'),
            order: 1
        },
        {
            _id: 'default-3',
            type: 'image',
            mediaUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80',
            title: t('home.hero_default_3_title'),
            subtitle: t('home.hero_default_3_subtitle'),
            order: 2
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const settingsRes = await api.get('/settings');
                const settings = settingsRes.data;

                if (settings?.heroSlides && settings.heroSlides.length > 0) {
                    setDbSlides(settings.heroSlides);
                }
            } catch (err) {
                console.error('Hero data fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const baseUrl = (api.defaults.baseURL || '').replace('/api', '');

    if (loading) return <div className="h-[600px] lg:h-[750px] bg-gray-50 flex items-center justify-center"><Loader /></div>;

    // Determine which slides to show: DB slides if exist, otherwise localized defaults
    const slides = dbSlides.length > 0 ? dbSlides : defaultSlides;

    if (slides.length > 0) {
        return (
            <section className="relative w-full h-[600px] lg:h-[750px] group">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    effect="fade"
                    navigation={{
                        prevEl: '.hero-prev',
                        nextEl: '.hero-next',
                    }}
                    pagination={{
                        clickable: true,
                        renderBullet: (_, className) => {
                            return `<span class="${className} !bg-white !w-3 !h-3 !opacity-50 hover:!opacity-100"></span>`;
                        }
                    }}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    loop={slides.length > 1}
                    className="w-full h-full"
                >
                    {slides.map((slide, i) => {
                        const mediaSrc = slide.mediaUrl.startsWith('http')
                            ? slide.mediaUrl
                            : `${baseUrl}${slide.mediaUrl}`;

                        return (
                            <SwiperSlide key={slide._id || i} className="relative">
                                {/* Background Media */}
                                {slide.type === 'video' ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                    >
                                        <source src={mediaSrc} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={mediaSrc}
                                        alt={slide.title || 'Hero'}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 z-10" />

                                {/* Content */}
                                <div className="absolute bottom-12 left-6 lg:bottom-16 lg:left-24 max-w-4xl text-white z-20">
                                    {slide.title && (
                                        <h2 className="text-2xl md:text-4xl lg:text-6xl font-black uppercase leading-[1.1] tracking-tighter mb-4 lg:mb-6 drop-shadow-2xl">
                                            {slide.title}
                                        </h2>
                                    )}
                                    {slide.subtitle && (
                                        <p className="text-base lg:text-xl font-medium text-white/80 mb-10 drop-shadow-lg max-w-2xl">
                                            {slide.subtitle}
                                        </p>
                                    )}

                                    <div className="flex items-end gap-8">
                                        {/* Slide indicator */}
                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-sm">
                                            <span className="text-[42px] font-black leading-none">{String(i + 1).padStart(2, '0')}</span>
                                            <span className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] block mt-1">/ {String(slides.length).padStart(2, '0')}</span>
                                        </div>

                                        <div className="flex gap-2 pb-2">
                                            <button className="hero-prev w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center rounded-sm">
                                                <ChevronLeft size={22} />
                                            </button>
                                            <button className="hero-next w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center rounded-sm">
                                                <ChevronRight size={22} />
                                            </button>
                                        </div>
                                    </div>
                                </div>


                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </section>
        );
    }

    // No slides at all — should never happen with defaults, but just in case
    return null;
};

export default Hero;
