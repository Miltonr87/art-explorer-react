import { Route, Routes } from 'react-router-dom';
import { routes } from './pagesData';
import { RouterType } from '../types';

export const Router = () => {
  return (
    <Routes>
      {(routes as unknown as RouterType[]).map(({ path, element, title }) => (
        <Route key={title} path={`/${path}`} element={element} />
      ))}
    </Routes>
  );
};
