// TODO: allow user to add and remove filters
// TODO: allow user to choose dimension and text to match for each filter
// TODO: use filters when pulling data
// TODO: improve the UI

import React, { useState, useEffect } from 'react';
import { Button, Input, Select } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import server from '../../utils/server';
import { TABLE_FIELD_NAMES, SELECT_OPTIONS } from '../const/constant';
import '../style/sidebar.css';
import { isEmpty } from 'lodash';

const { serverFunctions } = server;
const { Option } = Select;

const Filter = ({ selectedItems, handleChange }) => {
  const filteredOptions = SELECT_OPTIONS.filter(
    o => !selectedItems.includes(o)
  );

  return (
    <>
      <hr />
      <div>
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          value={selectedItems}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {filteredOptions.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>

        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          className="remove-filter"
          onClick={() => {
            handleChange([]);
          }}
        />
      </div>
    </>
  );
};

const Explore = ({ pullData }) => {
  const pullDataFn = pullData || serverFunctions.pullData;

  const [selectedItems, setSelectedItems] = useState([]);
  const [filterGroup, setFilterGroup] = useState({});
  const [pulled, setPulled] = useState(false);

  const handleChange = items => {
    setSelectedItems(items);
  };

  useEffect(() => {
    const newFilter = {};
    selectedItems.forEach(keyName => {
      newFilter[keyName] = filterGroup[keyName] || '';
    });
    setFilterGroup(newFilter);
  }, [selectedItems]);

  useEffect(() => {
    if (pulled) {
      pullQuery();
    }
  }, [filterGroup]);

  async function pullQuery() {
    try {
      pullDataFn(filterGroup);
    } catch (err) {}
  }

  return (
    <div className="sidebar-container">
      <h1>Aleph | Data Explorer</h1>
      <div className="flex-centered">
        <Filter selectedItems={selectedItems} handleChange={handleChange} />

        {selectedItems.map(item => {
          return (
            <Input
              key={item}
              value={filterGroup[item]}
              placeholder={item}
              className="filter-input"
              onChange={e => {
                if (item === TABLE_FIELD_NAMES.year) {
                  filterGroup[item] = Number(e.target.value);
                } else {
                  filterGroup[item] = e.target.value;
                }
                setFilterGroup({ ...filterGroup });
              }}
            />
          );
        })}

        {/* <hr />
        <Button
          type="primary"
          shape="round"
          icon={<PlusCircleOutlined />}
          style={{
            backgroundColor: '#3074D9',
            border: '#3074D9',
          }}
        >
          New Filter Group
        </Button> */}

        <hr />
        <Button
          onClick={() => {
            setPulled(true);
            pullQuery();
          }}
          type="primary"
          style={{
            backgroundColor: '#3074D9',
            border: '#3074D9',
            margin: '0px auto',
          }}
        >
          Pull Data
        </Button>
      </div>
    </div>
  );
};

export default Explore;
