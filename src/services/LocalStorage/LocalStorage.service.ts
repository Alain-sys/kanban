import { TBoardList } from "../../components/MenuBoard/MenuBoard.types";

export const getLocalStorageBoardList = (): TBoardList => {
  const savedBoards = localStorage.getItem('boardList');
  return savedBoards ? JSON.parse(savedBoards) : [];
};
