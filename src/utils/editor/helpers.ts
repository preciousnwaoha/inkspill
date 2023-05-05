export const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

export  const setCaretToEnd = (element: HTMLElement) => {
    const range = document.createRange();
    
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
  
    selection!.removeAllRanges();
    selection!.addRange(range);
    element.focus();
  };

export const getCaretCoordinates = () => {
    let x: number | null = null;
    let y: number | null = null;
    const selection = window.getSelection();
    if (selection!.rangeCount !== 0) {
      const range = selection!.getRangeAt(0).cloneRange();
      range.collapse(false);
      const rect = range.getClientRects()[0];
      if (rect) {
        x = rect.left;
        y = rect.top;
      }
    }
    return { x: x, y: y };
  };

  
interface Block {
  id: string;
  html: string;
  tag: string;
}

  export const tagToMarkdown = (block: Block) => {
    const  {html, tag, id} = block
    switch (tag) {
      case 'p':
        return html;
      
      case 'h1':
        return `# ${html}`;

      case 'h2':
        return `## ${html}`;

      case 'h3':
        return `### ${html}`;

      case 'h4':
        return `#### ${html}`;

      case 'h5':
        return `##### ${html}`;

      case 'h6':
        return `###### ${html}`;

      case 'h6':
        return `###### ${html}`;

      case 'code':
        return `\`\`\` 
        ${html}
        \`\`\``;
      
    }
  }


  export const blocksToMarkdown = () => {
    
  }