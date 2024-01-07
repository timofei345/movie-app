import "./commendCard.css"
import Photo1 from "../../assets/photo1.svg"

export const CommentCard = () => {
  return (
    <div className="commentCard">
        <img src={Photo1} alt="photo1" />
        
        <div className="input_block">
        <label>James</label>
        <input type="text" placeholder="Write your comments here..." />
        </div>
    </div>
  )
}
