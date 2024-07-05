import { Board } from '../../Board/Board.types';
import { BoardList } from '../MenuBoard.types';
import styles from './MenuBoardOptions.module.css';

type Props = {
  boardList: BoardList;
  setBoardList: React.Dispatch<React.SetStateAction<BoardList>>;
  board: Board;
  setEditingBoardById: React.Dispatch<React.SetStateAction<string | null>>;
  setIsOpenBoardOptionsById: React.Dispatch<React.SetStateAction<string | null>>;
  setIsEditingBoardTitle: React.Dispatch<React.SetStateAction<string>>;
};

const MenuBoardOptions = ({
  boardList,
  setBoardList,
  board,
  setEditingBoardById,
  setIsOpenBoardOptionsById,
  setIsEditingBoardTitle,
}: Props) => {
  const handleDeleteBoard = () => {
    setBoardList(boardList.filter((item) => item.id != board.id));
    setIsOpenBoardOptionsById(null);
  };

  const handleRenameBoard = () => {
    setEditingBoardById(board.id);
    setIsEditingBoardTitle(board.title);
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
