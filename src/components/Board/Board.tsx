import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BoardList } from '../MenuBoard/MenuBoard.types';
import styles from './Board.module.css';
import { TColumn } from './Board.types';
import Column from './Column/Column';

type Props = {
  boardList: BoardList;
  setBoardList: React.Dispatch<React.SetStateAction<BoardList>>;
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
  console.log('currentBoard:', currentBoard);
  console.log('boardId', boardId);
  const handleClickAddColumn = () => {
    if (!currentBoard) return;

    const newList: TColumn = {
      id: uuidv4(),
      title: 'Untitled',
      tasks: [],
    };

    setBoardList((prevBoardList) =>
      prevBoardList.map((board) =>
        board.id === currentBoard.id ? { ...board, columns: [...board.columns, newList] } : board
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
              <div style={{ display: 'flex' }}>
                {currentBoard.columns.map((column) => (
                  <Column key={column.id} column={column} />
                ))}
                <button onClick={handleClickAddColumn}>+</button>
              </div>
            ) : (
              <div className={styles['content__add-board']}>
                <p>This board is empty. Create a new column to get started.</p>
                <button className={styles.board__content__addcolumn} onClick={handleClickAddColumn}>
                  add a new column
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Create a board for getting started</p>
      )}
    </div>
  );
};

export default Board;
