"use client";

import { PERMISSIONS } from "@/utils/permissions";
import ComponentWithAccess from "@/components/auth/componentWithAccess";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoadingPage from "@/components/ui/LoadingPage"; // Import your custom LoadingPage component

interface LayoutPermissionProps {
  children: React.ReactNode;
}

const links = {
  dashboard: "/dashboard",
};

const LayoutPermission = (props: LayoutPermissionProps) => {
  const [permissions, setPermissions] = useState<string[]>([
    PERMISSIONS.semua,
    ...PERMISSIONS.kelolaDashboard,
  ]);
  const [loading, setLoading] = useState(true); // Add loading state
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoading(true); // Start loading
    if (pathname.startsWith(links.dashboard)) {
      setPermissions([PERMISSIONS.semua, ...PERMISSIONS.company, ...PERMISSIONS.kelolaDashboard]);
    } else {
      // If no matching route, redirect to 404
      router.push("/not-found");
    }

    // Simulate loading time or wait until permissions are updated
    const timeoutId = setTimeout(() => {
      setLoading(false); // Stop loading after the timeout
    }, 500); // Adjust this timeout as necessary

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [pathname, router]);

  if (loading) {
    return <LoadingPage />; // Render the custom LoadingPage component while loading
  }

  return (
    <ComponentWithAccess allowPermissions={permissions} toNotFound={true}>
      {props.children}
    </ComponentWithAccess>
  );
};

export default LayoutPermission;
