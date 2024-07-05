import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../Board/Board.types';
import styles from './MenuBoard.module.css';
import { BoardList } from './MenuBoard.types';
import MenuBoardOptions from './MenuBoardOptions/MenuBoardOptions';

const getInitialBoardList = (): BoardList => {
  const savedBoards = localStorage.getItem('boardList');
  return savedBoards ? JSON.parse(savedBoards) : [];
};

const MenuBoard = () => {
  const [boardList, setBoardList] = useState<BoardList>(getInitialBoardList);
  const [isOpenBoardOptionsById, setIsOpenBoardOptionsById] = useState<string | null>(null);
  const [isEditingBoardTitle, setIsEditingBoardTitle] = useState<string>('');
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);

  useEffect(() => {
    console.log('Saving boards to localStorage:', boardList);
    localStorage.setItem('boardList', JSON.stringify(boardList));
  }, [boardList]);

  const handleAddBoard = () => {
    const newBoard: Board = {
      id: uuidv4(),
      title: 'Untitled',
    };

    setBoardList([...boardList, newBoard]);
  };

  const handleBoardOptions = (boardId: string) => {
    setIsOpenBoardOptionsById((prevId) => (prevId === boardId ? null : boardId));
  };

  const handleEditTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditingBoardTitle(event.target.value);
  };

  const handleSaveTitle = (boardId: string) => {
    setBoardList(
      boardList.map((board) =>
        board.id === boardId
          ? { ...board, title: isEditingBoardTitle ? isEditingBoardTitle : 'Untitled' }
          : board
      )
    );
    setEditingBoardId(null);
    setIsEditingBoardTitle('');
  };

  const handleKeyPress = (event: React.KeyboardEvent, boardId: string) => {
    if (event.key === 'Enter') {
      handleSaveTitle(boardId);
    }
  };

  console.log('currentBoardList', boardList);
  return (
    <div className={styles.menu}>
      <h1>Title</h1>
      <p>All boards ({boardList.length > 0 ? boardList.length : 0})</p>
      <button type="button" onClick={handleAddBoard}>
        add new board
      </button>
      {boardList.map((board) => (
        <div key={board.id} className={styles.menu__board}>
          {editingBoardId === board.id ? (
            <input
              type="text"
              value={isEditingBoardTitle}
              onChange={handleEditTitleChange}
              onKeyDown={(event) => handleKeyPress(event, board.id)}
              onBlur={() => handleSaveTitle(board.id)}
              autoFocus
            />
          ) : (
            <h2>{board.title}</h2>
          )}
          <button type="button" onClick={() => handleBoardOptions(board.id)}>
            ...
          </button>
          {isOpenBoardOptionsById === board.id && (
            <MenuBoardOptions
              boardList={boardList}
              setBoardList={setBoardList}
              boardId={board.id}
              setEditingBoardId={setEditingBoardId}
              setIsOpenBoardOptionsById={setIsOpenBoardOptionsById}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuBoard;
