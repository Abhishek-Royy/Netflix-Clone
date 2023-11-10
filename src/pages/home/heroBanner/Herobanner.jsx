import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyloadimage/img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Herobanner = () => {
  const [background, setbackground] = useState("");
  const [query, setquery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setbackground(bg);
  }, [data]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <div className="heroBanner">
        {!loading && (
          <div className="backdrop-img">
            <Img src={background} />
          </div>
        )}

        <div className="opacity-layer"></div>

        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">WellCome</span>
            <span className="subtitle">
              Unlimited movies, TV shows and more Watch anywhere. Cancel
              anytime. Ready to watch?
            </span>
            <div className="searchInput">
              <input
                onKeyUp={searchQueryHandler}
                onChange={(e) => setquery(e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="Search your favaroit items.. "
              />
              <button>Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};

export default Herobanner;
