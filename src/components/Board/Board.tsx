import { getLocalStorageBoardList } from '../../utils/boardLocalStorage';
import styles from './Board.module.css';

type Props = {
  boardId: string | null;
};

const Board = ({ boardId }: Props) => {
  const board = boardId ? getLocalStorageBoardList().find((board) => board.id === boardId) : null;
  return (
    <div className={styles.board}>
      <div>
        <h1>{board ? board.title : 'exemple'}</h1>
      </div>
    </div>
  );
};

export default Board;
