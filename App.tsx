import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AskFatwaPage from './pages/AskFatwaPage';
import FatwaDetailPage from './pages/FatwaDetailPage';
import MuftiPanelPage from './pages/MuftiPanelPage';
import AiSearchPage from './pages/AiSearchPage';
import UserAuthPage from './pages/UserAuthPage';
import { AppProvider } from './context/AppContext';

// A simple component to restore scroll position on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
          <ScrollToTop />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/ask" element={<AskFatwaPage />} />
              <Route path="/fatwa/:id" element={<FatwaDetailPage />} />
              <Route path="/mufti-login" element={<MuftiPanelPage />} />
              <Route path="/mufti-panel" element={<MuftiPanelPage />} />
              <Route path="/user-auth" element={<UserAuthPage />} />
              <Route path="/ai-search" element={<AiSearchPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;