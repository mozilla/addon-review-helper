import React from 'react';
import './ToDoList.css';
import ToDoItem from './toDoItem/toDoItem';

import { connect } from 'react-redux';

import {addItem, addAddon, removeItem, editItem, removeAddon} from '../../../redux/modules/toDoList/actions.js';

const ToDoList = ({toDoList, addItem, addAddon, removeItem, editItem, removeAddon}) => {
    let input;

    const onSubmit = (event, key) => {
        event.preventDefault(event);
        addAddon({name: event.target.name.value, url: event.target.url.value, key: Date.now()}, key);
    };

    const onEdit = (event, itemKey, key) => {
        event.preventDefault(event);
        editItem({name: event.target.name.value, url: event.target.url.value, key: itemKey}, key);
    };

    const onRemove = (itemKey, key) => removeAddon({key: itemKey}, key);

    const onClose = key => removeItem(key);

    return (
        <>
            <h2>To do List</h2>
            <h3>Categories</h3>
            <form>
                <input
                    type="text"
                    ref={node => {input = node;}}
                    placeholder=" Add a category here "
                    className="inputClass"    
                />
                    
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
                            editItem={(event, itemKey)=> onEdit(event, itemKey, category.key)}
                            removeAddon={(itemKey)=> onRemove(itemKey, category.key)}
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
        editItem: (input, key) => dispatch(editItem(input, key)),
        removeAddon: (input, key) => dispatch(removeAddon(input, key)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
