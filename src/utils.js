export function getSelectedNode() {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    return selection.getRangeAt(0).startContainer.parentNode || undefined;
  }
  if (selection) {
    return selection.createRange().parentElement();
  }

  return undefined;
}

export function normalizeHtml(str) {
  return str ? str.replace(/&nbsp;|\u202F|\u00A0/g, ' ') : '';
}

export function replaceCaret(el) {
  const target = document.createTextNode('');
  el.appendChild(target);

  const isTargetFocused = document.activeElement === el;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const sel = window.getSelection();
    if (sel !== null) {
      const range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (el instanceof HTMLElement) el.focus();
  }
}
