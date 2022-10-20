import _ from 'lodash';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  user: null,
  pages: ['Login'],
};

const reducer = (state, action) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(action);
    console.log(state);
  }
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    case 'SHOW_PAGE':
      var _pages = _.clone(state.pages);
      _pages.push(action.payload);
      return { ...state, pages: _pages };
    case 'HIDE_PAGE':
      // eslint-disable-next-line no-redeclare
      var _pages = _.clone(state.pages);
      _.remove(_pages, o => o === action.payload);
      return { ...state, pages: _pages };

    default:
      break;
  }
};

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
