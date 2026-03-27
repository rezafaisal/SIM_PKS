import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconChevronRight } from "@tabler/icons";
import { UnstyledButton } from "@mantine/core";
import styles from "./Sidebar.module.css";

type LinkProps = {
  href: string;
  title: string;
};

type Props = {
  title: string;
  href: string;
  routes?: {
    title: string;
    href: string;
    icon: React.FC<any>;
  }[];
  icon: React.FC<any>;
  isActive: boolean;
  onToggle: () => void;
  expandSidebar: () => void;
};

const SidebarList: React.FC<LinkProps> = ({ href, title }) => {
  const location = useLocation();
  const active = href === location.pathname;

  return (
    <li className="last:mb-1 ">
      <Link
        to={href}
        className="hover:text-gray-700 w-full font-semibold text-sm px-4 py-2.5 rounded mb-0.5 last:mb-0 hover:bg-gray-50 hover:bg-opacity-80 transition duration-150 truncate flex items-center"
      >
        <div className="w-5 h-5 shrink-0 leading-none flex items-center justify-center">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              active ? "bg-orange-600 ring-2 ring-orange-200" : " bg-gray-200"
            }`}
          ></div>
        </div>
        <span className="ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ">
          {title}
        </span>
      </Link>
    </li>
  );
};

export const SidebarLinkGroup: React.FC<Props> = ({
  title,
  icon,
  routes,
  isActive,
  onToggle,
  expandSidebar,
}) => {
  const location = useLocation();
  const accordion = useRef<HTMLUListElement>(null);
  const Icon = icon;

  const activeLink = () => {
    let cond = false;
    routes?.forEach((item) => {
      if (item.href === location.pathname) {
        cond = true;
      }
    });
    return cond;
  };

  useEffect(() => {
    const element = accordion.current!;
    const isExpanded = document
      .querySelector("body")
      ?.classList.contains("sidebar-expanded");

    if (isActive) {
      if (isExpanded) {
        element.style.maxHeight = `${element.scrollHeight}px`;
      } else {
        element.style.maxHeight = "0";
      }
    } else {
      element.style.maxHeight = "0";
    }
  }, [isActive]);

  const handleToggle = () => {
    const element = accordion.current!;
    const isExpanded = document
      .querySelector("body")
      ?.classList.contains("sidebar-expanded");

    if (!isExpanded) {
      expandSidebar();
    }

    onToggle();
  };

  return (
    <li className="relative list-none">
      <UnstyledButton
        onClick={handleToggle}
        className={`${styles["sidebar-link"]} ${
          activeLink()
            ? styles["sidebar-link-active"]
            : isActive
            ? "bg-gray-200"
            : ""
        } w-full justify-between`}
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 shrink-0 leading-none transition" />
          <span className="ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 transition duration-200">
            {title}
          </span>
        </div>
        <div className="flex shrink-0 ml-2">
          <IconChevronRight
            className={`w-3 h-3 duration-300 shrink-0 ml-1 transition ${
              isActive && "rotate-90"
            }`}
          />
        </div>
      </UnstyledButton>
      <ul
        ref={accordion}
        className="overflow-hidden list-none pl-6 transition-all ease-in-out duration-300 max-h-0 mb-0"
      >
        {routes?.map((item) => (
          <SidebarList {...item} key={item.title} />
        ))}
      </ul>
    </li>
  );
};
