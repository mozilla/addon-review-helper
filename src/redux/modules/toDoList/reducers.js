import {
    ADD_ITEM,
    REMOVE_ITEM,
    ADD_ADDON,
    EDIT_ITEM,
    REMOVE_ADDON,
} from './types';

const initialState = {
    toDoList: [],
};

export default (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_ITEM:
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

        case REMOVE_ITEM:
            return {
                ...state,
                toDoList: [...state.toDoList.filter(item => {
                    return item.key!==action.key.key
                })]
            }

        case EDIT_ITEM:
            return {    
                ...state,
                toDoList: [...state.toDoList.map(item => {
                if (item.key===action.payload.key) {
                     item.addOnList.map(addOn=> {
                         if(addOn.key===action.payload.payload.key) {
                            addOn.name = action.payload.payload.name;
                            addOn.url = action.payload.payload.url;
                         }
                         return addOn;   
                     })
                }
                return item;
            })]
        }

        case REMOVE_ADDON:
            return {    
                ...state,
                toDoList: [...state.toDoList.map(item => {
                if (item.key===action.payload.key) {
                     item.addOnList = item.addOnList.filter(addOn=> {
                         return addOn.key!==action.payload.payload.key;   
                     })
                     
                }
                return item;
            })]
        }
            
        default:
            return state
    }
}