import { Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { AlgorithmDetail } from "./pages/AlgorithmDetail";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/algo/:slug" element={<AlgorithmDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
