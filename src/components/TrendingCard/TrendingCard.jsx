import PropTypes from "prop-types";
import Rate from "../../assets/rate.svg";
import Player from "../../assets/player.svg";
import "./trendingCard.css";
import { Link } from "react-router-dom";

export const TrendingCard = (props) => {
  const { title, poster, genre, rate, id } = props;

  return (
    <Link to={`/movie/${id}`} className="trendingCard">
      <div
        className="trendingCard_poster"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster})`,
        }}
      >
        <div className="trendingCard_posterInfo">
          <p>
            <img src={Rate} alt="Rate" />
            {rate}
          </p>
        </div>

        <img className="trendingCard_player" src={Player} alt="player" />
      </div>

      <div className="trendingCard_info">
        <p>{title}</p>

        <div className="trendingCard_genre">
          {genre.slice(0, 3).map((value) => (
            <span key={value.id}>{value.name}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

TrendingCard.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genre: PropTypes.array.isRequired,
  rate: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
