import React from 'react';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import ModelBlock from '../components/ModelBlock';
import Skeleton from '../components/ModelBlock/Skeleton';

export const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://63bffb890cc56e5fb0e3c5a4.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  const paints = items.map((obj) => <ModelBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className='content__title'>Все краски</h2>
      <div className='content__items'>{isLoading ? skeletons : paints}</div>
    </div>
  );
};

export default Home;
