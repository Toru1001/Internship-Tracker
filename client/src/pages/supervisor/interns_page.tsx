import InternsTable from '@/components/interns-table'

const InternsPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <span className="text-xl font-semibold mt-5">Interns</span>
      <InternsTable />
    </div>
  )
}

export default InternsPage