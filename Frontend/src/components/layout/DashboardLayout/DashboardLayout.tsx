import { Suspense, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarNavigation } from "types/navigation";
import { useAuth } from "features/auth";

import { Center, Loader } from "@mantine/core";
import Header from "./Header";
import { Sidebar } from "components/navigation";
import {
  IconArticle,
  IconBuildingStore,
  IconLayout,
  IconPackage,
  IconTag,
  IconUser,
} from "@tabler/icons";

const LoadingScreen = () => (
  <Center className="w-full h-full bg-body">
    <Loader color="orange" />
  </Center>
);

const navigations: SidebarNavigation = [
  {
    routes: [
      { title: "Dashboard", value: "dashboard", href: "/", icon: IconLayout },
      {
        title: "Kerjasama",
        icon: IconArticle,
        href: "group",
        routes: [
          {
            title: "PKS",
            value: "kerjasama",
            href: "/kerjasama",
            icon: IconArticle,
          },
          {
            title: "Implementasi",
            value: "implementasi",
            href: "/implementasi",
            icon: IconArticle,
          },
        ],
      },
      {
        title: "User",
        icon: IconUser,
        href: "group",
        routes: [
          {
            title: "Role Management",
            value: "role",
            href: "/role",
            icon: IconArticle,
          },
          {
            title: "User Management",
            value: "user",
            href: "/user",
            icon: IconTag,
          },
        ],
      },
      {
        title: "Data Master",
        icon: IconPackage,
        href: "group",
        routes: [
          {
            title: "Fakultas",
            value: "fakultas",
            href: "/fakultas",
            icon: IconBuildingStore,
          },
          {
            title: "Prodi",
            value: "prodi",
            href: "/prodi",
            icon: IconBuildingStore,
          },
          {
            title: "Dekan",
            value: "dekan",
            href: "/dekan",
            icon: IconPackage,
          },
          {
            title: "Contact",
            value: "penghubung",
            href: "/penghubung",
            icon: IconPackage,
          },
          {
            title: "Type",
            value: "jenis",
            href: "/type",
            icon: IconPackage,
          },
          {
            title: "Organization",
            value: "organisasi",
            href: "/organization",
            icon: IconPackage,
          },
          {
            title: "Dosen",
            value: "dosen",
            href: "/dosen",
            icon: IconPackage,
          },
        ],
      },
    ],
  },
];

const filterNavigations = (navData: any, accessPages: any) => {
  return navData.map((navGroup: any) => {
    const filteredRoutes = navGroup.routes
      .map((route: any) => {
        let updatedRoute = { ...route }; // Buat salinan rute asli

        if (updatedRoute.routes) {
          const newRoutes = [...updatedRoute.routes]; // Salinan daftar sub-rute
          const filteredSubRoutes = newRoutes.filter((subRoute) =>
            accessPages.includes(subRoute.value)
          );

          if (filteredSubRoutes.length > 0) {
            updatedRoute.routes = filteredSubRoutes; // Hanya terapkan sub-rute yang valid
          } else {
            delete updatedRoute.routes; // Hapus rute jika kosong
          }
        }

        return accessPages.includes(updatedRoute.value) ||
          (updatedRoute.routes && updatedRoute.routes.length > 0)
          ? updatedRoute
          : null; // Kembalikan rute hanya jika memiliki izin akses atau sub-rute yang valid
      })
      .filter(Boolean); // Hapus elemen null (jika rute kosong)

    return {
      ...navGroup,
      routes: filteredRoutes,
    };
  });
};

const DashboardLayout: React.FC = () => {
  const { creds } = useAuth();
  const [filteredNavigationss, setFilteredNavigations] = useState<any>([]);

  useEffect(() => {
    if (creds) {
      let navData = navigations;

      const accessPages = Array.isArray(creds?.access_page)
        ? creds.access_page
        : [];
      setFilteredNavigations(filterNavigations(navData, accessPages));
    }
  }, [creds]);

  if (!creds) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar navigations={filteredNavigationss} />
      <div
        className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-[#F2F2F2]"
        id="content"
      >
        <Header />

        <Suspense fallback={<LoadingScreen />}>
          <div className="px-5 sm:px-10 lg:px-5 py-3 pb-14 w-full max-w-8xl mx-auto">
            <Outlet />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardLayout;
