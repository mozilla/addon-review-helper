import React from 'react';

import { Form } from '../form/form';
import FocusTrap from 'focus-trap-react';

import './modal.css';

export const Modal = ({ onClickOutside, closeModal,onSubmit, nameValue, urlValue, handleNameChange, handleUrlChange}) => {
    
    return (
    <FocusTrap>
        <aside
            tag="aside"
            role="dialog"
            tabIndex="-1"
            aria-modal="true"
            className="modal-cover"
            onClick={onClickOutside}
>
            <div className="modal-area">
                <button
                    aria-label="Close Modal"
                    aria-labelledby="close-modal"
                    className="_modal-close"
                    onClick={closeModal}
                >
                    <span id="close-modal" className="_hide-visual">
                        Close
                    </span>
                </button>
                <div className="modal-body">
                    <Form 
                        onSubmit={onSubmit} 
                        nameValue={nameValue}
                        urlValue={urlValue}
                        handleNameChange={handleNameChange}
                        handleUrlChange={handleUrlChange}
                    />
                </div>
            </div>
        </aside>
 </FocusTrap>);
};

export default Modal;