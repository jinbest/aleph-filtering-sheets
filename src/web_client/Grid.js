import React, { useState } from 'react';

import 'antd/dist/antd.css';

import Explore from '../client/sidebar/components/Explore';

import { pullDataFactory } from '../server/pullData';

const styles = {
  splitContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  gridContainer: {
    minWidth: '50%',
    borderRight: '1px solid gray',
    marginRight: '10px',
    margin: '5px',
  },
  table: {
    borderCollapse: 'collapse',
  },
  headRow: {
    background: 'lightgray',
  },
  cell: {
    padding: '4px',
    border: '1px solid black',
  },
};

const Grid = () => {
  const [gridData, setGridData] = useState([]);
  // const

  const placeResults = dimensionsAndData => {
    setGridData(dimensionsAndData);
  };

  const pullData = filterGroup => {
    pullDataFactory(placeResults, filterGroup)();
  };

  return (
    <div style={styles.splitContainer}>
      <div style={styles.gridContainer}>
        {gridData.length && (
          <table id="grid" style={styles.table}>
            <thead>
              <tr>
                {gridData[0].map(dim => (
                  <th style={styles.cell} key={dim}>
                    {dim}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gridData.slice(1).map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {Object.values(row).map((col, colIdx) => (
                    <td style={styles.cell} key={`${rowIdx}-${colIdx}-${col}`}>
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Explore pullData={pullData} />
    </div>
  );
};

export default Grid;
