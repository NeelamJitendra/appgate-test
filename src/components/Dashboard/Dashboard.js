import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Cached';
import Brightness1 from '@material-ui/icons/Brightness1';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

async function fetchFnc(token) {
  return fetch('/admin/stats/appliances', {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.appgate.peer-v14+json',
      'Content-Type': 'application/json'
    }),
  }
  ).then(response => response.json());
}

export default function Dashboard({ token }) {

  const [appliences, setAppliences] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    autoRefresh();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const autoRefresh = () => {
    refresh();
    setInterval(function () {
      refresh()
    }, 1000);
  }

  const refresh = () => {
    const fetchData = async () => {
      const data = await fetchFnc(token)
      setAppliences(data);
    };
    fetchData();
  }

  if (appliences.length === 0) {
    return ''
  }

  return (
    <div>
      <div className='heading'>
        <h2>Appliances</h2>
        <span>
          Total Appliances: {appliences.applianceCount}
          <IconButton title="Refresh Appliences" component="span" onClick={() => refresh()}>
            <RefreshIcon />
          </IconButton>
        </span>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <caption>
            CPU/Memory/Disk values are snapshots only and vary with time. Values will be refreshed every 1 minute(s).
          </caption>
          <TableHead>
            <TableRow>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Sessions</TableCell>
              <TableCell align="right">CPU</TableCell>
              <TableCell align="right">Memory</TableCell>
              <TableCell align="right">Network out/in</TableCell>
              <TableCell align="right">Disk</TableCell>
              <TableCell align="right">Version</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appliences.data.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <Brightness1 style={{ fontSize: 10, color: row.status === 'healthy' ? 'green' : 'red' }} />  {row.status}
                </TableCell>
                <TableCell align="right">{row.gateway.numberOfSessions}</TableCell>
                <TableCell align="right">{row.cpu} &#37;</TableCell>
                <TableCell align="right">{row.memory} &#37;</TableCell>
                <TableCell align="right">{row.network.dropout + 'kbps / ' + row.network.dropin + 'kbps'}</TableCell>
                <TableCell align="right">{row.disk}  &#37;</TableCell>
                <TableCell align="right">{row.version}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}