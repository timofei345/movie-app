import "./completedComment.css";
import Photo2 from "../../assets/photo2.svg";
import Like from "../../assets/like.svg";
import Dislike from "../../assets/dislike.svg";

export const CompletedComment = () => {
  return (
    <div className="completedComment">
      <img src={Photo2} alt="avatar2" />
      <div className="completedComment_info">
        <p>Arlene</p>
        <p>12/06/2020</p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo con
        </p>

        <div className="evaluation">
          <span> <img src={Like} alt="like" /> 10</span>
           <span><img src={Dislike} alt="dislike" /> 2</span>
          <p>reply</p>
        </div>
      </div>
    </div>
  );
};
