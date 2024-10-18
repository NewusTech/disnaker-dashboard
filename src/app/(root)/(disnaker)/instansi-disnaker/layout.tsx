"use client";

import { PERMISSIONS } from "@/utils/permissions";
import ComponentWithAccess from "@/components/auth/componentWithAccess";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoadingPage from "@/components/ui/LoadingPage";

interface LayoutPermissionProps {
  children: React.ReactNode;
}

const links = {
  instansi: "/instansi-disnaker",
};

const LayoutPermission = (props: LayoutPermissionProps) => {
  const [permissions, setPermissions] = useState<string[]>([
    PERMISSIONS.semua,
    ...PERMISSIONS.kelolaInstansi,
    ...PERMISSIONS.company,
  ]);
  const [loading, setLoading] = useState(true); // Add loading state
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoading(true); // Start loading when pathname changes

    if (pathname.startsWith(links.instansi)) {
      setPermissions([PERMISSIONS.semua, ...PERMISSIONS.kelolaInstansi, ...PERMISSIONS.company]);
    } else {
      // Redirect to 404 if the route doesn't match
      router.push("/not-found");
    }

    // Simulate loading time or wait until permissions are updated
    const timeoutId = setTimeout(() => {
      setLoading(false); // End loading after 1 second
    }, 500);

    // Cleanup timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [pathname, router]);

  if (loading) {
    return <LoadingPage />; // Render loading page while loading
  }

  return (
    <ComponentWithAccess allowPermissions={permissions} toNotFound={true}>
      {props.children}
    </ComponentWithAccess>
  );
};

export default LayoutPermission;
