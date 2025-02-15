import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";
// import Header from "./components/NavBar";
import Footer from "./components/Footer";
import WatchNow from "./pages/watchNow";
// import SideBar from "./components/SideBar";

const App = () => {
  return (
    <div className="text-[#e2e2e2] bg h-full flex flex-col ">
      <div className="flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<MovieDetails />} />
          <Route path="/watch-movie/:id" element={<WatchNow />} />
          <Route path="/watch-tv/:id" element={<WatchNow />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
