import React, { useRef, useState, useEffect } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { uid, setCaretToEnd, getCaretCoordinates } from '@/utils/editor/helpers';
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
  addBlocks:  (data: { id: string; ref: HTMLElement }, blocks: { id: string; html: string; tag: string }[]) => void;
  onHoverItem: (position: {x: number; y: number} | null) => void;
}


const EditableBlock: React.FC<EditableBlockProps> = ({
  html: initialHtml,
  tag: initialTag,
  id,
  updatePage,
  addBlock,
  deleteBlock,
  addBlocks,
  onHoverItem,
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
    // console.log(contentEditable.current?.getClientRects()[0]!)
    const rect = contentEditable.current?.getClientRects()[0]!
    const position = !hover ? {x: rect.left, y: rect.top}: null
    onHoverItem(position)
    setHover(prev => !prev)
    
  }

  

  // useEffect(() => {
  //   setHtml(initialHtml);
  //   setTag(initialTag);
  //   console.log("runaway")
  // }, [initialHtml, initialTag]);

  useEffect(() => {
    updatePage({ id, html, tag });
    // console.log({ id, html, tag })
  }, [html, tag, id, updatePage]);

  const onChangeHandler = (e: ContentEditableEvent) => {
    // console.log("e.target.value: ", e.target.value)
    setHtml(e.target.value);
  };


  

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    // Get the current text content of the ContentEditable component
  const currentHtml = e.currentTarget.textContent || '';
  
  const previousBlock = contentEditable.current?.previousElementSibling
  const nextBlock = contentEditable.current?.nextElementSibling

    switch(e.key) {
      case "/":
        setHtmlBackup(html);
          break;
      case "Enter":
        if (!selectMenuIsOpen) {
          if (previousKey !== 'Shift') {
            e.preventDefault();
            addBlock({
              id,
              ref: contentEditable.current!,
            });
          }
        }
          break;
      case "Backspace":
        if (currentHtml === "" ) {
          // Check if the current block is not the first block
          if (contentEditable.current?.previousElementSibling) {
            e.preventDefault();
            deleteBlock({
              id,
              ref: contentEditable.current!,
            });
          }
        }
          break;
      case "ArrowUp":
        e.preventDefault()
          // Check if the current block is not the first block
          if (previousBlock && !selectMenuIsOpen) {
            setCaretToEnd(previousBlock as HTMLElement);
            (previousBlock as HTMLElement).focus();
          }
        
          break;
      case "ArrowDown":
        e.preventDefault()
        // Check if the current block is not the first block
        if (nextBlock && !selectMenuIsOpen) {
          setCaretToEnd(nextBlock as HTMLElement);
          (nextBlock as HTMLElement).focus();
        }
      
        break;
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
    // console.log({x, y})
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


  const blockSelectionHandler = (block: {id: string;
    content: string[];
    tag: string;
    label: string;}) => {
    
    const blocks = block.content.map(cnt => {
      return {
        id: uid(),
        html: cnt,
        tag: "div",
      }
    })

    if ((html.trim() === "") || (html.trim() === "/")) {
      setTag(blocks[0].tag)
      setHtml(blocks[0].html)
      addBlocks(
        {
          id,
          ref: contentEditable.current!,
        },
        blocks.slice(1)
      )
    } else {
      setHtml(prev => prev.slice(0, -1))
      addBlocks(
        {
          id,
          ref: contentEditable.current!,
        },
        blocks
      )
    }
    
    
    setTimeout(() => {
      setCaretToEnd(contentEditable.current!);
    }, 0);
    closeSelectMenuHandler();
  

    
  }

  let blockStyle = {
    margin: "0",
    marginBottom: "4px",
    backgroundColor: hover ?  '#f7f7f7' : 'transparent',
    borderRadius: "4px",
    // border: "1px solid black",
    outline: "none",
    position: "relative",
    userSelect: "all"
  };

  // const newH = html + "<div>Hope</div>"
  

  return (
    <>
    {selectMenuIsOpen && (
          <SelectMenu
            position={selectMenuPosition}
            onSelect={blockSelectionHandler}
            close={closeSelectMenuHandler}
          />
        )}

<ContentEditable
      className="Block"
      innerRef={contentEditable}
      html={html}
      tagName={"div"}
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