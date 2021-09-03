// TODO: allow caller to specify filters and have those filters applied for the returned rows

import { DIMENSIONS, ALL_DATA } from './data';
import _ from 'lodash';

const pullDataFactory = (placeResults, filterGroup) => () => {
  // const gridData = ALL_DATA.map(dataObj => Object.values(dataObj));

  const gridData = _.filter(ALL_DATA, o => {
    const filterKeys = Object.keys(filterGroup);
    let matched = true;
    filterKeys.forEach(keyName => {
      if (
        filterGroup[keyName] &&
        !o[keyName]
          .toString()
          .toLowerCase()
          .includes(filterGroup[keyName].toString().toLowerCase())
      ) {
        matched = false;
      }
    });
    return matched;
  }).map(dataObj => Object.values(dataObj));

  placeResults([DIMENSIONS, ...gridData]);
};

export { pullDataFactory };
