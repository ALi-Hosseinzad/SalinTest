import React, { useEffect, memo, Suspense, useState } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Login from '../pages/Login/Login';

function MainRouter() {
  const login = useSelector((state) => state.login.value);
  const location = useLocation();
  const isLoggedIn = login.isLoggedIn;
  const [queryParam, setQueryParam] = useState();

  useEffect(() => {
    setQueryParam(queryString.parse(location.search));
  }, [location.search]);

  // const BatchContent = React.lazy(() => import('./pages/Batch/List/BatchContentList'));

  const routesList = [
    {
      path: '/',
      element: <div>ali</div>,
    },
    {
      path: '/profile',
      element: <div>ali</div>,
    },

  ];
  return (
    <>
      {isLoggedIn ? (
        <Layout>
          <Suspense fallback={<Loading className='grid h-screen place-items-center' />}>
            <Routes>
              {routesList.map((route) => (
                <Route key={route.path} {...route} />
              ))}
            </Routes>
          </Suspense>
        </Layout>
      ) : (
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default memo(MainRouter);
