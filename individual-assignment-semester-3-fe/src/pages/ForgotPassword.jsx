import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import userService from "../api/UserService";
import Modal from "../components/Modal";
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPasswordPage = () => {
    const { register, handleSubmit, formState: { errors }, watch, setError, clearErrors } = useForm();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isResetLinkSent, setIsResetLinkSent] = useState(false);
    const [isTokenExpired, setIsTokenExpired] = useState(false); // New state for token expiry
    const navigate = useNavigate();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');

    useEffect(() => {
        if (token) {
            setStep(2);
        }
    }, [token]);

    const handleRequestPasswordReset = async (data) => {
        clearErrors();
        setMessage('');
        setIsLoading(true);

        try {
            await userService.requestPasswordReset(data.email);
            setEmail(data.email);
            setIsResetLinkSent(true);
        } catch (error) {
            setError("email", { type: "manual", message: "An user with this email doesn't exist or the request failed. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (data) => {
        const newPassword = data.newPassword;
        const isPasswordValid = validatePassword(newPassword);

        if (isPasswordValid) {
            clearErrors();
            setMessage('');
            try {
                await userService.resetPasswordWithToken(token, newPassword);
                setMessage('Your password has been reset successfully.');
                setIsModalOpen(true);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message === 'Token has expired') {
                    setIsTokenExpired(true);
                    setMessage('Your reset token has expired. Please request a new password reset.');
                } else {
                    setError("newPassword", { type: "manual", message: "Password reset failed. The reset token might have expired. Try sending a new reset request." });
                }
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
            <h2 className="auth-form-title">{token ? "Reset Password" : "Forgot Password"}</h2>
            {!token && !isResetLinkSent && step === 1 && (
                <form onSubmit={handleSubmit(handleRequestPasswordReset)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="auth-form-label">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            {...register('email', { required: 'Email is required' })} 
                            className="auth-form-input"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="loading-container">
                        {isLoading ? (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <span>Sending request...</span>
                            </div>
                        ) : (
                            <button type="submit" className="auth-form-button">Request Password Reset</button>
                        )}
                    </div>
                    {message && <p className="text-green-500">{message}</p>}
                </form>
            )}

            {!token && isResetLinkSent && (
                <div className="reset-link-sent-container">
                    <p className="text-green-500">Check your email for a password reset link. If you don't see it, check your spam folder as well.</p>
                </div>
            )}

            {isTokenExpired && (
                <div className="token-expired-container">
                    <p className="text-red-500">{message}</p>
                    <button className="auth-form-button" onClick={() => navigate("/forgot-password")}>
                        Request New Password Reset
                    </button>
                </div>
            )}

            {token && step === 2 && !isTokenExpired && (
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
