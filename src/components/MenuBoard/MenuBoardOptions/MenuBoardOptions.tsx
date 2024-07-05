import { BoardList } from '../MenuBoard.types';
import styles from './MenuBoardOptions.module.css';

type Props = {
  boardList: BoardList;
  setBoardList: React.Dispatch<React.SetStateAction<BoardList>>;
  boardId: string;
  setEditingBoardId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsOpenBoardOptionsById: React.Dispatch<React.SetStateAction<string | null>>;
};

const MenuBoardOptions = ({
  boardList,
  setBoardList,
  boardId,
  setEditingBoardId,
  setIsOpenBoardOptionsById,
}: Props) => {
  const handleDeleteBoard = () => {
    setBoardList(boardList.filter((board) => board.id != boardId));
    setIsOpenBoardOptionsById(null);
  };

  const handleRenameBoard = () => {
    setEditingBoardId(boardId);
    setIsOpenBoardOptionsById(null);
  };

  return (
    <div>
      <div className={styles.menu__boardOptions}>
        <button type="button" onClick={handleRenameBoard}>
          Rename
        </button>
        <button type="button">Duplicate</button>
        <button type="button" onClick={handleDeleteBoard}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MenuBoardOptions;
