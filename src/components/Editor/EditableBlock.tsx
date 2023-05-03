import React, { useRef, useState, useEffect } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { setCaretToEnd, getCaretCoordinates } from '@/utils/editor/helpers';
import SelectMenu from "./SelectMenu"
import Box from "@mui/material/Box"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


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
  const [html, setHtml] = useState<string>(initialHtml);
  const [tag, setTag] = useState<string>(initialTag);
  const [previousKey, setPreviousKey] = useState<string>('');
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState<boolean>(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState<{
    x: number | null;
    y: number| null;
  }>({
    x: null,
    y: null,
  });

  const [hover, setHover] = useState(false)

  const toggleHover = () => {
    setHover(prev => !prev)
  }

  

  // useEffect(() => {
  //   setHtml(initialHtml);
  //   setTag(initialTag);
  //   console.log("runaway")
  // }, [initialHtml, initialTag]);

  useEffect(() => {
    updatePage({ id, html, tag });
    console.log({ id, html, tag })
  }, [html, tag, id, updatePage]);

  const onChangeHandler = (e: ContentEditableEvent) => {
    console.log("e.target.value: ", e.target.value)
    setHtml(e.target.value);
  };


  

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    // Get the current text content of the ContentEditable component
  const currentHtml = e.currentTarget.textContent || '';

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

    console.log({ currentHtml }); // Use currentHtml instead of html
    if ((e.key === 'Backspace')) {
      if (currentHtml === "" ) {
        console.log("e red", {currentHtml})
        // Check if the current block is not the first block
        if (contentEditable.current?.previousElementSibling) {
          e.preventDefault();
          deleteBlock({
            id,
            ref: contentEditable.current!,
          });
        }
      }
    }
    setPreviousKey(e.key);
  };


  // console.log({html})

  const onKeyUpHandler = (e: React.KeyboardEvent) => {
    if (e.key === "/") {
      openSelectMenuHandler();
    }
  }


  const openSelectMenuHandler = () => {
    const { x, y } = getCaretCoordinates();
    console.log({x, y})
    setSelectMenuIsOpen(true)
    setSelectMenuPosition({ x: x!, y: y! })
    document.addEventListener("click", closeSelectMenuHandler);
  }


  const closeSelectMenuHandler = () => {
    setHtmlBackup(null);
    setSelectMenuIsOpen(false);
    setSelectMenuPosition({ x: null, y: null });
    
    document.removeEventListener("click", closeSelectMenuHandler);
  }


  const tagSelectionHandler = (tag: string) => {
    setTag(tag)
    setHtml(htmlBackup!)
    setTimeout(() => {
      setCaretToEnd(contentEditable.current!);
    }, 0);
    closeSelectMenuHandler();
  

    
  }

  let blockStyle = {
    margin: "0",
    marginBottom: "4px",
    backgroundColor: hover ? '#f7f7f7' : 'transparent',
    border: "none",
    outline: "none",
    position: "relative",

  };
  

  return (
    <>
    {selectMenuIsOpen && (
          <SelectMenu
            position={selectMenuPosition}
            onSelect={tagSelectionHandler}
            close={closeSelectMenuHandler}
          />
        )}

<ContentEditable
      className="Block"
      innerRef={contentEditable}
      html={html}
      tagName={tag}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHandler}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      style={blockStyle}
      placeholder={"help"}
    />

    </>
    
  );
};

export default EditableBlock;