import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GlobalLoader from '../components/common/GlobalLoader';
import { useLoader } from '../context/LoaderContext';

const MainLayout = () => {
    const location = useLocation();
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        showLoader();
        // The context/min-duration logic in LoaderContext will handle the delay
        hideLoader();

        // Scroll to top on route change
        window.scrollTo(0, 0);
    }, [location.pathname, showLoader, hideLoader]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <GlobalLoader />
            <Navbar />
            <main className="flex-grow pt-[80px]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
