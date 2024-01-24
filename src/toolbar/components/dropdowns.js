import React from 'react';
import {useEditorState} from "../../editor/contexts/EditorContext";

export const BtnStyles = createDropdown('Styles', [
  ['Normal', 'formatBlock', 'DIV'],
  ['𝗛𝗲𝗮𝗱𝗲𝗿 𝟭', 'formatBlock', 'H1'],
  ['Header 2', 'formatBlock', 'H2'],
  ['Header 3', 'formatBlock', 'H3'],
  ['Header 4', 'formatBlock', 'H4'],
  ['Header 5', 'formatBlock', 'H5'],
  ['𝙲𝚘𝚍𝚎', 'formatBlock', 'PRE'],
]);

export function createDropdown(
  title,
  items,
) {
  DropdownFactory.displayName = title;

  return DropdownFactory;

  function DropdownFactory(props) {
    const editorState = useEditorState();
    const { $el, $selection, htmlMode } = editorState;

    if (htmlMode) {
      return null;
    }

    const activeIndex = items.findIndex(
      (item) => item[1] === 'formatBlock' && $selection?.nodeName === item[2],
    );

    return (
      <Dropdown
        {...props}
        onChange={onChange}
        title={title}
        items={items}
        selected={activeIndex}
      />
    );

    function onChange(e) {
      const target = e.target;
      const selectedValue = target.value;
      const selectedIndex = parseInt(selectedValue, 10);

      const [, command, commandArgument] = items[selectedIndex];

      e.preventDefault();

      if (document.activeElement !== $el) {
        $el?.focus();
      }

      if (typeof command === 'function') {
        command(editorState);
      } else {
        document.execCommand(command, false, commandArgument);
      }

      setTimeout(() => (target.value = selectedValue), 10);
    }
  }
}

export function Dropdown({ items, selected, ...inputProps }) {
  return (
    <select {...inputProps} value={selected} className="text-edit-dd">
      <option hidden>{inputProps.title}</option>
      {items.map((item, index) => (
        <option key={item[2]} value={index}>
          {item[0]}
        </option>
      ))}
    </select>
  );
}
