import { ActionIcon, Menu, rem, Tooltip } from '@mantine/core';
import { IconCopy, IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../../Board/Board.types';
import { BoardList } from '../MenuBoard.types';
import styles from './MenuBoardOptions.module.css';

type Props = {
  isOpenBoardOptions: boolean;
  boardList: BoardList;
  setBoardList: React.Dispatch<React.SetStateAction<BoardList>>;
  board: Board;
  setEditingBoard: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenBoardOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditingBoardTitle: React.Dispatch<React.SetStateAction<string>>;
};

const MenuBoardOptions = ({
  isOpenBoardOptions,
  setIsOpenBoardOptions,
  boardList,
  setBoardList,
  board,
  setEditingBoard,
  setIsEditingBoardTitle,
}: Props) => {
  const handleRenameBoard = () => {
    setEditingBoard(true);
    setIsEditingBoardTitle(board.title);
    setIsOpenBoardOptions(false);
  };

  const handleDuplicateBoard = () => {
    setBoardList([...boardList, { ...board, id: uuidv4() }]);
    setIsOpenBoardOptions(false);
  };

  const handleDeleteBoard = () => {
    setBoardList(boardList.filter((item) => item.id !== board.id));
    setIsOpenBoardOptions(false);
  };

  const handleOpenBoardOptions = () => {
    setIsOpenBoardOptions(true);
  };

  const handleCloseBoardOptions = () => {
    setIsOpenBoardOptions(false);
  };

  return (
    <>
      {isOpenBoardOptions && (
        <div className={styles.overlay} onClick={() => setIsOpenBoardOptions(false)} />
      )}
      <Menu
        onOpen={handleOpenBoardOptions}
        onClose={handleCloseBoardOptions}
        transitionProps={{ transition: 'pop' }}
      >
        <Menu.Target>
          <Tooltip label="Options">
            <ActionIcon variant="default" aria-label="Open board option">
              <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Options</Menu.Label>
          <Menu.Item
            onClick={handleRenameBoard}
            leftSection={<IconEdit style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          >
            Rename
          </Menu.Item>
          <Menu.Item
            onClick={handleDuplicateBoard}
            leftSection={<IconCopy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          >
            Duplicate
          </Menu.Item>
          <Menu.Item
            onClick={handleDeleteBoard}
            color="red"
            leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default MenuBoardOptions;
