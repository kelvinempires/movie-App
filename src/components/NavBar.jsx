import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="hidden md:inline pl-12 pt-6 pr-4 pb-2 shadow-md  fixed z-30 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-12" />
          <span className="hidden md:inline text-xl font-bold bg-gradient-to-r from-[#0092dd] via-[rgb(132,193,37)] to-[#d9241b] bg-clip-text text-transparent">
            peepMovie
          </span>
        </div>
        <div className="w-full md:w-1/2">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
