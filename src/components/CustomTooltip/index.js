import React from 'react';
import { connect } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/styles';
import { profitabilityToolTipContent } from '../../constants';

const useStyles = makeStyles(theme => ({
    anchor:{
        display: 'flex',
        alignItems: 'center'
    },
    pointer: {
        borderRadius: 8,
        cursor: 'pointer',
        height: 16,
        width: 16,
        marginRight: 10,
        display: 'flex',
        margin: 5
    }
}));

export const ProfitabilityCustomTooltip = (props) => {
    const classes = useStyles(props);

    return (
        <div>
            {
                profitabilityToolTipContent.map((colorText) => (
                    <div className={classes.anchor}>

                        <div
                            className={classes.pointer}
                            style={{
                                backgroundColor: colorText.color,
                            }}
                        />
                        <div>{colorText.title}</div>
                    </div>
                ))
            }
        </div>
    );
}

