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


export interface BlockType {
    html: string;
    tag: string;
    id: string;
  }




export  type ContributorType = {
    name: string;
    link?: string;
    role?: string;
}
