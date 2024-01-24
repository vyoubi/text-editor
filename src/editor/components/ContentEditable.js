import React, {memo, forwardRef, useRef, useEffect} from 'react';
import {normalizeHtml, replaceCaret} from "../../utils";

export const ContentEditable = memo(
  forwardRef(function ContentEditable(
    { className, disabled, tagName, value = '', ...rest },
    ref,
  ) {
    const elRef = useRef();
    const htmlRef = useRef(value);
    const restRef = useRef(rest);

    useEffect(() => {
      restRef.current = rest;
      const el = elRef.current;
      if (el && normalizeHtml(htmlRef.current) !== normalizeHtml(value)) {
        htmlRef.current = value;
        el.innerHTML = value;
        replaceCaret(el);
      }
    });

    return React.useMemo(() => {
      function onSetRef($el) {
        elRef.current = $el;
        if (typeof ref === 'function') {
          ref($el);
        } else if (typeof ref === 'object' && ref) {
          ref.current = $el;
        }
      }

      function onChange(event) {
        const el = elRef.current;
        if (!el) {
          return;
        }

        const elementHtml = el.innerHTML;
        if (elementHtml !== htmlRef.current) {
          restRef.current.onChange?.({
            ...event,
            target: {
              value: elementHtml,
              name: rest.name,
            },
          });
        }

        htmlRef.current = elementHtml;
      }

      return React.createElement(tagName || 'div', {
        ...rest,
        className,
        contentEditable: !disabled,
        dangerouslySetInnerHTML: { __html: value },
        onBlur: (e) =>
          (restRef.current.onBlur || onChange)(e),
        onInput: onChange,
        onKeyDown: (e) =>
          (restRef.current.onKeyDown || onChange)(e),
        onKeyUp: (e) =>
          (restRef.current.onKeyUp || onChange)(e),
        ref: onSetRef,
      });
    }, [className, disabled, tagName]);
  }),
);
