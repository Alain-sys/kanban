import { Button, TextInput, Tooltip } from '@mantine/core';
import { IconChevronsLeft, IconLayoutKanbanFilled, IconTablePlus } from '@tabler/icons-react';
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
  const [isHoverBoardById, setIsHoverBoardById] = useState<string | null>(null);

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

  const handleMouseOver = (boardId: string) => {
    setIsHoverBoardById(boardId);
  };

  const handleMouseOut = () => {
    console.log('onMouseOut');
    setIsHoverBoardById(null);
    setIsOpenBoardOptionsById(null);
  };

  // console.log('currentBoardList', boardList);
  return (
    <div className={`${styles.menu} ${isOpenMenu ? styles['menu--open'] : styles['menu--close']}`}>
      <div className={styles.menu__container_title}>
        <IconLayoutKanbanFilled size={34} color="#635FC7" />
        <h1 className={styles.menu__title}>Kanban</h1>
      </div>
      <div className={styles.menu__add_board}>
        <p className={styles.menu__information}>
          All boards ({boardList.length > 0 ? boardList.length : 0})
        </p>
        <Button
          onClick={handleAddBoard}
          variant="default"
          style={{ marginBottom: '1rem', position: 'static' }}
        >
          <IconTablePlus size={16} style={{ marginRight: '8px' }} />
          Create New Board
        </Button>
      </div>
      <div className={styles.menu__scroll}>
        {boardList.map((board) => (
          <div
            key={board.id}
            className={styles.menu__board}
            tabIndex={0}
            onMouseOver={() => handleMouseOver(board.id)}
            {...(isHoverBoardById !== board.id && { onMouseOut: handleMouseOut })}
          >
            {editingBoardId === board.id ? (
              <TextInput
                className={styles.menu__board__input}
                type="text"
                value={isEditingBoardTitle}
                onChange={handleEditTitleChange}
                onKeyDown={(event) => handleKeyPress(event, board.id)}
                onBlur={() => handleSaveTitle(board.id)}
                autoFocus
                placeholder="Untitled"
              />
            ) : (
              <>
                <p>{board.title}</p>
                {isHoverBoardById === board.id && (
                  <MenuBoardOptions
                    isOpenBoardOptionsById={isOpenBoardOptionsById}
                    boardList={boardList}
                    setBoardList={setBoardList}
                    board={board}
                    setEditingBoardById={setEditingBoardById}
                    setIsEditingBoardTitle={setIsEditingBoardTitle}
                    setIsOpenBoardOptionsById={setIsOpenBoardOptionsById}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div className={styles.menu__button_container}>
        <Tooltip label={isOpenMenu ? 'Close' : 'Open'}>
          <Button
            type="button"
            className={`${styles.menu__button} ${isOpenMenu ? styles['menu__button--close'] : styles['menu__button--open']}`}
            onClick={handleVisibilityMenu}
          >
            <IconChevronsLeft
              className={`${styles.menu__button_icon} ${isOpenMenu ? styles['menu__button_icon--close'] : styles['menu__button_icon--open']}`}
            />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default MenuBoard;
