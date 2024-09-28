import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
interface MyContextType {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  reqFilter: string;
  setReqFilter: Dispatch<SetStateAction<string>>;
  anexoSelected: string;
  setAnexoSelected: Dispatch<SetStateAction<string>>;
}

export const MyContext = createContext<MyContextType>({
  selectedOption: "",
  setSelectedOption: () => {},
  reqFilter: "",
  setReqFilter: () => {},
  anexoSelected: "",
  setAnexoSelected: () => {},
});

export const MyProvider = ({ children }: any) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [reqFilter, setReqFilter] = useState("");
  const [anexoSelected, setAnexoSelected] = useState("");

  return (
    <MyContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
        reqFilter,
        setReqFilter,
        anexoSelected,
        setAnexoSelected,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
