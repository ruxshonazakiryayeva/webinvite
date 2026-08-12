import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <div className="grid min-h-screen place-items-center" style={{ background: "var(--bg)", color: "var(--ink)" }}>
            <div className="text-center">
              <p className="font-display text-4xl">WebInvite</p>
              <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>premium taklifnomalar — tez orada</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
