export interface RouteConfig {
  path: string;
  label: string;
  isActive: boolean;
}

export const routeConfig: RouteConfig[] = [
  {
    path: "/",
    label: "Home",
    isActive: false,
  },
  {
    path: "/kategori",
    label: "Kategori",
    isActive: false,
  },
  {
    path: "/lapangan",
    label: "Lapangan",
    isActive: false,
  },
  {
    path: "/about-us",
    label: "About Us",
    isActive: false,
  },
];
