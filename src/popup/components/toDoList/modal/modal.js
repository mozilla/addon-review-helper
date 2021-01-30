import React from 'react';

import { Form } from '../form/form';
import FocusTrap from 'focus-trap-react';

import './modal.css';

export const Modal = ({ onClickOutside, modalRef, buttonRef, closeModal,onSubmit}) => {
    
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
            <div className="modal-area" ref={modalRef}>
                <button
                    ref={buttonRef}
                    aria-label="Close Modal"
                    aria-labelledby="close-modal"
                    className="_modal-close"
                    onClick={closeModal}
                >
                    <span id="close-modal" className="_hide-visual">
                        Close
                    </span>
                    {/* <svg className="_modal-close-icon" viewBox="0 0 40 40">
                        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                    </svg> */}
                </button>
                <div className="modal-body">
                    <Form onSubmit={onSubmit} />
                </div>
            </div>
        </aside>
 </FocusTrap>);
};

export default Modal;