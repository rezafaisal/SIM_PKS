import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

type Props = {
  href: string;
  title: string;
  icon: React.FC<any>;
};

export const SidebarLink: React.FC<Props> = ({ href, title, icon }) => {
  const location = useLocation();
  const Icon = icon;

  const active =
    href == "/"
      ? location.pathname == href
      : new RegExp(`${href}/*`, "gi").test(location.pathname);

  return (
    <div className="relative pb-3">
      <Link
        to={href}
        className={`${styles["sidebar-link"]} ${
          active && styles["sidebar-link-active"]
        }`}
      >
        <Icon className="w-5 h-5 shrink-0 leading-none" />
        <span className="ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
          {title}
        </span>
      </Link>
    </div>
  );
};
