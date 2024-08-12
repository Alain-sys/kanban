import { TextInput } from '@mantine/core';
import { useState } from 'react';
import { Board } from '../../Board/Board.types';
import { BoardList } from '../MenuBoard.types';
import MenuBoardOptions from '../MenuBoardOptions/MenuBoardOptions';
import styles from './BoardItem.module.css';

type Props = {
  boardList: BoardList;
  setBoardList: React.Dispatch<React.SetStateAction<BoardList>>;
  board: Board;
};

const BoardItem = ({ boardList, setBoardList, board }: Props) => {
  const [isEditingBoardTitle, setIsEditingBoardTitle] = useState<string>('');
  const [editingBoard, setEditingBoard] = useState<boolean>(false);
  const [isHoverBoard, setIsHoverBoard] = useState<boolean>(false);
  const [isOpenBoardOptions, setIsOpenBoardOptions] = useState<boolean>(false);

  const handleSaveTitle = () => {
    if (isEditingBoardTitle !== board.title) {
      const updatedBoard = { ...board, title: isEditingBoardTitle.trim() || 'Untitled' };
      const updatedBoardList = boardList.map((boardItem) =>
        boardItem.id === board.id ? updatedBoard : boardItem
      );
      setBoardList(updatedBoardList);
    }

    setEditingBoard(false);
    setIsEditingBoardTitle('');
  };

  const handleEditTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditingBoardTitle(event.target.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSaveTitle();
    }
  };

  const handleMouseEnter = () => {
    setIsHoverBoard(true);
  };

  const handleMouseLeave = () => {
    setIsHoverBoard(false);
  };

  return (
    <div
      className={styles.menu__board}
      {...(!isOpenBoardOptions && { onMouseEnter: handleMouseEnter })}
      {...(!isOpenBoardOptions && { onMouseLeave: handleMouseLeave })}
      tabIndex={0}
    >
      {editingBoard ? (
        <TextInput
          type="text"
          className={styles.menu__board__input}
          value={isEditingBoardTitle}
          onChange={handleEditTitleChange}
          onKeyDown={(event) => handleKeyPress(event)}
          onBlur={handleSaveTitle}
          autoFocus
          placeholder="Untitled"
        />
      ) : (
        <>
          <p>{board.title}</p>
          {isHoverBoard && (
            <MenuBoardOptions
              isOpenBoardOptions={isOpenBoardOptions}
              setIsOpenBoardOptions={setIsOpenBoardOptions}
              boardList={boardList}
              setBoardList={setBoardList}
              board={board}
              setEditingBoard={setEditingBoard}
              setIsEditingBoardTitle={setIsEditingBoardTitle}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BoardItem;
