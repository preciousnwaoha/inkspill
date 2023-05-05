
export const MENU_HEIGHT = 150;

export const SUPPORTED_BLOCKS = [
  {
    id: "heading-1",
    content: ["# "],
    tag: "h1",
    label: "Heading 1",
  },
  {
    id: "heading-2",
    content: ["## "],
    tag: "h2",
    label: "Heading 2"
  },
  
  {
    id: "heading-3",
    content: ["### "],
    tag: "h3",
    label: "Heading 3"
  },
  {
    id: "numbered-list",
    content: ["1. "],
    tag: "list",
    label: "Numbered List"
  },
  {
    id: "bulleted-list",
    content: ["* "],
    tag: "list",
    label: "Bulletted List"
  },
  {
    id: "dashed-list",
    content: ["- "],
    tag: "list",
    label: "Dashed List"
  },
  {
    id: "code-inline",
    content: ["``` code ```"],
    tag: "code",
    label: "Code Inline"
  },
  {
    id: "code-block",
    content: ["```", "", "```"],
    tag: "code",
    label: "Code Block"
  },
  {
    id: "Table",
    content: ["| A | B |", "| --- | --- |", "|   |   |"],
    tag: "table",
    label: "Table"
  }
];

export const SUPPORTED_TAGS = [
  {
    id: "heading-1",
    tag: "h1",
    label: "Heading 1"
  },
  {
    id: "heading-2",
    tag: "h2",
    label: "Heading 2"
  },
  
  {
    id: "heading-3",
    tag: "h3",
    label: "Heading 3"
  },
  {
    id: "heading-4",
    tag: "h4",
    label: "Heading-4"
  },
  {
    id: "heading-5",
    tag: "h5",
    label: "Heading-5"
  },
  {
    id: "heading-6",
    tag: "h6",
    label: "Heading-6"
  },
  {
    id: "code",
    tag: "code",
    label: "Code"
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph"
  }
];