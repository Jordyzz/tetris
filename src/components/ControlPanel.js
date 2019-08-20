import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const ControlPanel = ({ start, pause, resume, reset }) => {
    const classes = useStyles();
    return <div className="tetris-controls">
                    <Button variant="outlined" color="primary" className={classes.button} onClick={start}>START</Button>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={reset}>RESET</Button>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={pause}>PAUSE</Button>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={resume}>RESUME</Button>
            </div>
}

export default ControlPanel;