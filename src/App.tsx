import { Routes, Route } from "react-router-dom";
import { LangProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Templates from "@/pages/Templates";

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
          </Route>
          <Route path="*" element={<div className="p-24 text-center text-sm">404 — sahifa topilmadi</div>} />
        </Routes>
      </AuthProvider>
    </LangProvider>
  );
}
