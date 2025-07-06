import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Skills from "./components/Skills";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import CategoryGallery from "./Pages/CategoryGallery";
import AdminPanel from "./Pages/AdminPanel";
import Login from "./Pages/Login";
import ScrollToTop from "./components/ScrollToTop";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <main className="overflow-x-hidden bg-black tracking-tighter text-gray-200 antialiased">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
              <About />
              <Gallery />
              <Skills />
              <ContactForm />
              <Footer />
            </>
          }
        />
        <Route path="/gallery/:slug" element={<><CategoryGallery /><Footer /></>} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
