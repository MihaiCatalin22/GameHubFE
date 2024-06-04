import axios from "axios";

const API_URL = "http://localhost:8080/users"

const FileService = {
    uploadProfilePicture: (file, userId) => {
        let formData = new FormData();
        formData.append("file", file);
        return axios.post(`${API_URL}/upload-profile-picture/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

export default FileService;