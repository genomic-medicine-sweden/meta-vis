import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { AppLayout } from '../appLayout/AppLayout';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}> 
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Route>
  )
);


export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
