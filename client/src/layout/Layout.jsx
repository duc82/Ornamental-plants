import Nav from "components/Nav";
import Spinner from "components/Spinner";
import { Helmet } from "react-helmet-async";

const Layout = ({ children, title, loading }) => {
  return (
    <>
      <Helmet>
        <title>{title ?? "Home"} | PERN Store </title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Nav />
        {loading ? (
          <>
            <Spinner size={100} loading />
          </>
        ) : (
          <div className="text-gray-700 mt-16 mx-auto px-2 lg:px-56 flex-grow h-full w-full">
            <main className="h-full">{children}</main>
          </div>
        )}

        <footer className="mt-auto flex justify-center py-2">
          <p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
            &copy; {new Date().getFullYear()} PERN Store —
            <a
              href="https://github.com/duc82"
              className="text-gray-500 ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              @duc82
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
