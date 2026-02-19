import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Documents from './pages/Documents';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Application from './pages/Application';
import Leadership from './pages/Leadership';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminNews from './pages/admin/AdminNews';
import AdminDocuments from './pages/admin/AdminDocuments';
import AdminProjects from './pages/admin/AdminProjects';
import AdminApplications from './pages/admin/AdminApplications';
import AdminSettings from './pages/admin/AdminSettings';
import { ToastProvider } from './context/ToastContext';
import { LoaderProvider } from './context/LoaderContext';

function App() {
  return (
    <LoaderProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="news" element={<News />} />
              <Route path="news/:slug" element={<NewsDetail />} />
              <Route path="documents" element={<Documents />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="leadership" element={<Leadership />} />
              <Route path="apply" element={<Application />} />
            </Route>

            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="documents" element={<AdminDocuments />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </LoaderProvider>
  );
}

export default App;
