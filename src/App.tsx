import { BrowserRouter } from "react-router-dom";
import "reset-css/reset.css";
import "./App.css";
import PageRoutes from "./router";

function App() {
  return (
    <>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
