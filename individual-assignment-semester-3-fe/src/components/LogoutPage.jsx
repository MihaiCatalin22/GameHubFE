import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; 

const LogoutPage = () => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    useEffect(() => {
        logoutUser();
        navigate('/');
    }, [logoutUser, navigate]);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default LogoutPage;