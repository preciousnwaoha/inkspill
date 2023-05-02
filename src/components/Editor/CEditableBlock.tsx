import React, { useRef, useState, useEffect, Component, RefObject } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

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
}

class EditableBlock extends React.Component<EditableBlockProps, EditableBlockState> {
  contentEditable: RefObject<HTMLElement>;

  constructor(props: EditableBlockProps) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.contentEditable = React.createRef<HTMLElement>();
    this.state = {
      htmlBackup: null,
      html: "",
      tag: "p",
      previousKey: "",
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
      e.preventDefault();
      this.props.deleteBlock({
        id: this.props.id,
        ref: this.contentEditable.current!,
      });
    }
    this.setState({ previousKey: e.key });
  }

  render() {
    return (
      <ContentEditable
        className="Block"
        innerRef={this.contentEditable}
        html={this.state.html}
        tagName={this.state.tag}
        onChange={this.onChangeHandler}
        onKeyDown={this.onKeyDownHandler}
      />
    );
  }
}

export default EditableBlock;
