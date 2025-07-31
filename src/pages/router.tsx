import { Route, Routes } from 'react-router-dom';
import { RouterType } from '../types';
import { routes } from './pagesData';

export const Router = () => {
  const pagesRoutes = (routes as unknown as RouterType[]).map(
    ({ path, element, title }: RouterType) => {
      return <Route key={title} path={`/${path}`} element={element} />;
    },
  );
  return <Routes>{pagesRoutes}</Routes>;
};
