import { Button, Menu, Tooltip } from '@mantine/core';
import { IconCopy, IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';

import { TColumn } from '../../Board/Board.types';
import styles from './MenuOption.module.css';

type Props = {
  elementList: TColumn[];
  onUpdateElementList: (updatedColumns: TColumn[]) => void;
  element: TColumn;
  isOpenOption: boolean;
  setIsOpenOption: React.Dispatch<React.SetStateAction<boolean>>;
  overlay?: boolean;
  icon?: React.ReactNode;
};

const MenuOption = ({
  elementList,
  onUpdateElementList,
  element,
  isOpenOption,
  setIsOpenOption,
  overlay,
  icon,
}: Props) => {
  const test = () => {
    console.log('test');
  };

  const handleOpen = () => {
    setIsOpenOption((prev) => !prev);
  };

  const handleRename = () => {
    console.log('Rename');
    setIsOpenOption(false);
  };

  const handleDuplicate = () => {
    console.log('Duplicate');
    setIsOpenOption(false);
  };

  const handleDelete = () => {
    console.log('Delete');
    onUpdateElementList(elementList.filter((el) => el.id !== element.id));
    setIsOpenOption(false);
  };
  return (
    <Menu withinPortal={true} transitionProps={{ transition: 'pop' }}>
      <Menu.Target>
        <Tooltip label="Options">
          {/* <ActionIcon
            className={styles['menu__option-opening']}
            onClick={handleOpen}
            variant="default"
          >
            {icon ? icon : <IconDotsVertical className={styles['menu__option-icon']} />}
          </ActionIcon> */}
          <Button>
            {icon ? icon : <IconDotsVertical className={styles['menu__option-icon']} />}
          </Button>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Options</Menu.Label>

        <Menu.Item
          onClick={handleRename}
          leftSection={<IconEdit className={styles['menu__option-icon']} />}
        >
          Rename
        </Menu.Item>
        <Menu.Item
          onClick={handleDuplicate}
          leftSection={<IconCopy className={styles['menu__option-icon']} />}
        >
          Duplicate
        </Menu.Item>
        <Menu.Item
          onClick={handleDelete}
          color="red"
          leftSection={<IconTrash className={styles['menu__option-icon']} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuOption;
