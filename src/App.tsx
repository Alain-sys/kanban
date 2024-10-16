import { useState } from 'react';
import Board from './components/Board/Board';
import MenuBoard from './components/MenuBoard/MenuBoard';
import { TBoardList } from './components/MenuBoard/MenuBoard.types';
import { getLocalStorageBoardList } from './services/LocalStorage/LocalStorage.service';
import styles from './styles/App.module.css';

function App() {
  const [boardList, setBoardList] = useState<TBoardList>(getLocalStorageBoardList);
  const [boardId, setBoardId] = useState<string | null>(null);

  return (
    <div className={styles.app}>
      <MenuBoard
        boardList={boardList}
        setBoardList={setBoardList}
        boardId={boardId}
        setBoardId={setBoardId}
      />
      <Board boardList={boardList} setBoardList={setBoardList} boardId={boardId} />
    </div>
  );
}

export default App;
