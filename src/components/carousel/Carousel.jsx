import React, { useRef, useState } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyloadimage/img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import "./style.scss";

const Carousel = ({ data, loading }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);

    
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - container.offsetWidth
                : container.scrollLeft + container.offsetWidth;

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    // Function to navigate the carousel
    const navigateCarousel = (dir) => {
        const newIndex = dir === "right" ? currentIndex + 1 : currentIndex - 1;

        if (newIndex >= 0 && newIndex < data.length) {
            setCurrentIndex(newIndex);
        }
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => {
                        navigateCarousel("left");
                        navigation("left");
                    }}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => {
                        navigateCarousel("right");
                        navigation("right");
                    }}
                />

                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item, index) => {
                            const isActive = index === currentIndex;
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;

                            return (
                                <div
                                    key={item.id}
                                    className={`carouselItem ${isActive ? 'active' : ''}`}
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_Date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton"></div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;
