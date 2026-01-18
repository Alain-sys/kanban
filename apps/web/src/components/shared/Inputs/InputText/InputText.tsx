import { TextInput } from '@mantine/core';
import styles from './InputText.module.css';
import { TInputText } from './InputText.types';

const InputText = ({ inputText, setInputText, handleSaveTitle }: TInputText) => {
  const handleEditTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText({ ...inputText, text: event.target.value });
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSaveTitle();
    }
  };

  return (
    <TextInput
      type="text"
      className={styles.menu__board__input}
      value={inputText.text}
      onChange={handleEditTitleChange}
      onKeyDown={(event) => handleKeyPress(event)}
      onBlur={handleSaveTitle}
      autoFocus
      placeholder="Untitled"
      variant="Unstyled"
    />
  );
};

export default InputText;
