import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import MITable from '../../../components/MITable';
import ShareDialog from '../../../components/ShareDialog';

import ShareIcon from '../../../assets/img/share.png';
import EmbedIcon from '../../../assets/img/embed.png';
import InfoIcon from '../../../assets/img/info-circle.png';

import { hashRateStatsTableColumns, difficultyStatsTableColumns } from '../../../constants';
import { homeSectionHead, homeSectionTitle } from '../../../styles';

import {
  getDifficultyStats,
} from '../../../store/actions/difficultyStats';

import {
  getHashRateStats,
} from '../../../store/actions/hashRateStats';


let timeout = null;
let timeOutTime = 0;
const MINUTE_MS = 60000;

const useStyles = makeStyles(theme => ({
  icon: {
    marginLeft: 20,
    marginRight: 10,
  },
  infoIcon: {
    marginLeft: '0.5rem',
  },
  link: {
    cursor: 'pointer',
  },
  sectionHead: homeSectionHead,
  sectionTitle: {...homeSectionTitle,fontSize: '24px'},
  suffix: {
    color: '#525252',
    marginLeft: 10,
    minWidth: 40,
    textAlign: 'left',
  },
  suffixDifficulty: {
    minWidth: 20,
  },
  text: {
    color: '#8B7CFF',
  }
}));

let hashRateStatsRows = [{ 
          name: 'Hashrate (current)',
          value: 0,
          suffix: 'EH/s',
        },
        { 
          name: 'Hashrate (30 days)',
          value: 0.0,
          suffix: 'EH/s',
        },
        { 
          name: 'Hash value (BTC/TH/day)',
          value: 0.0,
          suffix: 'BTC',
          info: 'Calculated based on the value of the block subsidy + the average transaction fees per block for the past 144 blocks',
        },
        { 
          name: 'Hash price ($/TH/day)',
          value: 0.0,
          suffix: 'USD',
        },
        { 
          name: 'Average fees per block (144 blocks)',
          value: 0.0,
          suffix: 'BTC',
        },
        { 
          name: 'Fees % of block reward (144 blocks)',
          value: 0,
          suffix: '%',
        },
        { 
          name: 'Total mining revenue ($mil/day)',
          value:  0,
          suffix: 'USD',
        },];

let difficultyStatsRows = [{ 
          name: 'Difficulty',
          value: 0.0,
          suffix: 'T',
        },
        { 
          name: 'Block this epoch',
          value: 0+' / 2016',
          suffix: '',
        },
        { 
          name: 'Current epoch block time',
          value: '00:00',
          suffix: 'min',
        },
        { 
          name: 'Estimated adjustment (%)',
          value: '0%',
          suffix: '%',
        },
        { 
          name: 'Estimated next difficulty',
          value: '0',
          suffix: 'T',
        },
        { 
          name: 'Estimated adjustment date',
          value: 'Month year date',
          suffix: '',
        },
        { 
          name: 'Previous adjustment',
          value: '0',
          suffix: '%',
      }];

const OverallStats = (props) => {
  const classes = useStyles(props);
  const [state, setState] = useState({
    isShareDialogOpen: false,
    tab: 'share',
    show: false,
  });

  // Update hash rate and difficulty stats value in every minute periodically
  useEffect(() => {
    const interval = setInterval(() => {
      apiCallHandler();
    }, MINUTE_MS );

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  const apiCallHandler = () => {
    // call api to fetch data of difficulty stats table
    props.getDifficultyStats()
      .then(res => {
        difficultyStatsRows = [{ 
          name: 'Difficulty',
          value: res.difficulty,
          suffix: 'T',
        },
        { 
          name: 'Block this epoch',
          value: res.blocks_epoch+' / 2016',
          suffix: '',
        },
        { 
          name: 'Current epoch block time',
          value: res.epoch_block_time,
          suffix: 'min',
        },
        { 
        name: 'Estimated adjustment (%)',
        value: res.estimated_adjustment,
        suffix: '%',
        },
        { 
          name: 'Estimated next difficulty',
          value: res.estimated_next_diff,
          suffix: 'T',
        },
        { 
          name: 'Estimated adjustment date',
          value: res.estimated_adjustment_date,
          suffix: '',
        },
        { 
          name: 'Previous adjustment',
          value: res.previous_adjustment,
          suffix: '%',
      }]
      setState((prevState)=>({
        ...prevState,
        show: true
      }))
      })
      .catch(err => {
        //console.log(err.msg);
      });

      // call api to fetch data of hash rate stats table
      props.getHashRateStats()
      .then(res => {
        hashRateStatsRows = [
        { 
          name: 'Hashrate (current)',
          value: res.current_hashrate,
          suffix: 'EH/s',
        },
        { 
          name: 'Hashrate (30 days)',
          value: res.hash_rate_30,
          suffix: 'EH/s',
        },
        { 
          name: 'Hash value (BTC/TH/day)',
          value: res.hash_value,
          suffix: 'BTC',
          info: 'Calculated based on the value of the block subsidy + the average transaction fees per block for the past 144 blocks',
        },
        { 
          name: 'Hash price ($/TH/day)',
          value: res.hash_price,
          suffix: 'USD',
        },
        { 
          name: 'Average fees per block (144 blocks)',
          value: res.avg_fees_per_block,
          suffix: 'BTC',
        },
        { 
          name: 'Fees % of block reward (144 blocks)',
          value: res.fees_percent,
          suffix: '%',
        },
        { 
          name: 'Total mining revenue ($mil/day)',
          value:  res.rev_usd,
          suffix: 'USD',
        },
      ]
      setState((prevState)=>({
        ...prevState,
        show: true
      }))
      })
      .catch(err => {
        //console.log(err.msg);
      });
  }

  useEffect(() => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      apiCallHandler();
      timeOutTime = 0;
    }, timeOutTime);
  }, []);

  const resolveHashRateCell = (row, column) => {
    if (column.name === 'value') {
      return (
        <Box display="flex" width="fit-content" marginLeft="auto">
          <div className={classes.value}>
            {row.value}
          </div>
          <div className={classes.suffix}> {row.suffix}</div>
        </Box>
      )
    }

    if (row.info) {
      return (
        <React.Fragment>
          {row[column.name]}
          <Tooltip title={row.info} enterTouchDelay={0}>
            <img className={classes.infoIcon} src={InfoIcon}/>
          </Tooltip>
        </React.Fragment>
      );
    }

    return row[column.name];
  };

  const resolveDifficultyCell = (row, column) => {
    if (column.name === 'value') {
      return (
        <Box display="flex" width="fit-content" marginLeft="auto">
          <div className={classes.value}>{row.value}</div>
          <div className={classNames(classes.suffix, classes.suffixDifficulty)}> {row.suffix}</div>
        </Box>
      )
    }

    return row[column.name];
  };

  const handleClickShareIcon = () => {
    setState((prevState) => ({
      ...prevState,
      isShareDialogOpen: true,
      tab: 'share',
    }));
  };

  const handleClickEmbedIcon = () => {
    setState((prevState) => ({
      ...prevState,
      isShareDialogOpen: true,
      tab: 'embed',
    }));
  };

  const handleCloseShareDialog = () => {
    setState((prevState) => ({
      ...prevState,
      isShareDialogOpen: false,
    }));
  };

  return (
    <div className={classes.section}>
      <div className={classes.sectionHead}>
        <div className={classes.sectionTitle}>Overall btc stats</div>
        <Box display="flex" alignItems="center">
          <div className={classes.link} onClick={handleClickShareIcon}>
            <img className={classes.icon} src={ShareIcon}/>
            <span className={classes.text}>Share</span>
          </div>
          <div className={classes.link} onClick={handleClickEmbedIcon}>
            <img className={classes.icon} src={EmbedIcon}/>
            <span className={classes.text}>Embed</span>
          </div>
        </Box>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={6}>
          <MITable
            columns={hashRateStatsTableColumns}
            rows={hashRateStatsRows}
            resolveCell={resolveHashRateCell}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <MITable
            columns={difficultyStatsTableColumns}
            rows={difficultyStatsRows}
            resolveCell={resolveDifficultyCell}
          />
        </Grid>
      </Grid>
      <ShareDialog 
        open={state.isShareDialogOpen} 
        tab={state.tab}
        shareableLink={window.location.href}
        onClose={handleCloseShareDialog}
      />
    </div>
  );
}

const mapStateToProps = store => ({
  difficultyStatsData: store.rootReducer.difficultyStats.difficultyStatsData,
  hashRateStatsData: store.rootReducer.hashRateStats.hashRateStatsData
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getDifficultyStats,
  getHashRateStats,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OverallStats);
