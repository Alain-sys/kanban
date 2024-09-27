import { BoardList } from "../components/MenuBoard/MenuBoard.types";

export const getLocalStorageBoardList = (): BoardList => {
  const savedBoards = localStorage.getItem('boardList');
  return savedBoards ? JSON.parse(savedBoards) : [];
};
