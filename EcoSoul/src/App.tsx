import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Cabecalho from './components/Cabecalho/Cabecalho';
import Rodape from './components/Rodape/Rodape';
import { Botao } from './components/Botao/Botao';

export default function App() {
  const [mostrarTopo, setMostrarTopo] = useState(false);

  function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('conteudo')?.focus({ preventScroll: true });
  }

  useEffect(() => {
    function verificarRolagem() {
      setMostrarTopo(window.scrollY > 400);
    }

    verificarRolagem();
    window.addEventListener('scroll', verificarRolagem);

    return () => {
      window.removeEventListener('scroll', verificarRolagem);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#1f9ea6] font-sans text-[#0d2225] antialiased">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:bg-white focus:p-4 focus:text-teal-900"
      >
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main
        id="conteudo"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 outline-none md:px-8 md:py-14"
      >
        <Outlet />
      </main>
      <Rodape />
      {mostrarTopo && (
        <Botao
          aria-label="Voltar ao topo"
          className="fixed right-5 bottom-5 z-20 shadow-lg ring-2 ring-white"
          onClick={voltarAoTopo}
        >
          ↑
        </Botao>
      )}
    </div>
  );
}
