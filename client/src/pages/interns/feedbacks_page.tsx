import FeedbacksCard from "@/components/cards/feedbacks-card"
import { FeedbackData } from "@/components/model/datamodel";
import { getFeedbacks } from "@/lib/getData";
import { useEffect, useState } from "react"


const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]> ([]);

  useEffect ( () => {
    const fetchFeedbacks = async () => {
      try{
        const response = await getFeedbacks();
        const data = response.data.map((feedback:any) => ({
          log_id: feedback.log_id?.log_id,
          feedback_id: feedback.feedback_id,
          supervisor_name: feedback.log_id?.internship_id?.supervisor_id?.name,
          feedback: feedback.comments,
          date: feedback.date_given,
          status: feedback.task_status,
          actual_status: feedback.log_id?.status,
          title: feedback.log_id?.task_id?.title,
          description: feedback.log_id?.task_id?.task_description,
          start_time: feedback.log_id?.task_id?.start_time,
          end_time: feedback.log_id?.task_id?.end_time,
          date_logged: feedback.log_id?.task_id?.date_logged,
          task_id: feedback.log_id?.task_id?.task_id,
          start_proof: feedback.log_id?.task_id?.start_proof,
          end_proof: feedback.log_id?.task_id?.end_proof
        }))
        console.log(data);
        setFeedbacks(data);
      }catch (error) {
        console.error("Failed to fetch interns data:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <span className="text-xl font-semibold mt-5">Feedbacks</span>
      <div className="flex flex-col gap-y-3 mx-10">
      {feedbacks.length > 0 ? (
          feedbacks.map((comments: FeedbackData) => (
            <FeedbacksCard key={comments.feedback_id} data={comments} />
          ))
        ) : (
          <div className="flex w-full justify-center items-center h-100">
            <span>No Feedbacks Found.</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbacksPage