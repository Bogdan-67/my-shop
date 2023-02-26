import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty = () => {
  return (
    <>
      <div className='cart cart--empty'>
        <h2>
          Корзина пустая <icon>😕</icon>
        </h2>
        <p>
          Вероятней всего, вы ещё ничего не добавили.
          <br />
          Для того, чтобы выбрать товары, перейдите на главную страницу.
        </p>
        <img src={cartEmptyImg} alt='Empty cart' />
        <Link to='/' className='button button--black'>
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
