import { UnstyledButton } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons";
import UserMenu from "./UserMenu";

const Header: React.FC = () => {
  function toggleSidebar() {
    const isExpanded = document
      .querySelector("body")
      ?.classList.contains("sidebar-expanded");
    if (isExpanded) {
      return document
        .querySelector("body")!
        .classList.remove("sidebar-expanded");
    }

    document.querySelector("body")!.classList.add("sidebar-expanded");
  }

  return (
    <header className="sticky bg-white shadow top-0 z-20 w-full">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:pr-8 lg:pl-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <UnstyledButton
              id="header"
              className="text-gray-600 hover:text-gray-700 transition-colors lg:hidden"
              aria-controls="sidebar"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <IconMenu2 className="w-6 h-6 fill-current" />
            </UnstyledButton>
            <img src="/logo.png" alt="" className="h-11 lg:hidden pl-2 pr-3" />
            <div className="text-orange-400 text-base md:text-[25px] font-semibold ">
              SISTEM INFORMASI <br className="md:hidden " /> KERJASAMA
            </div>
          </div>

          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
