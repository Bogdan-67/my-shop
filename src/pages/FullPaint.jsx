import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const FullPaint = () => {
  const [paints, setPaints] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

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

  if (!paints) return 'Загрузка...';

  return (
    <div>
      <img src={paints.imageUrl} alt='Photo' />
      <h2>{paints.title}</h2>
      <h4>{paints.price}</h4>
    </div>
  );
};

export default FullPaint;
