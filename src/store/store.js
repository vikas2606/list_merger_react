// store.js
import { configureStore } from '@reduxjs/toolkit';

// Action types
const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
const UPDATE_LIST_DATA = 'UPDATE_LIST_DATA';


// Action creators
export const toggleCheckbox = (listNumber) => ({
  type: TOGGLE_CHECKBOX,
  payload: { listNumber },
});

export const updateListData = (newListData) => ({
    type: UPDATE_LIST_DATA,
    payload: { newListData },
  });

// Reducer
const initialState = {
  checkedLists: {},
  listData: [],

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CHECKBOX:
      const { listNumber } = action.payload;
      const isListChecked = state.checkedLists[listNumber] || false;
      return {
        ...state,
        checkedLists: {
          ...state.checkedLists,
          [listNumber]: !isListChecked,
        },
      };
    case UPDATE_LIST_DATA:
      return {
        ...state,
        listData: action.payload.newListData,
      };

    default:
      return state;
  }
};

// Create store
const store = configureStore({
  reducer,
});

export default store;
