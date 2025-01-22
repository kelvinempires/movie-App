import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="pl-12 pt-6 pr-4 pb-2 shadow-md fixed z-30 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <img src={logo} alt="logo" className="w-12" />
        <div className="w-full md:w-1/2">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
