import { ActionIcon, Menu, rem, Tooltip } from '@mantine/core';
import { IconCopy, IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../../Board/Board.types';
import { BoardList } from '../MenuBoard.types';
import styles from './MenuBoardOptions.module.css';

type Props = {
  isOpenBoardOptionsById: string | null;
  boardList: BoardList;
  setBoardList: React.Dispatch<React.SetStateAction<BoardList>>;
  board: Board;
  setEditingBoardById: React.Dispatch<React.SetStateAction<string | null>>;
  setIsOpenBoardOptionsById: React.Dispatch<React.SetStateAction<string | null>>;
  setIsEditingBoardTitle: React.Dispatch<React.SetStateAction<string>>;
};

const MenuBoardOptions = ({
  isOpenBoardOptionsById,
  boardList,
  setBoardList,
  board,
  setEditingBoardById,
  setIsOpenBoardOptionsById,
  setIsEditingBoardTitle,
}: Props) => {
  const handleRenameBoard = () => {
    setEditingBoardById(board.id);
    setIsEditingBoardTitle(board.title);
    setIsOpenBoardOptionsById(null);
  };

  const handleDuplicateBoard = () => {
    setBoardList([...boardList, { ...board, id: uuidv4() }]);
    setIsOpenBoardOptionsById(null);
  };

  const handleDeleteBoard = () => {
    setBoardList(boardList.filter((item) => item.id != board.id));
    setIsOpenBoardOptionsById(null);
  };

  const handleMenuToggle = () => {
    if (isOpenBoardOptionsById === board.id) {
      setIsOpenBoardOptionsById(null);
    } else {
      setIsOpenBoardOptionsById(board.id);
    }
  };

  return (
    <>
      {isOpenBoardOptionsById === board.id && (
        <div className={styles.overlay} onClick={() => setIsOpenBoardOptionsById(null)} />
      )}
      <Menu
        opened={isOpenBoardOptionsById === board.id}
        onClose={() => setIsOpenBoardOptionsById(null)}
        transitionProps={{ transition: 'pop' }}
      >
        <Menu.Target>
          <Tooltip label="Options">
            <ActionIcon onClick={handleMenuToggle} variant="default" aria-label="Open board option">
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
