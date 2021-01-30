import {
    ADD_ITEM,
    ADD_ADDON,
} from './types';

const initialState = {
    toDoList: [],
};

export default (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_ITEM:
            console.log('action - payload', action.payload.payload);

            return {
                ...state,
                toDoList: [...state.toDoList, action.payload.payload]
            }
        case ADD_ADDON:
            const dictionary = state.toDoList.map(item => {
                if(item.key===action.payload.key) {
                    item.addOnList.push(action.payload.payload);
                }
                return item;
            });

            return {
                    ...state,
                    toDoList: dictionary
            } 
                
        default:
            return state
    }
}