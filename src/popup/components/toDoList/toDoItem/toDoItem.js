import React, { useState } from 'react';

import AddButton from '../addButton/addButton';
import Modal from '../modal/modal';
import AddOnItem from '../addOnItem/addOnItem';

import './toDoItem.css';

const ToDoItem = ({ item, list, onSubmit }) => {
    const [isShown, setIsShown] = useState(false);

    console.log('item list', list);

    const showModal = () => {
        setIsShown(true);
    }

    const closeModal = () => {
        setIsShown(false);
        toggleScrollLock();
    };

    const toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    };

    const onClickOutside = event => {
        console.log('event on click outside', event.currentTarget.localName, event.target);
        if (event.currentTarget && event.currentTarget.localName === "aside") return;

        closeModal();
    };

    return (
        <>
            <div className="card">
                <div className="card-container">
                    <div className="card-title">
                        {item}
                    </div>
                    <div className="card-list">
                        {list.map(addOn => <AddOnItem text={addOn.name} key={`category${addOn.key}`} />)}
                    </div>
                </div>
                {isShown ? (
                    <Modal
                        onSubmit={onSubmit}
                        modalRef={(n) => (console.log('modalRef', n))}
                        buttonRef={(n) => (console.log('buttonRef', n))}
                        closeModal={closeModal}
                        onClickOutside={onClickOutside}
                    />) : (
                        <AddButton
                            showModal={showModal}
                        />)}
            </div>
        </>
    );
}

export default ToDoItem;