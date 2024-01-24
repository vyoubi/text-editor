import React, {useEffect} from 'react';
import './../../index.css';
import {useEditorState} from "../contexts/EditorContext";
import {HtmlEditor} from "./HtmlEditor";
import {ContentEditable} from "./ContentEditable";

export function Editor({
  children,
  containerProps,
  onSelect,
  ...rest
}) {
  const editorState = useEditorState();

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  });

  function onClickOutside(event) {
    if (event.target === editorState.$el) {
      return;
    }

    editorState.update();
  }

  function onTextSelect(event) {
    onSelect?.(event);
    editorState.update();
  }

  function setContentEditableRef($el) {
    editorState.update({ $el });
  }

  if (editorState.htmlMode) {
    return (
      <div className="text-edit-editor" {...containerProps}>
        {children}
        <HtmlEditor {...rest} className="text-edit-ce text-edit-html" />
      </div>
    );
  }

  return (
    <div className="text-edit-editor" {...containerProps}>
      {children}
      <ContentEditable
        {...rest}
        ref={setContentEditableRef}
        onSelect={onTextSelect}
        className="text-edit-ce"
      />
    </div>
  );
}
