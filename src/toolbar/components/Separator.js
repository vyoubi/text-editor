import React from 'react';
import { useEditorState} from "../../editor/contexts/EditorContext";

export function Separator() {
  const editorState = useEditorState();

  if (editorState.htmlMode) {
    return null;
  }

  return <div className="text-edit-separator" />;
}
