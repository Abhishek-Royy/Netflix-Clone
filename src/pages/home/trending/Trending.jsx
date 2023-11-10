import React, { useState } from 'react';  // Import React and useState
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';


const Trending = () => {
    // Initialize a state variable to track the currently selected tab
    const [endPoint, setendPoint] = useState("day");

    const { data, loading } = useFetch(`/trending/all/${endPoint}`);

    // Define a function to handle tab changes
    const onTabChange = (tab) => {
        setendPoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} selectedTab={endPoint} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    );
};

export default Trending;
