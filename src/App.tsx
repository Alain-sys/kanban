import Board from './components/Board/Board';
import MenuBoard from './components/MenuBoard/MenuBoard';
import styles from './styles/App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <MenuBoard />
      <Board />
    </div>
  );
}

export default App;
