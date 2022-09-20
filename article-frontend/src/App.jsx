import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ViewArticle from "./components/ViewArticle";
import NoPage from "./components/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/article/:id" element={<ViewArticle />}/>
        <Route path="/articles" element={<Home />}/>
          <Route index element={<Layout />} />
          <Route exact path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
