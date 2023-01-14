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
          <Route path="/vlabs-ocr-yolo-posenet/ocr" element={<OCRsim />} />
          <Route path="/vlabs-ocr-yolo-posenet/yolo" element={<YoloSim />} />
          <Route
            path="/vlabs-ocr-yolo-posenet/posenet"
            element={<PosenetSim />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
