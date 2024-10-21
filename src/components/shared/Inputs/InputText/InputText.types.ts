
export type TInputText = {
  inputText: {
    text: string;
    isEditing: boolean;
  };
  setInputText: React.Dispatch<
    React.SetStateAction<{
      text: string;
      isEditing: boolean;
    }>
  >;

  handleSaveTitle: () => void;
};
