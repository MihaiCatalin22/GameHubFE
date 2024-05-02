import React, {useState} from "react";
import FileService from "../services/FileService";

const ProfilePictureUpload = ({ userId, onProfilePictureUploaded }) => {
    const [file, setFile] = useState(null);

    const handleFileUpload = () => {
        if (!file) {
            alert('Please select a profile picture to upload!');
            return;
        }

        FileService.uploadProfilePicture(file, userId)
            .then(response => {
                alert('Profile picture uploaded successfully');
                onProfilePictureUploaded(response.data);
            }).catch(error => {
                alert('Failed to upload profile picture');
                console.error('Upload error:', error);
            });
    };

    return (
        <div>
            <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/png, image/jpeg" />
            <button className='button' onClick={handleFileUpload}>Upload Profile Picture</button>
        </div>
    );
};

export default ProfilePictureUpload;