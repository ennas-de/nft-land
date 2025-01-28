import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback
} from "react";
import {toast} from "react-hot-toast";

const Context = createContext([]);

export const StateContext = ({children}) => {
    const [navigation, setNavigation] = useState([]);
    const [nrUser, setNRUser] = useState(null);
    const [themeMode, setThemeMode] = useState('light');

    return (
        <Context.Provider value={{
            navigation,
            setNavigation,
            nrUser,
            setNRUser,
            themeMode,
            setThemeMode
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);