import { Button } from '@mantine/core';
import { IconLayoutKanbanFilled, IconTablePlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../Board/Board.types';
import BoardItem from './BoardItem/BoardItem';
import ButtonVisibilityMenu from './ButtonVisibilityMenu/ButtonVisibilityMenu';
import styles from './MenuBoard.module.css';
import { BoardList } from './MenuBoard.types';

const getLocalStorageBoardList = (): BoardList => {
  const savedBoards = localStorage.getItem('boardList');
  return savedBoards ? JSON.parse(savedBoards) : [];
};

const MenuBoard = () => {
  const [boardList, setBoardList] = useState<BoardList>(getLocalStorageBoardList);
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

  return (
    <div className={`${styles.menu} ${isOpenMenu ? styles['menu--open'] : styles['menu--close']}`}>
      <div className={styles.menu__container_title}>
        <IconLayoutKanbanFilled className={styles.menu__icon} size={34} />
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
          <BoardItem
            key={board.id}
            boardList={boardList}
            setBoardList={setBoardList}
            board={board}
          />
        ))}
      </div>
      <span className={styles.menu__divider}></span>
      <ButtonVisibilityMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
    </div>
  );
};

export default MenuBoard;
