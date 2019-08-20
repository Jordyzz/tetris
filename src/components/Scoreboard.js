import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
      minWidth: 275,
      marginLeft: 50,
      marginTop: 100
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    gameover: {
      marginTop: 30,
      textAlign: 'center'
    }
  });

const Scoreboard = ({ score, level, gameover }) => {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Level {level}
                </Typography>
                <Typography variant="h5" component="h2">
                {score}
                </Typography>
              </CardContent>
            </Card>
            {gameover && <Typography className={classes.gameover} variant="h5" component="h2">GAME OVER!</Typography>} 
        </div>
        
    );
}

export default Scoreboard;