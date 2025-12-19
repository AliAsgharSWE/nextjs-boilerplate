import { Metadata } from "next";
import { routes } from "@/src/constants/routes";

export const metadata: Metadata = {
  title: routes.HOME.metaTitle,
  description: routes.HOME.description,
  alternates: {
    canonical: routes.HOME.path,
  },
};

export { default } from "@/src/containers/home";
