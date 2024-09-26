import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { QualityControl } from '../pages/QualityControl';
import { ClassificationResults } from '../pages/ClassificationResults';
import { AppLayout } from '../appLayout/AppLayout';
import { Metadata } from '../pages/Metadata';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}> 
      <Route path="/" element={<QualityControl />} />
      <Route path="/classification-results" element={<ClassificationResults />} />
      <Route path="/metadata" element={<Metadata />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Route>
  )
);


export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
