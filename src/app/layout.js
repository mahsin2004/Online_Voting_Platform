
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/Authproviders";
import { TanstackQueryClient } from "@/Component/TanStackQueryClient";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <div className="min-h-screen flex flex-col justify-between">
          <AuthProvider>
            <TanstackQueryClient>
              {children}
            </TanstackQueryClient>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
