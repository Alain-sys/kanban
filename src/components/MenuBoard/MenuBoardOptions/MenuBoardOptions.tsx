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
  setIsHoverBoard: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuBoardOptions = ({
  isOpenBoardOptions,
  setIsOpenBoardOptions,
  boardList,
  setBoardList,
  board,
  setEditingBoard,
  setIsEditingBoardTitle,
  setIsHoverBoard,
}: Props) => {
  const handleClickOverlay = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpenBoardOptions(false);
    setIsHoverBoard(false);
  };

  const handleRenameBoard = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingBoard(true);
    setIsEditingBoardTitle(board.title);
    setIsOpenBoardOptions(false);
  };

  const handleDuplicateBoard = (event: React.MouseEvent) => {
    event.stopPropagation();
    setBoardList([...boardList, { ...board, id: uuidv4() }]);
    setIsOpenBoardOptions(false);
  };

  const handleDeleteBoard = (event: React.MouseEvent) => {
    event.stopPropagation();
    setBoardList(boardList.filter((item) => item.id !== board.id));
    setIsOpenBoardOptions(false);
  };

  const handleOpenBoardOptions = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isOpenBoardOptions) {
      setIsOpenBoardOptions(false);
      return;
    }
    setIsOpenBoardOptions(true);
  };

  return (
    <>
      {isOpenBoardOptions && <div className={styles.overlay} onClick={handleClickOverlay} />}
      <Menu
        opened={isOpenBoardOptions}
        withinPortal={false}
        transitionProps={{ transition: 'pop' }}
      >
        <Menu.Target>
          <Tooltip label="Options">
            <ActionIcon
              className={styles['button--options']}
              onClick={handleOpenBoardOptions}
              variant="default"
            >
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
