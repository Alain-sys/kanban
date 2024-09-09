import { Button, Tooltip } from '@mantine/core';
import { IconChevronsLeft } from '@tabler/icons-react';
import styles from './ButtonVisibilityMenu.module.css';

type Props = {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const ButtonVisibilityMenu = ({ isOpenMenu, setIsOpenMenu }: Props) => {
  const handleVisibilityMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  return (
    <div className={styles.menu__button_container}>
      <Tooltip label={isOpenMenu ? 'Close' : 'Open'}>
        <Button
          type="button"
          className={`${styles.menu__button} ${isOpenMenu ? styles['menu__button--close'] : styles['menu__button--open']}`}
          onClick={handleVisibilityMenu}
        >
          <IconChevronsLeft
            className={`${styles.menu__button_icon} ${isOpenMenu ? styles['menu__button_icon--close'] : styles['menu__button_icon--open']}`}
          />
        </Button>
      </Tooltip>
    </div>
  );
};

export default ButtonVisibilityMenu;
