import logo from "../../../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-[#7030A0] to-purple-600 p-2 rounded-lg mr-3">
              <img src={logo} alt="Logo" className="h-6 w-6 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">The Boom</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
