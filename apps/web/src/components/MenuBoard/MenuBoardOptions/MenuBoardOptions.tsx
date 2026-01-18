import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { IconCopy, IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
import { TBoard } from '../../Board/Board.types';
import { TBoardList } from '../MenuBoard.types';
import styles from './MenuBoardOptions.module.css';

type Props = {
  isOpenBoardOptions: boolean;
  boardList: TBoardList;
  setBoardList: React.Dispatch<React.SetStateAction<TBoardList>>;
  board: TBoard;
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
    setBoardList([...boardList, { ...board, title: `${board.title} copie`, id: uuidv4() }]);
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
      {isOpenBoardOptions && (
        <div className={styles['menu__board__option-overlay']} onClick={handleClickOverlay} />
      )}
      <Menu opened={isOpenBoardOptions} withinPortal={true} transitionProps={{ transition: 'pop' }}>
        <Menu.Target>
          <Tooltip label="Options">
            <ActionIcon
              className={styles['menu__board__option-opening']}
              onClick={handleOpenBoardOptions}
              variant="default"
            >
              <IconDots className={styles['menu__board__option-icon']} />
            </ActionIcon>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown className={styles['menu__board__option-dropdown']}>
          <Menu.Label>Options</Menu.Label>
          <Menu.Item
            onClick={handleRenameBoard}
            leftSection={<IconEdit className={styles['menu__board__option-icon']} />}
          >
            Rename
          </Menu.Item>
          <Menu.Item
            onClick={handleDuplicateBoard}
            leftSection={<IconCopy className={styles['menu__board__option-icon']} />}
          >
            Duplicate
          </Menu.Item>
          <Menu.Item
            onClick={handleDeleteBoard}
            color="red"
            leftSection={<IconTrash className={styles['menu__board__option-icon']} />}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default MenuBoardOptions;
