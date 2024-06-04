import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import userService from "../api/UserService";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
    const { register, handleSubmit, formState: { errors }, watch, setError, clearErrors } = useForm();
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [usernameVerified, setUsernameVerified] = useState(false);
    const [isUsernameLoading, setIsUsernameLoading] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {}, [isUsernameValid, isCaptchaVerified]);

    const handleCaptchaVerification = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (isUsernameValid) {
                setIsCaptchaVerified(true);
                clearErrors("captcha");
            } else {
                setError("captcha", { type: "manual", message: "Captcha verification failed" });
            }
            setIsLoading(false);
        }, 3000);
    };

    const handleVerifyUsername = async (data) => {
        clearErrors();
        setMessage('');
        setIsUsernameLoading(true);

        setTimeout(async () => {
            try {
                const response = await userService.verifyUsername(data.username);
                if (response) {
                    setUsername(data.username);
                    setIsUsernameValid(true);
                    setMessage('');
                } else {
                    setUsername('');
                    setIsUsernameValid(false);
                    setError("username", { type: "manual", message: "Username not found" });
                    setMessage('User doesn\'t exist');
                }
                setUsernameVerified(true);
            } catch (error) {
                setError("username", { type: "manual", message: "Verification failed." });
                setIsUsernameValid(false);
                setUsernameVerified(true);
            } finally {
                setIsUsernameLoading(false);
            }
        }, 3000);
    };

    const handleResetPassword = async (data) => {
        const newPassword = data.newPassword;
        const isPasswordValid = validatePassword(newPassword);
        
        if (isPasswordValid) {
            clearErrors();
            setMessage('');
            try {
                await userService.resetPassword(username, newPassword);
                setMessage('Your password has been reset successfully.');
                setIsModalOpen(true);
            } catch (error) {
                console.error("Password reset error:", error);
                setError("newPassword", { type: "manual", message: "Password reset failed." });
            }
        } else {
            setPasswordErrorMessage('All conditions for the password must be met.');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate("/login");
    };

    const newPassword = watch("newPassword", "");

    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasNumber = /[0-9]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#\$%\^&\*]/.test(password);

        return minLength && hasNumber && hasLowercase && hasUppercase && hasSpecialChar;
    };

    const passwordConditions = [
        { text: "At least 8 characters", valid: newPassword.length >= 8 },
        { text: "At least one digit", valid: /[0-9]/.test(newPassword) },
        { text: "At least one lowercase letter", valid: /[a-z]/.test(newPassword) },
        { text: "At least one uppercase letter", valid: /[A-Z]/.test(newPassword) },
        { text: "At least one special character", valid: /[!@#\$%\^&\*]/.test(newPassword) }
    ];

    return (
        <div className="auth-form-container">
            <h2 className="auth-form-title">Forgot Password</h2>
            {step === 1 && (
                <form onSubmit={handleSubmit(handleVerifyUsername)} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="auth-form-label">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            {...register('username', { required: 'Username is required' })} 
                            className="auth-form-input"
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setIsUsernameValid(false);
                                setUsernameVerified(false);
                            }}
                        />
                        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>
                    <div className="username-container">
                        {isUsernameLoading ? (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <span>Verifying username...</span>
                            </div>
                        ) : (
                            <button 
                                type="submit" 
                                className="auth-form-button"
                                disabled={isUsernameValid}
                            >
                                {isUsernameValid ? "Username Verified" : "Verify Username"}
                            </button>
                        )}
                        {usernameVerified && !isUsernameValid && <p className="text-red-500">{message}</p>}
                    </div>
                    <div className="captcha-container">
                        {isLoading ? (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <span>Verifying your captcha...</span>
                            </div>
                        ) : (
                            <button 
                                type="button" 
                                onClick={handleCaptchaVerification} 
                                className="auth-form-button"
                                disabled={isCaptchaVerified || !isUsernameValid}
                            >
                                {isCaptchaVerified ? "Captcha Verified" : "Verify Captcha"}
                            </button>
                        )}
                        {errors.captcha && <p className="text-red-500">{errors.captcha.message}</p>}
                    </div>
                    <button 
                        type="button" 
                        className="auth-form-button" 
                        onClick={() => {
                            if (isCaptchaVerified && isUsernameValid) {
                                setStep(2);
                            }
                        }} 
                        disabled={!isCaptchaVerified || !isUsernameValid}
                    >
                        Next
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-4">
                    <div>
                        <label htmlFor="newPassword" className="auth-form-label">New Password</label>
                        <input 
                            type="password" 
                            id="newPassword" 
                            {...register('newPassword', { required: 'New Password is required' })} 
                            className="auth-form-input"
                        />
                        {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
                    </div>
                    <div className="password-conditions">
                        <ul>
                            {passwordConditions.map((condition, index) => (
                                <li key={index} style={{ color: condition.valid ? '#50a3b3' : 'red' }}>
                                    {condition.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit" className="auth-form-button">Reset Password</button>
                    {passwordErrorMessage && <p className="text-red-500">{passwordErrorMessage}</p>}
                </form>
            )}

            <Modal 
                isOpen={isModalOpen} 
                title="Success" 
                onClose={closeModal} 
                onConfirm={closeModal}
                showConfirmButton
            >
                {message}
            </Modal>
        </div>
    );
};

export default ForgotPasswordPage;

