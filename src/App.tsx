import { Routes, Route } from "react-router-dom";
import { LangProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Templates from "@/pages/Templates";
import PreviewFrame from "@/pages/PreviewFrame";
import InvitePage from "@/pages/Invite";
import Create from "@/pages/Create";
import My from "@/pages/My";
import Admin from "@/pages/Admin";

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/create/:templateId" element={<Create />} />
            <Route path="/my" element={<My />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/templates/:id/preview-frame" element={<PreviewFrame />} />
          <Route path="/i/:slug" element={<InvitePage />} />
          <Route path="/invite/:slug" element={<InvitePage />} />
          <Route path="*" element={<div className="p-24 text-center text-sm">404 — sahifa topilmadi</div>} />
        </Routes>
      </AuthProvider>
    </LangProvider>
  );
}
