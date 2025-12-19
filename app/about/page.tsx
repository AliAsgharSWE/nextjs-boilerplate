import { Metadata } from "next";
import { routes } from "@/src/constants/routes";

export const metadata: Metadata = {
  title: routes.ABOUT.metaTitle,
  description: routes.ABOUT.description,
  alternates: {
    canonical: routes.ABOUT.path,
  },
};

export { default } from "@/src/containers/about";
