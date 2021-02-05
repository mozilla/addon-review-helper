import React, { useState } from 'react';

import AddButton from '../addButton/addButton';
import Modal from '../modal/modal';
import AddOnItem from '../addOnItem/addOnItem';

import './toDoItem.css';

const ToDoItem = ({ item, list, onSubmit, removeItem, editItem, removeAddon }) => {
    const [isShown, setIsShown] = useState(false);
    const [isListed, setIsListed] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputURL, setInputURL] = useState('');
    const [inputKey, setInputKey] = useState(null);

    const showModal = () => {
        setIsShown(true);
    }

    const closeModal = () => {
        setIsShown(false);
        toggleScrollLock();
        setInputName('');
        setInputURL('');
    };

    const toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    };

    const onClickOutside = event => {
        console.log('event on click outside', event.currentTarget.localName, event.target);
        if (event.currentTarget && event.currentTarget.localName === "aside") return;

        closeModal();
    };

    const handleOnSubmit = (event) => {
        console.log('handle on submit button was clicked');
        onSubmit(event);
        closeModal();
    };

    const handleOnClick = (name, url, key) => {
        showModal();
        setIsListed(true);
        setInputName(name);
        setInputURL(url);
        setInputKey(key);
        console.log(name, url);
    };

    const handleChangeName = event => {
        setInputName(event.target.value);
    };

    const handleChangeUrl = event => {
        setInputURL(event.target.value);
    }

    const handleOnEdit = event => {
        editItem(event, inputKey);
        closeModal();
        setIsListed(false);
        console.log('handle on Edit input name', inputName);
    };

    const handleOnRemove = key => {
        console.log('Remove Item was clicked');
        removeAddon(key, inputKey);
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
                        {list.map(addOn => <AddOnItem 
                                                text={addOn.name} 
                                                key={`addOn${addOn.key}`} 
                                                onClick={() => handleOnClick(addOn.name, addOn.url, addOn.key)}
                                                removeAddon={()=>handleOnRemove(addOn.key)}
                                                />)}
                    </div>
                </div>
                {isShown ? (
                    <Modal
                        onSubmit={isListed ? handleOnEdit: handleOnSubmit}
                        closeModal={closeModal}
                        onClickOutside={onClickOutside}
                        urlValue={inputURL}
                        nameValue={inputName}
                        handleUrlChange={handleChangeUrl}
                        handleNameChange={handleChangeName}
                    />) : (
                    <AddButton
                        showModal={showModal}
                    />)}
            </div>
        </>
    );
}

export default ToDoItem;