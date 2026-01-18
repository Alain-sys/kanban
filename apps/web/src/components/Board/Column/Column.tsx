import { useState } from 'react';
import { TBoardList } from '../../MenuBoard/MenuBoard.types';
import ButtonOption from '../../shared/Buttons/ButtonOption/ButtonOption';
import InputText from '../../shared/Inputs/InputText/InputText';
import { TBoard, TColumn } from '../Board.types';
import styles from './Column.module.css';
type Props = {
  setBoardList: React.Dispatch<React.SetStateAction<TBoardList>>;
  currentBoard: TBoard;
  column: TColumn;
};

const Column = ({ setBoardList, currentBoard, column }: Props) => {
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [inputText, setInputText] = useState<{ text: string; isEditing: boolean }>({
    text: '',
    isEditing: false,
  });
  const handleSaveTitle = () => {
    if (inputText.text !== currentBoard.title) {
      console.log(inputText);
      setBoardList((prev) =>
        prev.map((boardItem) =>
          boardItem.id === currentBoard.id
            ? {
                ...boardItem,
                columns: boardItem.columns.map((columnItem) =>
                  columnItem.id === column.id
                    ? { ...columnItem, title: inputText.text.trim() || 'Untitled' }
                    : columnItem
                ),
              }
            : boardItem
        )
      );
      setInputText({ text: '', isEditing: false });
    }
  };

  const handleUpdateColumnList = (updatedColumns: TColumn[]) => {
    console.log('updatedColumns', updatedColumns);
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
      <div>
        {inputText.isEditing ? (
          <InputText
            inputText={inputText}
            setInputText={setInputText}
            handleSaveTitle={handleSaveTitle}
          />
        ) : (
          <h3 onClick={() => setInputText({ ...inputText, isEditing: true })}>{column.title}</h3>
        )}
        <p>({column.tasks.length})</p>
      </div>
      <ButtonOption
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
