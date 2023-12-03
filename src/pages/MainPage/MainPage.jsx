import Diary from "../../assets/calendarik.svg"
import Duration from "../../assets/duration.svg"
import Rate from "../../assets/rate.svg"
import BackgroundImage from "../../assets/mainBackground.png"
import "./mainPage.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const MainPage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true,
        slidesToScroll: 1
      };
    return (

    <section className="main_page">
        <Slider {...settings}>
        <div>
            <article className='main_film' style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <div className="film_info" >
                <h1>Avatar: The Way of Water</h1>
                <div className="film_moreInfo" >
                    <div className='film_tags'>
                    <span>Action</span><span>Adventure</span><span>Science Fiction</span> </div>
                    
                    <div className="moreInfo_card"> <img src={Diary} alt="diaryImage" /> <h3>2022</h3>  </div> 
 
                    <div className="moreInfo_card"> <img src={Duration} alt="durationImage" /> <h3>3:12:00</h3> </div>
                    <div className="moreInfo_card"> <img src={Rate} alt="rateImage" /> <h3>8.5</h3> </div>
                </div>

                <p>Set more than a decade after the events of the first film, learn the story of the 
Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.
                </p>


                </div>

        </article>
        </div>

        <div>
        <article className='main_film' style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <div className="film_info" >
                <h1>Avatar 2: The Way of Water</h1>
                <div className="film_moreInfo" >
                    <div className='film_tags'>
                    <span>Action</span><span>Adventure</span><span>Science Fiction</span> </div>
                    
                    <div className="moreInfo_card"> <img src={Diary} alt="diaryImage" /> <h3>2022</h3>  </div> 
 
                    <div className="moreInfo_card"> <img src={Duration} alt="durationImage" /> <h3>3:12:00</h3> </div>
                    <div className="moreInfo_card"> <img src={Rate} alt="rateImage" /> <h3>8.5</h3> </div>
                </div>

                <p>Set more than a decade after the events of the first film, learn the story of the 
Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.
                </p>


                </div>

        </article>
        </div>

        <div>
        <article className='main_film' style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <div className="film_info" >
                <h1>Avatar 3: The Way of Water</h1>
                <div className="film_moreInfo" >
                    <div className='film_tags'>
                    <span>Action</span><span>Adventure</span><span>Science Fiction</span> </div>
                    
                    <div className="moreInfo_card"> <img src={Diary} alt="diaryImage" /> <h3>2022</h3>  </div> 
 
                    <div className="moreInfo_card"> <img src={Duration} alt="durationImage" /> <h3>3:12:00</h3> </div>
                    <div className="moreInfo_card"> <img src={Rate} alt="rateImage" /> <h3>8.5</h3> </div>
                </div>

                <p>Set more than a decade after the events of the first film, learn the story of the 
Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.
                </p>


                </div>

        </article>
        </div>
        
        </Slider>
       
        




    </section>
  )
}
