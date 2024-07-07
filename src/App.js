import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Synth } from './pages/Synth'
import { About } from "./pages/About";
import { NoPage } from "./pages/NoPage";
import { Analytics } from "@vercel/analytics/react"

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Synth />} />
          <Route path="/home" element={<Synth />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      {/* Vercel Analytics */}
      <Analytics /> 
    </div>
  )
}