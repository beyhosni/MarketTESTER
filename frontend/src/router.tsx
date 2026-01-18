import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Experiments from './pages/Experiments';
import ExperimentForm from './pages/ExperimentForm';
import Validation from './pages/Validation';
import { ProtectedRoute } from './components/ProtectedRoute'; // Assumed import path

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'experiments',
            element: <Experiments />,
          },
          {
            path: 'experiments/new',
            element: <ExperimentForm />,
          },
          {
            path: 'experiments/:id/validate',
            element: <Validation />,
          },
        ],
      },
    ],
  },
]);
