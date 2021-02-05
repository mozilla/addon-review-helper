import React, { useState, useEffect } from 'react';

import AddButton from '../addButton/addButton';
import Modal from '../modal/modal';
import AddOnItem from '../addOnItem/addOnItem';
import { REVIEW_STATE } from '../../../../utils/constants';

import './toDoItem.css';

const ToDoItem = ({ item, list, onSubmit, removeItem, editItem, removeAddon }) => {
    const [isShown, setIsShown] = useState(false);
    const [isListed, setIsListed] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputURL, setInputURL] = useState('');
    const [inputKey, setInputKey] = useState(null);

    const fetchURL = () => {
        REVIEW_STATE.map(index => {
            if(inputURL.indexOf(index)!==-1) {
                let [, nameUpdate] = inputURL.split(index);
                
                nameUpdate = nameUpdate.split('-').map(index => index.toUpperCase()[0]+index.slice(1)).join(' ');
                setInputName(nameUpdate);
            }
        })
    };

    const showModal = () => setIsShown(true);

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
        if (event.currentTarget && event.currentTarget.localName === "aside") return;

        closeModal();
    };

    const handleOnSubmit = (event) => {
        onSubmit(event);
        closeModal();
    };

    const handleOnClick = (name, url, key) => {
        showModal();
        setIsListed(true);
        setInputName(name);
        setInputURL(url);
        setInputKey(key);
    };

    const handleChangeName = event => {
        setInputName(event.target.value);
    };

    const handleChangeUrl = event => {
        setInputURL(event.target.value);
    };

    const handleOnEdit = event => {
        editItem(event, inputKey);
        closeModal();
        setIsListed(false);
    };

    const handleOnRemove = key => removeAddon(key, inputKey);

    useEffect(() => {
        fetchURL();
    }, [inputURL]);

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
