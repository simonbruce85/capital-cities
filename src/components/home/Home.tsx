import React from 'react';
import './Home.css';
import homeImage from '../../assets/logo.png'
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="container">
            <div className="overlay"></div> {/* Black overlay with opacity */}
            <div className="content">
                <img src={homeImage} style={{ width: '250px', height: "250px", paddingBottom: "10px" }}></img>
                <h2 style={{ color:"white", fontSize:"36px"}}>GeoQuiz!</h2>
                <Link to="/byCountry">
                    <div className="start-button">Start</div>
                </Link>
            </div>
        </div>
    );
};

export default Home;
