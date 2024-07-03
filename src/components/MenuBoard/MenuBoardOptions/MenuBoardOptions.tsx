import { BoardList } from '../MenuBoard.types';
import styles from './MenuBoardOptions.module.css';

type Props = {
  boardList: BoardList;
  setBoardList: React.Dispatch<React.SetStateAction<BoardList>>;
  boardId: string;
};

const MenuBoardOptions = ({ boardList, setBoardList, boardId }: Props) => {
  const handleDeleteBoard = () => {
    setBoardList(boardList.filter((board) => board.id != boardId));
  };

  return (
    <div>
      <div className={styles.menu__boardOptions}>
        <button type="button">Rename</button>
        <button type="button">Duplicate</button>
        <button type="button" onClick={handleDeleteBoard}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MenuBoardOptions;
