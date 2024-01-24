export function HtmlButton({ ...rest }) {
  const editorState = '';

  function onClick() {
    editorState.update({
      htmlMode: !editorState.htmlMode,
    });
  }

  return (
    <button
      type="button"
      title="HTML mode"
      className="text-edit-btn"
      onClick={onClick}
      data-active={editorState.htmlMode}
      {...rest}
    >
      &lt;/&gt;
    </button>
  );
}
