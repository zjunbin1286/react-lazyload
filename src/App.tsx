import React from 'react';
import img1 from './assets/1.png';
import img2 from './assets/2.png';
// import LazyLoad from 'react-lazyload';
import LazyLoad from './MyLazyLoad';

// import() 包裹的模块会单独打包，然后 React.lazy 是用到这个组件的时候才去加载。
const LazyTest = React.lazy(() => import('./Test'));

export default function App() {
  return (
    <div>
      {/* <LazyTest /> */}
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <LazyLoad placeholder={<div>loading...</div>} onContentVisible={() => {
        console.log('组件显示')
      }}>
        {/* <img src={img1} style={{ width: 500 }} /> */}
        <LazyTest />
      </LazyLoad>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <LazyLoad placeholder={<div>loading...</div>} onContentVisible={() => {
        console.log('图片显示')
      }}>
        <img src={img2} style={{ width: 500 }} />
      </LazyLoad>
    </div>
  );
};
