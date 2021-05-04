import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { ProfitabilityCustomTooltip} from '../../components/CustomTooltip';

import InfoIcon from '../../assets/img/info-circle.png';

const useStyles = makeStyles(theme => ({
  infoIcon: {
    marginLeft: 8,
  },
  tableCell: {
    borderBottom: '1px solid #262626',
    color: '#ffffff',
    padding: '7px 16px 6px 16px',
    whiteSpace: 'pre-wrap'
  },
  tableHead: {
    backgroundColor: '#000000',
  },
  tableHeadText: {
    fontWeight: 600,
  },
  tableRow: {
    backgroundColor: '#161616',
    borderBottom: '1px solid #262626',
  },
}));


const MITable = (props) => {
  const classes = useStyles(props);

  return (
    <Table className={classes.table}>
      <TableHead className={classes.tableHead}>
        <TableRow>
          {
            (props.columns || []).map((column) => (
              <TableCell className={classNames(classes.tableCell, classes.tableHeadText)}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <div>
                    {column.title}
                  </div>

                  <div>
                    {
                      column.info === 'Profitability.' ? (
                        <Tooltip title={<ProfitabilityCustomTooltip></ProfitabilityCustomTooltip>}>
                          <img className={classes.infoIcon} src={InfoIcon} />
                        </Tooltip>) : (
                        <Tooltip title={column.info}>
                          <img className={classes.infoIcon} src={InfoIcon} />
                        </Tooltip>)
                    }
                  </div>
                </div>

              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {(props.rows || []).map((row, rowIndex) => (
          <TableRow key={row.name} className={classes.tableRow}>
            {
              (props.columns || []).map((column, columnIndex) => (
                <TableCell className={classes.tableCell} key={columnIndex} align={column.align}>
                  {props.resolveCell ? props.resolveCell(row, column, rowIndex, columnIndex) : row[column.name]}
                </TableCell>
              ))
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MITable);
