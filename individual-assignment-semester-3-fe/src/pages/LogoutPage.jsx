import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; 
import Modal from '../components/Modal';

const LogoutPage = () => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            logoutUser(); 
            navigate('/'); 
        }, 1500);

        return () => clearTimeout(timer);
    }, [logoutUser, navigate]);

    return (
        <Modal 
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Logging Out"
        >
            Logging out, please wait...
        </Modal>
    );
};

export default LogoutPage;