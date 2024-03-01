import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsActions } from '../../redux/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);

  const handleFilterChange = e => {
    const newFilterValue = e.target.value;

    dispatch(contactsActions.setFilter(newFilterValue));
  };

  return (
    <input
      type="text"
      value={filter}
      onChange={handleFilterChange}
      placeholder="Search contacts..."
    />
  );
};

export default Filter;
