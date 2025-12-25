import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import PageNotFound from './pages/404';
import AdminDashboard from './admin/Dashboard';
import ScrollToTop from "./components/common/ScrollToTop";
import Navbar from './components/common/Navbar';
import AuthPage from "./pages/login.jsx"


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<AuthPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;