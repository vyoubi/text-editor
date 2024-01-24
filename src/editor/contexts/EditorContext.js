import React, { createContext, useState, useContext } from 'react';

export const EditorContext = createContext(
  undefined,
);

export function EditorProvider({ children }) {
  const [state, setState] = useState({
    htmlMode: false,
    update,
  });

  function update(attrs) {
    setState((prevState) => {
      return {
        ...prevState,
        ...attrs,
        date: Date.now(),
      };
    });
  }

  return (
    <EditorContext.Provider value={state}>{children}</EditorContext.Provider>
  );
}

export function useEditorState() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('You should wrap your component by EditorProvider');
  }

  return context;
}
