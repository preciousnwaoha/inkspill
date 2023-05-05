import React, { useRef, useState, useEffect } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { setCaretToEnd, getCaretCoordinates } from '@/utils/editor/helpers';
import SelectMenu2 from "./SelectMenu2"
import Box from "@mui/material/Box"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


interface EditableBlock2Props {
  html: string;
  tag: string;
  id: string;
  updatePage: (data: { id: string; html: string; tag: string }) => void;
  addBlock: (data: { id: string; ref: HTMLElement }) => void;
  deleteBlock: (data: { id: string; ref: HTMLElement }) => void;
  onHoverItem: (position: {x: number; y: number} | null) => void;
}


const EditableBlock2: React.FC<EditableBlock2Props> = ({
  html: initialHtml,
  tag: initialTag,
  id,
  updatePage,
  addBlock,
  deleteBlock,
  onHoverItem,
}) => {
  const contentEditable = useRef<HTMLElement>(null);
  const [htmlBackup, setHtmlBackup] = useState<string | null>(null);
  const [html, setHtml] = useState<string>(initialHtml);
  const [tag, setTag] = useState<string>(initialTag);
  const [previousKey, setPreviousKey] = useState<string>('');
  const [selectMenu2IsOpen, setSelectMenu2IsOpen] = useState<boolean>(false);
  const [selectMenu2Position, setSelectMenu2Position] = useState<{
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
      openSelectMenu2Handler();
    }
  }


  const openSelectMenu2Handler = () => {
    const { x, y } = getCaretCoordinates();
    console.log({x, y})
    setSelectMenu2IsOpen(true)
    setSelectMenu2Position({ x: x!, y: y! })
    document.addEventListener("click", closeSelectMenu2Handler);
  }


  const closeSelectMenu2Handler = () => {
    setHtmlBackup(null);
    setSelectMenu2IsOpen(false);
    setSelectMenu2Position({ x: null, y: null });
    
    document.removeEventListener("click", closeSelectMenu2Handler);
  }


  const tagSelectionHandler = (tag: string) => {
    setTag(tag)
    setHtml(htmlBackup!)
    setTimeout(() => {
      setCaretToEnd(contentEditable.current!);
    }, 0);
    closeSelectMenu2Handler();
  

    
  }

  let blockStyle = {
    margin: "0",
    marginBottom: "4px",
    backgroundColor: hover ?  '#f7f7f7' : 'transparent',
    borderRadius: "4px",
    // border: "1px solid black",
    outline: "none",
    position: "relative",

  };

  // const newH = html + "<div>Hope</div>"
  

  return (
    <>
    {selectMenu2IsOpen && (
          <SelectMenu2
            position={selectMenu2Position}
            onSelect={tagSelectionHandler}
            close={closeSelectMenu2Handler}
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

export default EditableBlock2;