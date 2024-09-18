import { useState } from 'react';
import Board from './components/Board/Board';
import MenuBoard from './components/MenuBoard/MenuBoard';
import styles from './styles/App.module.css';

function App() {
  const [boardId, setBoardId] = useState<string | null>(null);

  return (
    <div className={styles.app}>
      <MenuBoard boardId={boardId} setBoardId={setBoardId} />
      <Board boardId={boardId} />
    </div>
  );
}

export default App;
