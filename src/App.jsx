import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchData } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfig, getGenres } from './store/homeSlice'


import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from './pages/home/Home';
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";
import Error from "./pages/404/Error";

function App() {

  const dispatch = useDispatch();
  const { url } = useSelector((state) =>
    state.home);
  console.log(url);

  useEffect(() => {
    apiTesting();
    genresCall();
  }, []);


  const apiTesting = () => {
    fetchData('/configuration')
      .then((res) => {
        console.log(res)

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }

        dispatch(getApiConfig(url));
      })
  }


  const genresCall=async()=>{
    let promises=[]
    let endPoint=["tv","movie"]
    let allGenres={}

    endPoint.forEach((url)=>{
      return promises.push(fetchData(`/genre/${url}/list`))
    })

    const data=await Promise.all(promises);
    console.log(data);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))
    })
    dispatch(getGenres(allGenres));
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
