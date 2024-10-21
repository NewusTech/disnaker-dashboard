"use client"
import React from 'react'
import DashboardDisnaker from '@/components/Dashboard/Disnaker';
import DashboardInstansi from '@/components/Dashboard/Instansi';
import ComponentWithAccess from '@/components/auth/componentWithAccess';
import { PERMISSIONS } from '@/utils/permissions';

const Dashboard = () => {

  return (
    <div>
      <ComponentWithAccess
        allowPermissions={[
          PERMISSIONS.semua,
          ...PERMISSIONS.kelolaDashboard
        ]}
      >
        <DashboardDisnaker />
      </ComponentWithAccess>
      {/*  */}
      <ComponentWithAccess
        allowPermissions={[
          ...PERMISSIONS.company
        ]}
      >
        <DashboardInstansi />
      </ComponentWithAccess>
    </div>
  )
}

export default Dashboard