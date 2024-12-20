import { useUser } from "@/contexts/UserContext";
import { Button, Dropdown, DropdownItem, Transition } from "@windmill/react-ui";
import { useState } from "react";
import { LogOut, User } from "react-feather";
import { Link, useLocation } from "react-router";

export default function Nav() {
  const { userData, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = useLocation().pathname;

  return (
    <nav className="flex items-center justify-between px-2 lg:px-36 py-2 shadow-lg fixed w-full bg-white top-0 z-10">
      <Link
        to="/"
        className="text-gray-700 text-2xl font-bold dark:text-gray-400"
      >
        <h1>PERN Admin</h1>
      </Link>

      <ul className="flex space-x-4">
        <li className="relative">
          <Link to="/users" className="flex">
            <Button layout={pathname.includes("/users") && "primary"}>
              Users
            </Button>
          </Link>
        </li>
        <li className="relative">
          <Link to="/products" className="flex">
            <Button layout={pathname.includes("/products") && "primary"}>
              Products
            </Button>
          </Link>
        </li>
        <li className="relative">
          <Link to="/orders" className="flex">
            <Button layout={pathname.includes("/orders") && "primary"}>
              Orders
            </Button>
          </Link>
        </li>
        <li className="relative">
          <Button
            layout="link"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="lg:block hidden">Account</span>
            <User className="lg:hidden" />
          </Button>
          <Transition
            show={isDropdownOpen}
            enter="transition ease-out duration-150 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dropdown align="right" isOpen={isDropdownOpen} className="z-10">
              <DropdownItem className="cursor-not-allowed text-gray-400 border-b flex flex-col items-start justify-start">
                <p className="self-start">
                  {userData?.fullname?.split(" ").join(" ")}
                </p>
                <p className="self-start">@{userData?.username}</p>
              </DropdownItem>
              <DropdownItem tag="a">
                <Link className="w-full" to="/profile">
                  Profile
                </Link>
              </DropdownItem>

              <DropdownItem tag="a" className="border-t">
                <Link className="w-full" onClick={() => logout()} to="/login">
                  <Button iconRight={LogOut} block>
                    Logout
                  </Button>
                </Link>
              </DropdownItem>
            </Dropdown>
          </Transition>
        </li>
      </ul>
    </nav>
  );
}
