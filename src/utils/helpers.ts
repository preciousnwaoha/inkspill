import { TableType, CodeType, ListType } from "./data.types"

export const createTable = (headers: string[]) => {
    let tableStr = "|"

    headers.forEach(head => {
        tableStr += ` ${head} |`
    })
    tableStr += `
    |`
    headers.forEach(head => {
        tableStr += ` --- |`
    })
    tableStr += `
    |`
    headers.forEach(head => {
        tableStr += `  |`
    })

    return {
        markdown: tableStr,
        size: [2, headers.length]
    }
}

export const addTableRow = (table: TableType) => {

}

export const addTableColumn = (table: TableType) => {

}

export const delTableRow = (table: TableType) => {

}

export const delTableColumn = (table: TableType) => {

}

export const insertTableElement = (cell: [number, number]) => {

}

export const tableInHTML = (table: TableType) => {

}


export const addCode = (code: CodeType) => {
    return `\`\`\`${code.lang}
    ${code.text}
    \`\`\``
}

/**LIST */

// export const createList = (list: ListType) => {
//     const {items, type} = list
//     str = ""
//     list.items.forEach(item => {
//         if ()
//     })
// }

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