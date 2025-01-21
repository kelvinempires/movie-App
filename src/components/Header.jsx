import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="py-6 px-4 shadow-md fixed z-30 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          MovieApp
        </h1>
        <div className="w-full md:w-1/2">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
