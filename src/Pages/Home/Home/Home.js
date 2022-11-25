import React from 'react';
import Banner from '../Banner/Banner';
import CategoryCards from '../CategoryCards/CategoryCards';
import HomeAddBooks from '../HomeAddBooks/HomeAddBooks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CategoryCards></CategoryCards>
            <HomeAddBooks></HomeAddBooks>
        </div>
    );
};

export default Home;