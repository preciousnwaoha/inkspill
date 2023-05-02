import React, { useState, useCallback } from 'react';
import EditableBlock from './EditableBlock';
import { setCaretToEnd, uid } from '@/utils/helpers';

interface Block {
  id: string;
  html: string;
  tag: string;
}

interface CurrentBlock {
  id: string;
  ref: HTMLElement;
}

const EditablePage: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: uid(), html: '', tag: 'p' },
  ]);

  const updatePageHandler = useCallback((updatedBlock: Block) => {
    setBlocks((prevBlocks) => {
      const index = prevBlocks.map((b) => b.id).indexOf(updatedBlock.id);
      const updatedBlocks = [...prevBlocks];
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        tag: updatedBlock.tag,
        html: updatedBlock.html,
      };
      return updatedBlocks;
    });
  }, []);

  const addBlockHandler = useCallback((currentBlock: CurrentBlock) => {
    const newBlock = { id: uid(), html: '', tag: 'p' };
    setBlocks((prevBlocks) => {
      const index = prevBlocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...prevBlocks];
      updatedBlocks.splice(index + 1, 0, newBlock);
      return updatedBlocks;
    });
    setTimeout(() => {
      (currentBlock.ref.nextElementSibling as HTMLElement)?.focus();
    }, 0);
  }, []);

  const deleteBlockHandler = useCallback((currentBlock: CurrentBlock) => {
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      setBlocks((prevBlocks) => {
        const index = prevBlocks.map((b) => b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...prevBlocks];
        updatedBlocks.splice(index, 1);
        return updatedBlocks;
      });
      setTimeout(() => {
        setCaretToEnd(previousBlock as HTMLElement);
        (previousBlock as HTMLElement).focus();
      }, 0);
    }
  }, []);

  return (
    <div className="Page">
      {blocks.map((block, key) => (
        <EditableBlock
          key={key}
          id={block.id}
          tag={block.tag}
          html={block.html}
          updatePage={updatePageHandler}
          addBlock={addBlockHandler}
          deleteBlock={deleteBlockHandler}
        />
      ))}
    </div>
  );
};

export default EditablePage;