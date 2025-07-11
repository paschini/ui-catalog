import { createUseStyles } from 'react-jss';
import type { ThemeProps } from './WebUnifiTheme.tsx';
import Header from './header/Header';
import Menu from './menu/Menu';
import Main from './main/Main';
import { GlobalContext, initialValue } from './globalContext';
import { useReducer } from 'react';
import { globalReducer } from './globalReducer';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  layout: {
    display: 'grid',
    overflow: 'hidden',
    gridTemplateColumns: '100vw',
    gridTemplateRows: '52px 80px calc(100vh - 108px)',
    gridTemplateAreas: `
      "header"
      "menu"
      "main" 
    `,
    backgroundColor: theme.color.natural,
    fontFamily: theme.fontFamily,
    fontSize: '14px',
    fontStyle: 'normal',
    color: theme.color.text2,
    scrollbarColor: `${theme.color.neutral02} ${theme.color.natural}`
  }
}));

function App() {
  const styles = useStyles();
  const [globalState, globalDispatch] = useReducer(globalReducer, initialValue.globalState);

  return (
    <GlobalContext value={{ globalState, globalDispatch }}>
      <div className={styles.layout}>
        <Header />
        <Menu />
        <Main />
      </div>
    </GlobalContext>
  );
}

export default App;
