import { FC } from "react";
import Link from "next/link";
import { routes } from "@/src/constants/routes";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href={routes.ABOUT.path} className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={routes.CONTACT.path} className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href={routes.HOME.path} className="hover:underline">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Email: contact@example.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {currentYear} Next.js Boilerplate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

