import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { profile } from "@/data/profile";

const FOOTER_LINK_NAMES = ["ORCID", "Google Scholar", "LinkedIn", "GitHub"];
const footerLinks = profile.links.filter((link) =>
  FOOTER_LINK_NAMES.includes(link.name),
);

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar variant="floating" />
      <SidebarInset className="min-h-screen">
        <SidebarTrigger className="fixed left-3 top-3 md:hidden z-5" />

        <div className="px-6 sm:px-12 py-24 grow">
          <Outlet />
        </div>

        <footer className="w-full border-t py-5 px-6 sm:px-12 text-sm text-muted-foreground">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span className="flex flex-wrap gap-x-3">
              {footerLinks.map((item, index) => (
                <span key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground hover:underline underline-offset-4"
                  >
                    {item.name}
                  </a>
                  {index < footerLinks.length - 1 && " ·"}
                </span>
              ))}
            </span>
          </div>

          {/* I would really appreciate it if you could keep this credit to preserve attribution. Thank you! */}
          <div className="text-xs text-center mt-3">
            Created by
            <Button asChild variant="link" className="p-0 ml-1 h-auto text-xs">
              <a
                href="https://github.com/pm25/showlit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Showlit Template
              </a>
            </Button>
          </div>
        </footer>

        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
