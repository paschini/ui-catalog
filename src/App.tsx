import { createUseStyles } from 'react-jss';
import type { ThemeProps } from './WebUnifiTheme.tsx';
import Header from './header/Header.tsx';
import Menu from './menu/Menu.tsx';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  layout: {
    display: 'grid',
    overflow: 'hidden',
    gridTemplateColumns: 'minmax(max-content, 220px) auto',
    gridTemplateRows: 'min-content calc(100vh - 80px)',
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
  },
  main: {
    gridArea: 'main',
    width: '100vw',
    height: 'calc(100vh - 144px)'
  }
}));

function App() {
  const styles = useStyles();

  return (
    <div className={styles.layout}>
      <Header />
      <Menu />
    </div>
  );
}

export default App;
