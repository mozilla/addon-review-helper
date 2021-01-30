import {
    ADD_ITEM,
    ADD_ADDON,
} from './types';

export function addItem(payload) {
    return {
        type: ADD_ITEM,
        payload
    }
};

export function addAddon(payload, key) {
    return {
        type: ADD_ADDON,
        payload,
        key,
    }
};
