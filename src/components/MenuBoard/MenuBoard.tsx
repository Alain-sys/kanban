import { Button, TextInput } from '@mantine/core';
import { IconLayoutKanbanFilled, IconTablePlus } from '@tabler/icons-react';
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
  const [editingBoardId, setEditingBoardById] = useState<string | null>(null);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(true);

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

  const handleEditTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditingBoardTitle(event.target.value);
  };

  const handleSaveTitle = (boardId: string) => {
    setBoardList(
      boardList.map((board) =>
        board.id === boardId
          ? {
              ...board,
              title: isEditingBoardTitle.trim() || 'Untitled',
            }
          : board
      )
    );
    setEditingBoardById(null);
    setIsEditingBoardTitle('');
  };

  const handleKeyPress = (event: React.KeyboardEvent, boardId: string) => {
    if (event.key === 'Enter') {
      handleSaveTitle(boardId);
    }
  };

  const handleVisibilityMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  console.log('currentBoardList', boardList);
  return (
    <div className={isOpenMenu ? styles['menu--active'] : styles.menu}>
      <div className={styles.menu__container_title}>
        <IconLayoutKanbanFilled size={34} color="#635FC7" />
        <h1 className={styles.menu__title}>Kanban</h1>
      </div>
      <div className={styles.menu__add_board}>
        <p>All boards ({boardList.length > 0 ? boardList.length : 0})</p>
        <Button
          onClick={handleAddBoard}
          leftSection={<IconTablePlus size={16} />}
          variant="default"
          style={{ marginBottom: '1rem' }}
        >
          Create New Board
        </Button>
      </div>
      <div className={styles.menu__scroll}>
        {boardList.map((board) => (
          <div key={board.id} className={styles.menu__board}>
            <div>
              {editingBoardId === board.id ? (
                <TextInput
                  type="text"
                  value={isEditingBoardTitle}
                  onChange={handleEditTitleChange}
                  onKeyDown={(event) => handleKeyPress(event, board.id)}
                  onBlur={() => handleSaveTitle(board.id)}
                  autoFocus
                  label="Board Name"
                  placeholder="Untitled"
                  withAsterisk
                  autoComplete="off"
                />
              ) : (
                <h2>{board.title}</h2>
              )}
            </div>
            <MenuBoardOptions
              isOpenBoardOptionsById={isOpenBoardOptionsById}
              boardList={boardList}
              setBoardList={setBoardList}
              board={board}
              setEditingBoardById={setEditingBoardById}
              setIsEditingBoardTitle={setIsEditingBoardTitle}
              setIsOpenBoardOptionsById={setIsOpenBoardOptionsById}
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={handleVisibilityMenu}>
        {isOpenMenu ? 'Close' : 'Open'}
      </button>
    </div>
  );
};

export default MenuBoard;
