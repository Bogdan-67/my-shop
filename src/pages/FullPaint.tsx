import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '../redux/slices/cartSlice';

export const FullPaint: React.FC = () => {
  const [paints, setPaints] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    id: string;
    sizes: number[];
    types: string[];
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id as string));
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const typeNames = ['акриловая', 'эмалевая', 'лаковая'];

  const addedCount = cartItem ? cartItem.count : 0;

  React.useEffect(() => {
    async function fetchPaints() {
      try {
        const { data } = await axios.get(`https://63bffb890cc56e5fb0e3c5a4.mockapi.io/items/` + id);
        setPaints(data);
      } catch (error) {
        alert('Ошибка при получении данных :(');
        navigate('/');
      }
    }

    fetchPaints();
  }, []);

  if (!paints) return <>Загрузка...</>;

  const onClickAdd = () => {
    const item = {
      id: paints.id,
      title: paints.title,
      price: paints.price,
      imageUrl: paints.imageUrl,
      type: typeNames[activeType],
      size: paints.sizes[activeSize],
      count: 0,
    };

    dispatch(addItem(item));
  };

  return (
    <div className='single-model'>
      <img src={paints.imageUrl} alt='Photo' className='single-model__img' />
      <div className='single-model__info'>
        <h2 className='single-model__title'>{paints.title}</h2>
        <div className='model-block__selector'>
          <ul className='single-model__types'>
            {paints.types.map((type, typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}>
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul className='single-model__sizes'>
            {paints.sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}>
                {size} мл.
              </li>
            ))}
          </ul>
        </div>
        <div className='model-block__bottom'>
          <div className='model-block__price'>от {paints.price} ₽</div>
          <button onClick={onClickAdd} className='button button--outline button--add'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPaint;
