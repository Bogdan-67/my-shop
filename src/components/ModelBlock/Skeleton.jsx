import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className='model-block'
    speed={2}
    width={280}
    height={400}
    viewBox='0 0 280 400'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}>
    <circle cx='140' cy='83' r='83' />
    <rect x='0' y='259' rx='10' ry='10' width='280' height='62' />
    <rect x='0' y='185' rx='10' ry='10' width='280' height='54' />
    <rect x='0' y='353' rx='10' ry='10' width='90' height='27' />
    <rect x='128' y='343' rx='23' ry='23' width='152' height='45' />
  </ContentLoader>
);

export default Skeleton;
