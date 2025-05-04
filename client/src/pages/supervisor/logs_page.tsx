import LogsTable from '@/components/logs-table'
import React from 'react'

const LogsPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <span className="text-xl font-semibold mt-5">View Logs</span>
      <LogsTable />
    </div>
  )
}

export default LogsPage