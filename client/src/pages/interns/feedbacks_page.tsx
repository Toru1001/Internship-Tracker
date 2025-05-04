import FeedbacksCard from "@/components/cards/feedbacks-card"


const FeedbacksPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <span className="text-xl font-semibold mt-5">Feedbacks</span>
      <div className="flex flex-col gap-y-3 mx-10">
      <FeedbacksCard />
      <FeedbacksCard />
      <FeedbacksCard />
      </div>
    </div>
  )
}

export default FeedbacksPage