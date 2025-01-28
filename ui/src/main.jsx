import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
// import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./redux/app/store";
import {CssBaseline} from "@mui/material";
import './index.css';
import App from './App';

import '@/assets/css/style.css';

import '@fontsource/rubik/300.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/700.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
          <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
