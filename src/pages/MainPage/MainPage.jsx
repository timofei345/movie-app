import { useEffect, useState } from "react";
import Diary from "../../assets/calendarik.svg";
import Rate from "../../assets/rate.svg";
import "./mainPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TrendingCard } from "../../components/TrendingCard/TrendingCard";
import Arrow from "../../assets/arrow.svg";
import { NewMovieCard } from "../../components/NewMovieCard/NewMovieCard";
import { Header } from "../../components/header/Header";
import { getPopular, getUpcoming, getTop_rated } from "../../api/api_requests";
import { genreIdToName } from "../../utils/genreIdToName";
import { GENRE_LIST } from "../../api/GENRE_LIST";
import { Link } from "react-router-dom";


export const MainPage = () => {
  const [upcomingData, setUpcomingData] = useState([]);
  const [topRatedData, setTopRatedData] = useState([]);

  const [data, setData] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getPopular().then((res) => setData(res));
    getUpcoming().then((res) => setUpcomingData(res.slice(0, 3)));
    getTop_rated().then((res) => setTopRatedData(res));
  }, [setData, setUpcomingData, setTopRatedData]);

  const truncateTitle = (title, wordsToShow = 4, threshold = 5) =>
    title.split(" ").length > threshold
      ? title.split(" ").slice(0, wordsToShow).join(" ") + " ..."
      : title;

  return (
    <>
      <Header />

      <section className="main_page">
        <Slider {...settings}>
          {data.slice(0, 4).map((movie) => {
            const genres = genreIdToName(movie.genre_ids, GENRE_LIST);
            return (
              <div  key={movie.id}>
                <article
                  className="main_film"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                  }}
                >
                  <div className="film_info">
                    <h1>{movie.original_title}</h1>
                    <div className="film_moreInfo">
                      <div className="film_tags">
                        {Array.from(
                          new Set(genres.map((genre) => genre.name))
                        ).map((uniqueGenre, index) => (
                          <span key={index}>{uniqueGenre}</span>
                        ))}
                      </div>

                      <div className="moreInfo_card">
                        <img src={Diary} alt="diaryImage" /> <h3>{movie.release_date}</h3>
                      </div>

                      
                      <div className="moreInfo_card">
                        <img src={Rate} alt="rateImage" /> <h3>{movie.vote_average}</h3>
                      </div>
                    </div>

                    <p>
                     {movie.overview}
                    </p>
                  </div>

                  <Link to={`movie/${movie.id}`}>
                    Watch now
                  </Link>
                </article>
              </div>
            );
          })}
        </Slider>
        <main>
          <section className="trending">
            <div className="trending_title">
              <h1>Trending</h1>
              <a href="">
                View all <img src={Arrow} alt="Arrow" />
              </a>
            </div>
            <div className="trending_main">
              {upcomingData.map((movie) => {
                const genres = genreIdToName(movie.genre_ids, GENRE_LIST);

                return (
                  <TrendingCard
                    id={movie.id}
                    key={movie.id}
                    title={movie.title}
                    genre={genres}
                    rate={movie.vote_average}
                    poster={movie.backdrop_path}
                  />
                );
              })}
            </div>
          </section>

          <section className="newMovie">
            <div className="newMovie_title">
              <h1>New Release - Movies</h1>
              <a href="">
                View all <img src={Arrow} alt="Arrow" />
              </a>
            </div>
            <div className="newMovie_main">
              {topRatedData.map((movie) => (
                <NewMovieCard
                  key={movie.id}
                  id={movie.id}
                  poster={movie.poster_path}
                  title={truncateTitle(movie.title)}
                />
              ))}
            </div>
          </section>

          <section className="recommended">
            <div className="recommended_title">
              <div className="recommended_titleInfo">
                <h1>Recommended</h1>
                <div className="recommended_buttons">
                  <button className="active">Movies</button>
                  <button>Series</button>
                  <button>Animation</button>
                </div>
              </div>
              <a href="">
                View all <img src={Arrow} alt="Arrow" />
              </a>
            </div>
            <div className="recommended_main">
              {data.map((movie) => (
                <NewMovieCard
                  key={movie.id}
                  poster={movie.poster_path}
                  title={truncateTitle(movie.title)}
                />
              ))}
            </div>
          </section>
        </main>
      </section>
    </>
  );
};
