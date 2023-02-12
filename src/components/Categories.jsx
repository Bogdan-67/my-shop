import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';

function Categories() {
  const categories = ['Все', 'В баночках', 'В балончиках', 'Лаковые', 'Маркеры'];

  const value = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => dispatch(setCategory(i))}
            className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
