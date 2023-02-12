import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/slices/filterSlice';

function Categories() {
  const categories = ['Все', 'В баночках', 'В балончиках', 'Лаковые', 'Маркеры'];

  const value = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => dispatch(setFilter(i))}
            className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
