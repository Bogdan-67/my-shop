import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { SearchContext } from '../App';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import ModelBlock from '../components/ModelBlock';
import Skeleton from '../components/ModelBlock/Skeleton';

export const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://63bffb890cc56e5fb0e3c5a4.mockapi.io/items?page=${currentPage}&limit=8&${category}sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const paints = items.map((obj) => <ModelBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все краски</h2>
      <div className='content__items'>{isLoading ? skeletons : paints}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
