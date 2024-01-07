import { MainPage } from "./pages/MainPage/MainPage";
import { MoviePage } from "./pages/MoviePage/MoviePage";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/error/NotFound";

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/movie/:id' element={<MoviePage />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default App;
