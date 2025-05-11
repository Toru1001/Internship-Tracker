import ArchivesTable from '@/components/archives-table'

const ArchivesPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <span className="text-xl font-semibold mt-5">View Logs</span>
      <ArchivesTable />
    </div>
  )
}

export default ArchivesPage