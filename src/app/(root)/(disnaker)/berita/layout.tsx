"use client";

import { PERMISSIONS } from "@/utils/permissions";
import ComponentWithAccess from "@/components/auth/componentWithAccess";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoadingPage from "@/components/ui/LoadingPage"; // Import your custom loading page

interface LayoutKorluhProps {
  children: React.ReactNode;
}

const links = {
  berita: "/berita",
};

const LayoutKorluh = (props: LayoutKorluhProps) => {
  const [permissions, setPermissions] = useState<string[]>([
    PERMISSIONS.semua,
    ...PERMISSIONS.kelolaBerita,
  ]);
  const [loading, setLoading] = useState(true); // Add loading state
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoading(true); // Start loading
    if (pathname.startsWith(links.berita)) {
      setPermissions([PERMISSIONS.semua, ...PERMISSIONS.kelolaBerita]);
    } else {
      // If no matching route, redirect to 404
      router.push("/not-found");
    }

    // Simulate loading time or wait until permissions are updated
    const timeoutId = setTimeout(() => {
      setLoading(false); // Stop loading after 1 second
    }, 500); // Adjust this timeout as necessary

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [pathname, router]);

  if (loading) {
    return <LoadingPage />; // Render the custom loading page while loading
  }

  return (
    <ComponentWithAccess allowPermissions={permissions} toNotFound={true}>
      {props.children}
    </ComponentWithAccess>
  );
};

export default LayoutKorluh;
