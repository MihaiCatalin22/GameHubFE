import React from "react";
import './modal.css'

const Modal = ({ isOpen, title, children, onClose, onConfirm, showConfirmButton = false, showCancelButton = false }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4>{title}</h4>
                    <button onClick={onClose} className="modal-close-button">×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    {showConfirmButton && (
                        <button onClick={onConfirm} className="modal-button">
                            Confirm
                        </button>
                    )}
                    {showCancelButton && (
                        <button onClick={onClose} className="modal-button cancel-button">
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;