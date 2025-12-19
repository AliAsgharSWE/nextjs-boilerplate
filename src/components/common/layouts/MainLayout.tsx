import { FC, ReactNode } from "react";
import Header from "@/src/components/navigation/Header";
import Footer from "@/src/components/navigation/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
