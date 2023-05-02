import React, { useRef, useState, useEffect } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

interface EditableBlockProps {
  html: string;
  tag: string;
  id: string;
  updatePage: (data: { id: string; html: string; tag: string }) => void;
  addBlock: (data: { id: string; ref: HTMLElement }) => void;
  deleteBlock: (data: { id: string; ref: HTMLElement }) => void;
}

const EditableBlock: React.FC<EditableBlockProps> = ({
  html: initialHtml,
  tag: initialTag,
  id,
  updatePage,
  addBlock,
  deleteBlock,
}) => {
  const contentEditable = useRef<HTMLElement>(null);
  const [htmlBackup, setHtmlBackup] = useState<string | null>(null);
  const [html, setHtml] = useState(initialHtml);
  const [tag, setTag] = useState(initialTag);
  const [previousKey, setPreviousKey] = useState('');

  useEffect(() => {
    setHtml(initialHtml);
    setTag(initialTag);
  }, [initialHtml, initialTag]);

  useEffect(() => {
    updatePage({ id, html, tag });
  }, [html, tag, id, updatePage]);

  const onChangeHandler = (e: ContentEditableEvent) => {
    setHtml(e.target.value);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === '/') {
      setHtmlBackup(html);
    }
    if (e.key === 'Enter') {
      if (previousKey !== 'Shift') {
        e.preventDefault();
        addBlock({
          id,
          ref: contentEditable.current!,
        });
      }
    }
    if (e.key === 'Backspace' && !html) {
      
      // Check if the current block is not the first block
      if (contentEditable.current?.previousElementSibling) {
        e.preventDefault();
        deleteBlock({
          id,
          ref: contentEditable.current!,
        });
      }
    }
    setPreviousKey(e.key);
  };

  return (
    <ContentEditable
      className="Block"
      innerRef={contentEditable}
      html={html}
      tagName={tag}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
    />
  );
};

export default EditableBlock;