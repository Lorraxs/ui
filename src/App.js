import './App.css';
import { Suspense, useContext, useEffect } from 'react';
import { Store } from './store/store';
import PageConfig from './PageConfig';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const { state, dispatch } = useContext(Store);
  const { pages } = state;
  const checkNuiForcus = (hasFocus, hasCursor) => {
    axios.post('https://lr_core_v2/SET_NUI_FOCUS', { hasFocus, hasCursor });
  };
  useEffect(() => {
    var hasFocus = false;
    var hasCursor = false;
    pages.forEach(n => {
      const p = PageConfig[n];
      if (p.hasCursor) hasCursor = true;
      if (p.hasFocus) hasFocus = true;
    });
    checkNuiForcus(hasFocus, hasCursor);
  }, [pages]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        className={
          process.env.NODE_ENV === 'production'
            ? 'App w-full h-full absolute'
            : 'App w-full h-full bg-black absolute'
        }
      >
        {pages.map((n, i) => {
          const Page = PageConfig[n].component;
          return (
            <div key={i} className="absolute w-full h-full top-0 left-0 text-white">
              <Suspense>
                <Page />
              </Suspense>
            </div>
          );
        })}
      </div>
      <ToastContainer pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </ThemeProvider>
  );
}

export default App;
