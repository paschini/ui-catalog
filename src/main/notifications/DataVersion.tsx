import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  dataInfo: {
    width: 'max-content',
    margin: '20px 40px',
    alignSelf: 'end',
    justifyContent: 'left'
  }
});

type DataVersionProps = {
  version: string;
  lastModified: string;
};

const DataVersion = (props: DataVersionProps) => {
  const styles = useStyles();
  const { version, lastModified } = props;

  return (
    <div className={styles.dataInfo}>
      <div>
        <div>{`Data version: ${version}`}</div>
        <div>{`Date modified: ${lastModified}`}</div>
      </div>
    </div>
  );
};

export default DataVersion;
