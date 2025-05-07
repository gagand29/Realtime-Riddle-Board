export type Feedback = {
    id: string
    username: string
    comment: string
    inserted_at: string
    user_id: string // ✅ Add this line
  }
  
  export type UserCard = {
    id: string
    username: string
    emoji: string
  }
  
  export type FeedbackCard = {
    id: string
    text: string
    onSubmit: (comment: string) => void
  }
  