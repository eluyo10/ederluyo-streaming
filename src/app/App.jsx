import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../common/providers/AuthProvider.jsx';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute.jsx';
import { AuthGate } from '../features/auth/pages/AuthGate.jsx';
import { ProfileSelectPage } from '../features/auth/pages/ProfileSelectPage.jsx';
import { AppLayout } from '../common/layouts/AppLayout.jsx';
import { HomePage } from '../features/landing/pages/HomePage.jsx';
import { AboutPage } from '../features/about/pages/AboutPage.jsx';
import { TodosPage } from '../features/todos/pages/TodosPage.jsx';
import { ZustandPage } from '../features/zustand-example/pages/ZustandPage.jsx';
import { RickAndMortyPage } from '../features/rick-and-morty/pages/RickAndMortyPage.jsx';
import { EpisodesPage } from '../features/rick-and-morty/pages/EpisodesPage.jsx';
import { LocationsPage } from '../features/rick-and-morty/pages/LocationsPage.jsx';
import { PeruvianMapPage } from '../features/peruvian-map/pages/PeruvianMapPage.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <AuthGate /> },
  { path: '/profiles', element: <ProtectedRoute><ProfileSelectPage /></ProtectedRoute> },
  {
    path: '/app',
    element: <ProtectedRoute requireProfile><AppLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'todos', element: <TodosPage /> },
      { path: 'zustand', element: <ZustandPage /> },
      { path: 'rick-and-morty', element: <RickAndMortyPage /> },
      { path: 'rick-and-morty/episodes', element: <EpisodesPage /> },
      { path: 'rick-and-morty/locations', element: <LocationsPage /> },
      { path: 'peruvian-map', element: <PeruvianMapPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
]);

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
