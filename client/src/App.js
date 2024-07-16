import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Synth } from './pages/Synth'

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