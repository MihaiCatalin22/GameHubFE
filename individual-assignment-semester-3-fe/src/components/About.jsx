import React from "react";
import logo from '../../dist/LOGO.png';

const AboutPage = () => {
    return (
        <div className="about-container">
            <img src={logo} alt="GameHub Logo should be here" className="about-logo" />
            <h1 className="about-title">Welcome to GameHub.</h1>
            <p className="about-text">
                GameHub is the ultimate social network for gamers. It connects players from around the world,
                allowing them to share experiences, discuss games, and discover new adventures. Created by gamers,
                for gamers, GameHub aims to enrich the gaming experience by providing a platform to follow games,
                organize events, and interact with other gaming enthusiasts and developers.
            </p>
            <p className="about-text">
                Whether you're looking to share your latest game review or find companions for your next gaming
                session, GameHub is the place to be. Join us and become part of a growing community dedicated to
                gaming culture and innovation.
            </p>
        </div>
    );
};

export default AboutPage;