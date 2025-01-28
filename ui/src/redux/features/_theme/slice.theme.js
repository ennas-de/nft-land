import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    themeConfig: {
        mode: 'light',
        stickyHeader: true,
        pageTransitions: false,
        fontFamily: 'Rubik',
        borderRadius: 2
    }
}

const THEME_CONFIG_KEY = 'NEXT_ROUND_THEME_DATA';

const getInitialState= () => {
    const localStorageData = localStorage.getItem(THEME_CONFIG_KEY);
    if (localStorageData) {
        return {
            themeConfig: JSON.parse(localStorageData)
        }
    }

    return initialState;
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: getInitialState(),
    reducers: {
        setDefaultConfig: (state) => {
            state.themeConfig = initialState.themeConfig;
        },
        setConfig: (state, action) => {
            state.themeConfig = action.payload;
        },
        setConfigKey: (state, action) => {
            state.themeConfig[action.payload.key] = action.payload.value;
        }
    }
})

export const {setConfig, setDefaultConfig, setConfigKey} = themeSlice.actions;

export default themeSlice.reducer;