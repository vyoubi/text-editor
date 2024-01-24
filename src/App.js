import * as React from 'react';
import {DefaultEditor} from "./editor/components";

export default function App() {
  const [html, setHtml] = React.useState('');

  function onChange(e) {
    setHtml(e.target.value);
  }

  return (
      <>
        <DefaultEditor
            containerProps={{ style: { resize: 'vertical' } }}
            placeholder="Text Editor"
            value={html}
            onChange={onChange}
            title="Valere Text Editor"
        />
        <hr />
        <div dangerouslySetInnerHTML={{ __html: html }}>
        </div>
      </>
  );
}
