import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <div className="grid min-h-screen place-items-center bg-[hsl(40,22%,6%)] text-[hsl(43,47%,90%)]">
            <div className="text-center">
              <p className="font-display text-4xl">WebInvite</p>
              <p className="mt-3 text-sm opacity-70">premium taklifnomalar — tez orada</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
