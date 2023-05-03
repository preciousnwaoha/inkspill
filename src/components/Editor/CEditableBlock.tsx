import React, { useRef, useState, useEffect, Component, RefObject } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { setCaretToEnd, getCaretCoordinates } from '@/utils/editor/helpers';
import CSelectMenu from "./CSelectMenu"

interface EditableBlockProps {
  html: string;
  tag: string;
  id: string;
  updatePage: (data: { id: string; html: string; tag: string }) => void;
  addBlock: (data: { id: string; ref: HTMLElement }) => void;
  deleteBlock: (data: { id: string; ref: HTMLElement }) => void;
}

interface EditableBlockState {
  htmlBackup: string | null;
  html: string;
  tag: string;
  previousKey: string;
  selectMenuIsOpen: boolean;
  selectMenuPosition: {
    x: number | null;
    y: number| null;
  }
}

class EditableBlock extends React.Component<EditableBlockProps, EditableBlockState> {
  contentEditable: RefObject<HTMLElement>;

  constructor(props: EditableBlockProps) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.openSelectMenuHandler = this.openSelectMenuHandler.bind(this);
    this.closeSelectMenuHandler = this.closeSelectMenuHandler.bind(this);
    this.tagSelectionHandler = this.tagSelectionHandler.bind(this);
    this.contentEditable = React.createRef<HTMLElement>();
    this.state = {
      htmlBackup: null,
      html: "",
      tag: "p",
      previousKey: "",
      selectMenuIsOpen: false,
      selectMenuPosition: {
        x: null,
        y: null
      }
    };
  }

  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  componentDidUpdate(prevProps: EditableBlockProps, prevState: EditableBlockState) {
    const htmlChanged = prevState.html !== this.state.html;
    const tagChanged = prevState.tag !== this.state.tag;
    if (htmlChanged || tagChanged) {
      this.props.updatePage({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
      });
    }
  }

  onChangeHandler(e: ContentEditableEvent) {
    this.setState({ html: e.target.value });
  }

  onKeyDownHandler(e: React.KeyboardEvent) {
    if (e.key === "/") {
      this.setState({ htmlBackup: this.state.html });
    }
    if (e.key === "Enter") {
      if (this.state.previousKey !== "Shift") {
        e.preventDefault();
        this.props.addBlock({
          id: this.props.id,
          ref: this.contentEditable.current!,
        });
      }
    }
    if (e.key === "Backspace" && !this.state.html) {
      // Check if the current block is not the first block
      if (this.contentEditable.current?.previousElementSibling) {
        e.preventDefault();
      this.props.deleteBlock({
        id: this.props.id,
        ref: this.contentEditable.current!,
      });
      } 
    }
    this.setState({ previousKey: e.key });
  }

  
  onKeyUpHandler(e: React.KeyboardEvent) {
    if (e.key === "/") {
      console.log("xup")
      this.openSelectMenuHandler();
    }
  }

  openSelectMenuHandler() {
    const { x, y } = getCaretCoordinates();
    this.setState({
      selectMenuIsOpen: true,
      selectMenuPosition: { x: x!, y: y! }
    });
    document.addEventListener("click", this.closeSelectMenuHandler);
  }

  closeSelectMenuHandler() {
    this.setState({
      htmlBackup: null,
      selectMenuIsOpen: false,
      selectMenuPosition: { x: null, y: null }
    });
    document.removeEventListener("click", this.closeSelectMenuHandler);
  }

  tagSelectionHandler(tag: string) {
    this.setState({ tag: tag, html: this.state.htmlBackup! }, () => {
      setCaretToEnd(this.contentEditable.current!);
      this.closeSelectMenuHandler();
    });
  }

  render() {
    return (
      <>
      {this.state.selectMenuIsOpen && (
          <CSelectMenu
            position={this.state.selectMenuPosition}
            onSelect={this.tagSelectionHandler}
            close={this.closeSelectMenuHandler}
          />
        )}

        <ContentEditable
        className="Block"
        innerRef={this.contentEditable}
        html={this.state.html}
        tagName={this.state.tag}
        onChange={this.onChangeHandler}
        onKeyDown={this.onKeyDownHandler}
        onKeyUp={this.onKeyUpHandler}
      />

      </>
      
    );
  }
}

export default EditableBlock;
