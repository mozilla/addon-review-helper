import React, { useState } from 'react';

import AddButton from '../addButton/addButton';
import Modal from '../modal/modal';
import AddOnItem from '../addOnItem/addOnItem';

import './toDoItem.css';

const ToDoItem = ({ item, list, onSubmit, removeItem }) => {
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
                <div 
                    className="close"
                    disabled={list.length!==0}
                    onClick={removeItem}
                > 
                </div>
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