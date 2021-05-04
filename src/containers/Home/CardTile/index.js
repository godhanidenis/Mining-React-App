import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { homeSectionHead, homeSectionTitle } from '../../../styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
card:{
    display:'flex',
    backgroundColor:'#262626'
},
media:{
    maxHeight: '127px',
    width: '151px'
},
box:{
    display: 'flex', 
    flexDirection: 'row'
},
innerbox:{
    display: 'flex', 
    flexDirection: 'column',    
},
cardContent:{
    paddingBottom:'0px !important',
    color:'#fffffF'
},
date:{
    paddingTop:'10px',
    color:'#e0e0e0'
}
}));

const CardTile = (props) => {
  const classes = useStyles(props);

  return (
    <div >
      <Grid container spacing={1}>
        <Grid item xs={12}>
            <Card className={classes.card}>
                    <CardActionArea href={props.article.href} target="_blank">
                    <Box className={classes.box}>
                        <CardMedia
                        component="img"
                        image={ props.article.imgSrc ? props.article.imgSrc :  "https://cdn.wallpapersafari.com/24/23/T7P10I.jpg" }
                        title="Contemplative Reptile"
                        className={classes.media}
                        />
                        <Box className={classes.innerbox}>
                            <CardContent className={classes.cardContent}>
                                <Typography variant="body2" color="text.secondary">
                                    {props.article.tileText}
                                </Typography>
                                { props.article.lastUpdated ? 
                                    <Typography variant="body2" color="text.secondary" className={classes.date}>
                                    {props.article.lastUpdated} 
                                    </Typography>
                                    : ""
                                }
                            </CardContent>
                        </Box>
                    </Box>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CardTile);
