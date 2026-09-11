import { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import { Botao } from '../Botao/Botao';

export default function Cabecalho() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-teal-900/10 bg-white">
      <div
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 px-5 py-4 md:px-8"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false);
            document.getElementById('menu-button')?.focus();
          }
        }}
      >
        <Link
          to="/"
          aria-label="EcoSoul — página inicial"
          onClick={() => setOpen(false)}
          className="rounded focus-visible:outline-2 focus-visible:outline-teal-800"
        >
          <img
            src="/img/logo.png"
            alt="EcoSoul"
            className="h-16 w-36 object-contain md:w-44"
          />
        </Link>
        <Botao
          id="menu-button"
          variant="secondary"
          className="lg:hidden"
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Fechar ×' : 'Menu ☰'}
        </Botao>
        <Menu
          open={open}
          onNavigate={() => setOpen(false)}
        />
      </div>
    </header>
  );
}
