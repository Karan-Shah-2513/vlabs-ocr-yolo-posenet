import "./App.css";
import { Routes, Route } from "react-router-dom";
import OCRsim from "./pages/OCR";
import YoloSim from "./pages/YOLO";
import PosenetSim from "./pages/Posenet";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/ocr" element={<OCRsim />} />
          <Route path="/yolo" element={<YoloSim />} />
          <Route path="/posenet" element={<PosenetSim />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
