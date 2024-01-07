import "./moviePage.css";
import Diary from "../../assets/calendarik.svg";
import Duration from "../../assets/duration.svg";
import Rate from "../../assets/rate.svg";

import flagRu from "../../assets/flagRU.webp";
import flagUK from "../../assets/flagUK.png";

import { Header } from "../../components/header/Header";
import { useEffect, useState } from "react";
import { getMovie } from "../../api/api_requests";
import { useParams } from "react-router-dom";
import { formatNumberAbbreviation } from "../../utils/convertNumber";
import ReactPlayer from "react-player";
import { MoviePlayer } from "../../components/MoviePlayer/MoviePlayer";

export const MoviePage = () => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [prodCountry, setProdCountry] = useState([]);
  const [budget, setBudget] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    getMovie(id).then((res) => {
      setData(res);
      setGenres(res.genres);
      setProdCountry(res.production_countries);
      setBudget(res.budget);
      setRevenue(res.revenue);
    });
  }, [setData, id, setBudget, setRevenue]);

  return (
    <>
      <Header />
      <section className="moviePage">
        <div className="playerContainer"></div>

        <div className="moviePageInfo">
          <div className="moviePage_poster">
            <img
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            />
          </div>

          <div className="movieInnerText">
            <div className="movieInnerTitle">
              <h1>{data.title}</h1>
              <div className="movieInnerLanguage">
                <button>
                  <img src={flagRu} alt="plus" /> RU
                </button>
                <button>
                  <img src={flagUK} alt="plus" />
                  EN
                </button>
              </div>
            </div>
            <div className="movieInnerTags">
              {genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
              <p>
                <img src={Diary} alt="Diary" />
                {data.release_date}
              </p>
              <p>
                <img src={Duration} alt="Duration" /> {data.runtime} min
              </p>
              <p>
                <img src={Rate} alt="Rate" /> {data.vote_average}
              </p>
            </div>
            <p className="movie_description">{data.overview}</p>
            <ul>
              {prodCountry.map((production) => (
                <li key={production.iso_3166_1}>Country : {production.name}</li>
              ))}

              <li>Genres : {genres.map((genre) => `${genre.name}, `)}</li>
              <li>Date Release : {data.release_date}</li>
              <li>Budget : {formatNumberAbbreviation(budget)} $</li>
              <li>Revenue : {formatNumberAbbreviation(revenue)} $</li>
              <li>Original language : {data.original_language}</li>
            </ul>
          </div>
        </div>

        <div className="video-container">
          {/* Custom button */}
          <button className="custom-button">P</button>

          {/* ReactPlayer component */}
          <ReactPlayer
            className="react-player"
            controls
            url="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
          />
        </div>

        <MoviePlayer/>

        <div className="moviePage_proposeTitle">
          <h1>You may also like</h1>
        </div>
        <div className="moviePage_proposePosters"></div>
      </section>
    </>
  );
};
