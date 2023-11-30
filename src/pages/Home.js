import React from 'react';
import Navbar from '../components/navbar/Navbar';
import VideoGrid from '../components/grid/VideoGrid';
import Pagination from '../components/ui/Pagination';
import Footer from '../components/Footer';
import Tags from '../components/tags/Tags';

const Home = () => {
    return (
        <>
            <Navbar />
            <Tags />
            <VideoGrid />
            <Pagination />
            <Footer />
        </>
    );
};

export default Home;
