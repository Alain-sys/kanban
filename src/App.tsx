import Board from './components/Board/Board';
import BoardMenu from './components/BoardMenu/BoardMenu';
import styles from './styles/App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <BoardMenu />
      <Board />
    </div>
  );
}

export default App;
