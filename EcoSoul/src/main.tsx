import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home/index';
import Integrantes from './pages/Integrantes/index';
import Sobre from './pages/Sobre/index';
import Solucao from './pages/Solucao/index';
import Funcionalidade from './pages/Funcionalidade/index';
import Faq from './pages/Faq/index';
import Contato from './pages/Contato/index';
import NaoEncontrada from './pages/NaoEncontrada/index';
import './css/main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/integrantes', element: <Integrantes /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '/app', element: <Solucao /> },
      { path: '/app/:slug', element: <Funcionalidade /> },
      { path: '/faq', element: <Faq /> },
      { path: '/contato', element: <Contato /> },
      { path: '*', element: <NaoEncontrada /> }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
