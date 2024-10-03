import { TColumn } from '../Board.types';
import styles from './Column.module.css';

type Props = {
  column: TColumn;
};

const Column = ({ column }: Props) => {
  return (
    <div
      className={styles.board__list}
      style={{ border: '1px solid red', height: '400px', width: '200px' }}
    >
      <p>I'm a List </p>
    </div>
  );
};

export default Column;
