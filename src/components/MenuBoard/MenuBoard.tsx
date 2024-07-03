import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../Board/Board.types';
import styles from './MenuBoard.module.css';
import { BoardList } from './MenuBoard.types';
import MenuBoardOptions from './MenuBoardOptions/MenuBoardOptions';

const MenuBoard = () => {
  const [boardList, setBoardList] = useState<BoardList>([]);
  const [isOpenBoardOptionsId, setIsOpenBoardOptionsId] = useState<string | null>(null);

  const handleAddBoard = () => {
    const newBoard: Board = {
      id: uuidv4(),
      title: '',
    };

    setBoardList([...boardList, newBoard]);
  };

  const handleBoardOptions = (boardId: string) => {
    setIsOpenBoardOptionsId((prevId) => (prevId === boardId ? null : boardId));
  };

  console.log(boardList);
  return (
    <div className={styles.menu}>
      <h1>Title</h1>
      <p>All boards ({boardList.length})</p>
      <button type="button" onClick={handleAddBoard}>
        add new board
      </button>
      {boardList.map((board) => (
        <div key={board.id} className={styles.menu__board}>
          <h2>test {board.id}</h2>
          <button type="button" onClick={() => handleBoardOptions(board.id)}>
            ...
          </button>
          {isOpenBoardOptionsId === board.id && (
            <MenuBoardOptions
              boardList={boardList}
              setBoardList={setBoardList}
              boardId={board.id}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuBoard;
