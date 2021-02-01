import React, {useState} from 'react';
import './ToDoList.css';
import ToDoItem from './toDoItem/toDoItem';

import { connect } from 'react-redux';

import {addItem, addAddon, removeItem} from '../../../redux/modules/toDoList/actions.js';

const ToDoList = ({toDoList, addItem, addAddon, removeItem}) => {
    let input;
    // const [categories, setCategories] = useState(toDoList);
    // const addItem = item => setCategories([...categories, item]);
    console.log('toDoList', toDoList)


    const onSubmit = (event, key) => {
        event.preventDefault(event);
        console.log(event.target, key);
        console.log(event.target.name.value);
        console.log(event.target.url.value);
        addAddon({name: event.target.name.value, url: event.target.url.value, key: Date.now()}, key);
    };

    const onClose = (key) => {
        console.log('x button was clicked', key);    
        removeItem(key);

    }

    return (
        <>
            <h2>To do List</h2>
            <h3>Categories</h3>
            <form>
                <input
                    type="text"
                    ref={node => {input = node;}}
                    placeholder=" Add a category here " />
                <button className="btn" type="submit" onClick={event => {
                    input.value!=='' && addItem({text: input.value, key: Date.now(), edit: false, addOnList: []});
                    input.value='';
                    event.preventDefault();
                }} >Add</button>
            </form>
            <div className="container">
                <div className="row">
                    {toDoList.map(category => (
                       <ToDoItem 
                            key={`categories${category.key}`} 
                            item={category.text} 
                            list={category.addOnList}
                            onSubmit={event => onSubmit(event, category.key)}
                            removeItem={() => onClose(category.key)}
                            />))}
                </div>    
                 
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
    toDoList: state.toDoList.toDoList}
};

const mapDispatchToProps = dispatch => {

    return {
        addItem: input => dispatch(addItem(input)),
        addAddon: (input, key) => dispatch(addAddon(input, key)),
        removeItem: key => dispatch(removeItem(key)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);