import React from 'react';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import ModelBlock from '../components/ModelBlock';
import Skeleton from '../components/ModelBlock/Skeleton';

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://63bffb890cc56e5fb0e3c5a4.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все краски</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <ModelBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
