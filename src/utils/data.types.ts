export type TableType = {
    markdown: string,
    size: [number, number]
}

export type CodeType = {
    lang: string,
    text: string
}

export type ListType = {
    type: "numbered" | "stared" | "dashed",
    items: string[]
}


export interface EditableBlockType {
    html: string;
    tag: string;
    id: string;
  }