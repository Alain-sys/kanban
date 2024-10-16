import { useState } from 'react';
import { TBoardList } from '../../MenuBoard/MenuBoard.types';
import MenuOption from '../../shared/MenuOption/MenuOption';
import { TBoard, TColumn } from '../Board.types';
import styles from './Column.module.css';

type Props = {
  setBoardList: React.Dispatch<React.SetStateAction<TBoardList>>;
  currentBoard: TBoard;
  column: TColumn;
};

const Column = ({ setBoardList, currentBoard, column }: Props) => {
  const [isOpenOption, setIsOpenOption] = useState(false);

  const handleUpdateColumnList = (updatedColumns: TColumn[]) => {
    setBoardList((prevBoardList) =>
      prevBoardList.map((board) =>
        board.id === currentBoard.id ? { ...board, columns: updatedColumns } : board
      )
    );
  };

  return (
    <div
      className={styles.board__list}
      style={{ border: '1px solid red', height: '400px', width: '200px' }}
    >
      <h3>Untitled ({column.tasks.length})</h3>
      <MenuOption
        elementList={currentBoard.columns}
        onUpdateElementList={handleUpdateColumnList}
        element={column}
        isOpenOption={isOpenOption}
        setIsOpenOption={setIsOpenOption}
        overlay={false}
      />
      <div>
        {column.tasks && column.tasks.length > 0 ? (
          column.tasks.map((task) => (
            <>
              <div key={task.id} className={styles.board__task}>
                <p>{task.title}</p>
              </div>
              <button>add task</button>
            </>
          ))
        ) : (
          <button>Create your first task</button>
        )}
      </div>
    </div>
  );
};

export default Column;
