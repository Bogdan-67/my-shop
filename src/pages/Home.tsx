import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

import Pagination from '../components/Pagination';
import Sort, { list } from '../components/Sort';
import Categories from '../components/Categories';
import ModelBlock from '../components/ModelBlock';
import Skeleton from '../components/ModelBlock/Skeleton';
import { fetchPaints, SearchPaintsParams, selectPaintsData } from '../redux/slices/paintsSlice';
import { useAppDispatch } from '../redux/store';

export const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPaintsData);
  const sortType = sort.sortProperty;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPaints = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPaints({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPaintsParams;

      const sort = list.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем краски
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPaints();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const paints = items.map((obj: any) => <ModelBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все краски</h2>
      {status === 'error' ? (
        <div className='cart cart--empty'>
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось загрузить данные.
            <br />
            Попробуйте обновить страницу, либо зайдите позже.
          </p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : paints}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
