import React from 'react';
import { connect } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/styles';

const captionColors = [ '#a2171f', '#f95355', '#EB6307', '#ffff00', '#5adf88', '#13a454'];

const useStyles = makeStyles(theme => ({
  anchor: {
    backgroundColor: props => captionColors[props.value.value - 1],
    borderRadius: 8,
    cursor: 'pointer',
    height: 16,
    width: 16,
    marginRight:10,
    display:'flex'
  },
  bubble: {
    backgroundColor: '#393939',
    height: 6,
    position: 'absolute',
    right: -4,
    transform: 'rotate(45deg)',
    width: 6,
  },
  caption: {
    borderRadius: 5,
    cursor: 'pointer',
    height: 10,
    marginRight: 8,
    width: 10,
  },
  popover: {
    alignItems: 'center',
    backgroundColor: '#393939',
    display: 'flex',
    overflow: 'visible',
    padding: '3px 0 3px 6px',
  }
}));

const CaptionPopover = (props) => {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{
      display:'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between'
    }}>
      <div
        className={classes.anchor} 
        onClick={handleClick}></div>
        <div>{props.value.text}</div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        classes={{
          paper: classes.popover,
        }}
      >
        { 
          captionColors.map((color) => (
            <div
              className={classes.caption} 
              style={{
                backgroundColor: color,
              }}
              onClick={handleClose}
            />
          ))
        }
        <div className={classes.bubble}/>
      </Popover>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptionPopover);
