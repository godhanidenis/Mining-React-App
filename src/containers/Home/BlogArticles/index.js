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
import CardTile from '../CardTile';

const useStyles = makeStyles(theme => ({
  itemDescription: {
    color: '#ffffff',
    marginBottom: 10,
    marginTop: 10,
  },
  miningToolItem: {
    backgroundColor: '#161616',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    padding: '8px 12px',
  },
  sectionHead: {
    alignItems: 'center',
    display: 'flex',
    height: 40,
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  sectionTitle: {
      fontSize: '24px',
      fontWeight:'600',
      color: '#ffffff'
  },
}));

const BlogArticles = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.section}>
      <div className={classes.sectionHead}>
        { <div className={classes.sectionTitle}>News from Braiins.com</div> }
      </div>
      <Grid container spacing={1}>
      <Grid item xs={12}  >
              <CardTile 
                  article={{ 
                    href:"https://braiins.com/blog/profitability-calculator-user-guide", 
                    imgSrc:"https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/6040d690d262994de9f384f4_Profit-Calc.png" ,
                    tileText:"Mining Profitability & Cash Flow Calculator [User Guide]", 
                    lastUpdated:"Nov 12, 2020" }} 
                />
        </Grid>
        <Grid item xs={12}  >
              <CardTile 
                  article={{ 
                    href:"https://braiins.com/blog/cost-to-mine-bitcoin-user-guide", 
                    tileText:"Cost to Mine 1 Bitcoin Calculator [User Guide]" , 
                    imgSrc:"https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/5fa11ec1e49048ab5eecbf25_ctm_featured.png",
                    lastUpdated:"Nov 03, 2020"}} 
                />
        </Grid>            
        <Grid item xs={12}>
            <CardTile 
                article={{ tileText:"Lizards are a widespread group of squamate reptiles, with over 6,000", lastUpdated:"Feb  23,2021"}} 
                />
        </Grid>
        <Grid item xs={12} >
        <CardTile 
                article={{ tileText:"Lizards are a widespread group of squamate reptiles, with over 6,000", lastUpdated:"Feb  23,2021"}} 
                />
        </Grid>
        <Grid item xs={12} >
            <CardTile 
                article={{ tileText:"Lizards are a widespread group of squamate reptiles, with over 6,000", lastUpdated:"Feb  23,2021"}} 
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogArticles);
