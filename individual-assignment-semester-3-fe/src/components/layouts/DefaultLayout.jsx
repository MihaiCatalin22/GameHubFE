import React from "react";
import Header from "../style/Header";
import Footer from "../style/Footer";

function DefaultLayout({children}) {
    return (
        <>
        <Header/>
        
        {children}
        <Footer/>

        </>
    )
}

export default DefaultLayout;