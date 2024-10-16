import { Button, ScrollArea } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TBoardList } from '../MenuBoard/MenuBoard.types';
import styles from './Board.module.css';
import { TColumn } from './Board.types';
import Column from './Column/Column';

type Props = {
  boardList: TBoardList;
  setBoardList: React.Dispatch<React.SetStateAction<TBoardList>>;
  boardId: string | null;
};

const Board = ({ boardList, setBoardList, boardId }: Props) => {
  const currentBoard = useMemo(() => {
    return boardId
      ? boardList.find((board) => board.id === boardId)
      : boardList.length > 0
        ? boardList[0]
        : null;
  }, [boardId, boardList]);

  console.log('currentBoard', currentBoard);

  const handleClickAddColumn = () => {
    if (!currentBoard) return;

    const newColumn: TColumn = {
      id: uuidv4(),
      title: 'Untitled',
      tasks: [],
    };

    setBoardList((prevBoardList) =>
      prevBoardList.map((board) =>
        board.id === currentBoard.id ? { ...board, columns: [...board.columns, newColumn] } : board
      )
    );
  };

  return (
    <div className={styles.board}>
      {currentBoard ? (
        <>
          <div className={styles['board__title-container']}>
            <h2 className={styles.board__title}>{currentBoard.title}</h2>
          </div>
          <div className={styles.board__content}>
            {currentBoard.columns && currentBoard.columns.length > 0 ? (
              <ScrollArea className={styles['board__column-scroll']} offsetScrollbars={'x'}>
                <div className={styles['board__column-container']}>
                  {currentBoard.columns.map((column) => (
                    <Column
                      key={column.id}
                      setBoardList={setBoardList}
                      currentBoard={currentBoard}
                      column={column}
                    />
                  ))}
                  <button
                    className={styles['board__column-button--add']}
                    onClick={handleClickAddColumn}
                  >
                    <IconPlus className={styles['board__column-button__icon']} />
                  </button>
                </div>
              </ScrollArea>
            ) : (
              <div className={styles['board__content__add-board-container']}>
                <p className={styles.board__content__text}>
                  This board is empty. Create a new column to get started.
                </p>
                <Button
                  className={styles['board__content__column--add']}
                  onClick={handleClickAddColumn}
                  variant="default"
                >
                  Add a new column
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.board__empty}>
          <p className={styles.board__empty__description}>
            Create or select a board for getting started
          </p>
        </div>
      )}
    </div>
  );
};

export default Board;
