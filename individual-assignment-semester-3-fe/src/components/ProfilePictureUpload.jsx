import React, {useState} from "react";
import FileService from "../api/FileService";
import Modal from "./Modal";

const ProfilePictureUpload = ({ userId, onProfilePictureUploaded }) => {
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleFileUpload = () => {
        if (!file) {
            setModalMessage('Please select a profile picture to upload!');
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2500);
            return;
        }

        FileService.uploadProfilePicture(file, userId)
            .then(response => {
                setModalMessage('Profile picture uploaded successfully');
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    onProfilePictureUploaded(response.data);
                }, 1500);
            }).catch(error => {
                setModalMessage('Failed to upload profile picture');
                setShowModal(true);
                setTimeout(() => setShowModal(false), 2000);
                console.error('Upload error:', error);
            });
    };

    return (
        <div>
            <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/png, image/jpeg" />
            <button className='button' onClick={handleFileUpload}>Upload Profile Picture</button>
            {showModal && <Modal isOpen={showModal} title="Upload Status">
                {modalMessage}
            </Modal>}
        </div>
    );
};

export default ProfilePictureUpload;