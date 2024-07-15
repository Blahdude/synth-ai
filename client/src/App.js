import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Synth } from './pages/Synth'
import { NoPage } from "./pages/NoPage";
import { Analytics } from "@vercel/analytics/react"

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Synth />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}