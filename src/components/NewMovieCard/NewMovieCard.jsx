import PropTypes from 'prop-types';
import "./NewMovieCard.css"
import { Link } from 'react-router-dom';

export const NewMovieCard = (props) => {
  const { title, poster, id } = props;


  return (
       <Link to={`/movie/${id}`} className='NewMovieCard'>
        <img className="NewMovieCard_poster" src={`http://image.tmdb.org/t/p/w500/${poster}`} alt="poster" />

        <div className="NewMovieCard_info">
        <p>{title}
    </p>
        <div className="NewMovieCard_tags">
        <span className="NewMovieCard_HD">HD</span>

        </div>


        </div>
       </Link>
  )
}

NewMovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired
};