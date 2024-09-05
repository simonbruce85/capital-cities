import React from 'react';
import './Home.css';
import backgroundImage from '../../assets/background.jpg';  // Import the background image
import homeImage from '../../assets/home.png'
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="overlay"></div> {/* Black overlay with opacity */}
            <div className="content">
                <img src={homeImage} style={{ width: '250px', height: "250px", paddingBottom: "100px" }}></img>
                <Link to="/byCountry">
                    <div className="start-button">Start</div>
                </Link>
            </div>
        </div>
    );
};

export default Home;
