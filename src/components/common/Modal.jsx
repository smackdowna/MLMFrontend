// Modal.js
import React from 'react';
import '../../styles/innerScreen/styles.css';

const Modal = ({ isOpen, onClose, children }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
