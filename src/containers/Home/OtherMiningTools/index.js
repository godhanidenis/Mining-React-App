import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import MIPrimaryButton from '../../../components/MIButtons/MIPrimaryButton';
import { homeSectionHead, homeSectionTitle } from '../../../styles';

const useStyles = makeStyles(theme => ({
  itemDescription: {
    color: '#ffffff',
    marginBottom: 30,
    marginTop: 20,
  },
  itemName: {
    fontSize: 24,
    color: '#ffffff',
  },
  miningToolItem: {
    backgroundColor: '#161616',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    padding: '20px 24px',
  },
  sectionHead: homeSectionHead,
  sectionTitle: homeSectionTitle,
}));

const OtherMiningTools = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.section}>
      <div className={classes.sectionHead}>
        {/* <div className={classes.sectionTitle}>Other Mining Tools</div> */}
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div className={classes.miningToolItem}>
            <div>
              <span className={classes.itemName}>Bitcoin Profitability Calculator</span>
              <p className={classes.itemDescription}>
                This calculator will show you your net profit from mining based on your hashrate, efficiency, electricity price, and other operational expences. To include capital expenditure (e.g. costs to buy hardware), use the advanced inputs.
              </p>
            </div>
            <Link to="profitability-calculator">
              <MIPrimaryButton height={48}>Launch Calculator</MIPrimaryButton>
            </Link>
          </div>
        </Grid> 
        <Grid item xs={12} >
          <div className={classes.miningToolItem}>
            <div>
              <span className={classes.itemName}>Cost to Mine 1 Bitcoin</span>
              <p className={classes.itemDescription}>
                This calculator will show you the cost to mine 1 Bitcoin based on your hashrate, power consumption, and additional (optional) inputs. You can select any hardware model from the dropdown menu or choose “Custom” to input the hashrate and power consumption yourself.
              </p>
            </div>
            <Link to="cost-to-mine">
              <MIPrimaryButton height={48}>Launch Calculator</MIPrimaryButton>
            </Link>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherMiningTools);
