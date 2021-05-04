import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/styles';

import ShareTab from './ShareTab';
import EmbedTab from './EmbedTab';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    color: theme.palette.grey[500],
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  content: {
    overflow: 'hidden',
    padding: 0,
  },
  dialog: {
    backgroundColor: '#000',
    borderRadius: 0,
    color: '#fff',
    height: 428,
    width: 450,
  },
  tab: {
    marginBottom: -2,
    outline: 'none !important'
  },
  tabs: {
    borderBottom: '2px solid #565656',
  },
}));

const ShareDialog = (props) => {
  const classes = useStyles(props);
  const [state, setState] = useState({
    checked: false,
    tab: 'share',
  });
  const { tab } = state;

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      tab: props.tab,
    }));
  }, [props.tab]);

  const handleChangeTab = (e, value) => {
    setState((prevState) => ({
      ...prevState,
      tab: value,
    }));
  };

  return (
    <Dialog
      classes={{
        paper: classes.dialog,
      }}
      onClose={props.onClose} 
      open={props.open}
    >
      <MuiDialogTitle className={classes.root} onClose={props.onClose}>
        <div>Share</div>
        <IconButton className={classes.closeButton} onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <MuiDialogContent className={classes.content} dividers>
        <Tabs value={state.tab} onChange={handleChangeTab} className={classes.tabs}>
          <Tab
            value="share"
            label="Share results"
            className={classes.tab}
          />
          <Tab
            value="embed"
            label="Embed form"
            className={classes.tab}
          />
        </Tabs>
        <Box padding="0">
          {
            tab === 'share' && <ShareTab shareableLink={props.shareableLink}/>
          }
          {
            tab === 'embed' && <EmbedTab shareableLink={props.shareableLink}/>
          }
        </Box>
      </MuiDialogContent>
    </Dialog>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareDialog);