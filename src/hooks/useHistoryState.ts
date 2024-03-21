import * as React from 'react';

const initialState = {
  past: [],
  present: null,
  future: [],
};

const reducer = (state, action) => {
  const { past, present, future } = state;

  if (action.type === 'UNDO') {
    return {
      past: past.slice(0, past.length - 1),
      present: past[past.length - 1],
      future: [present, ...future],
    };
  } else if (action.type === 'REDO') {
    return {
      past: [...past, present],
      present: future[0],
      future: future.slice(1),
    };
  } else if (action.type === 'SET') {
    const { newPresent } = action;

    if (action.newPresent === present) {
      return state;
    }

    return {
      past: [...past, present],
      present: newPresent,
      future: [],
    };
  } else if (action.type === 'CLEAR') {
    return {
      ...initialState,
      present: action.initialPresent,
    };
  } else {
    throw new Error('Unsupported action type');
  }
};

export default function useHistoryState(initialPresent = {}) {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    present: initialPresent,
  });

  return {
    state: state.present,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    set: (newPresent) => dispatch({ type: 'SET', newPresent }),
    undo: () => dispatch({ type: 'UNDO' }),
    redo: () => dispatch({ type: 'REDO' }),
    clear: () => dispatch({ type: 'CLEAR', initialPresent }),
  };
}
