import {
    ADD_ITEM,
    ADD_ADDON,
    REMOVE_ITEM,
    EDIT_ITEM,
    REMOVE_ADDON,
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

export function removeItem(key) {
    return {
        type: REMOVE_ITEM,
        key
    }
};

export function editItem(payload, key) {
    return {
        type: EDIT_ITEM,
        payload,
        key,
    }
};

export function removeAddon(payload, key) {
    return {
        type: REMOVE_ADDON,
        payload,
        key,
    }
};