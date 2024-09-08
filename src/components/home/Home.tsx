import React from 'react';
import './Home.css';
import homeImage from '../../assets/logo.png'
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="container">
            <div className="overlay"></div> {/* Black overlay with opacity */}
            <div className="content">
                <div style={{display:"flex", height:"40%", justifyContent:"center",alignItems:"center"}}>
                    <img src={homeImage} style={{ width: '200px', height: "200px" }}></img>
                </div>
                <div style={{display:"flex", height:"10%", justifyContent:"center",alignItems:"center"}}>
                <h2 style={{ color: "white", fontSize: "36px" }}>GeoQuiz</h2>
                </div>
                <div className="options-section-container">
                    <div className='sectionContainer'>
                        <h4 style={{ color: "white" }}>Start A Quick Game</h4>
                        <div className='optionsContainer' >
                            <Link to="/byCountryQuick" className='option-element'>
                                <div className="start-button" >Country</div>
                            </Link>
                            <Link to="/byCapitalQuick" className='option-element'>
                                <div className="start-button" >Capital</div>
                            </Link>
                            <Link to="/byFlagsQuick" className='option-element'>
                                <div className="start-button">Flag</div>
                            </Link>
                        </div>
                    </div>
                    <div className='sectionContainer'>
                        <h4 style={{ color: "white" }}>Explore All Countries</h4>
                        <div className='optionsContainer'>
                            <Link to="/byCountry" className="option-element">
                                <div className="start-button">Country</div>
                            </Link>
                            <Link to="/byCapital" className="option-element">
                                <div className="start-button">Capital</div>
                            </Link>
                            <Link to="/byFlags" className="option-element">
                                <div className="start-button">Flag</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
