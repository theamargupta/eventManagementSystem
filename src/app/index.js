import React, { Suspense } from 'react';
import AppRoute from 'Router/index';
import Loader from 'components/Loader';
import './index.css';

const App = () => (
  <Suspense fallback={<Loader />}>
    <AppRoute />
  </Suspense>
);
export default App;
