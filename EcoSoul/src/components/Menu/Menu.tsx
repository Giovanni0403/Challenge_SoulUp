import { Link } from 'react-router-dom';

type MenuProps = {
  open: boolean;
  onNavigate: () => void;
};

export default function Menu({ open, onNavigate }: MenuProps) {
  const estiloLink = 'block rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800';

  return (
    <nav
      id="menu-principal"
      aria-label="Navegação principal"
      className={`${open ? 'block' : 'hidden'} w-full lg:block lg:w-auto`}
    >
      <ul className="flex flex-col gap-1 pt-4 lg:flex-row lg:pt-0">
        <li>
          <Link
            to="/"
            onClick={onNavigate}
            className={estiloLink}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/integrantes"
            onClick={onNavigate}
            className={estiloLink}
          >
            Integrantes
          </Link>
        </li>
        <li>
          <Link
            to="/sobre"
            onClick={onNavigate}
            className={estiloLink}
          >
            Sobre
          </Link>
        </li>
        <li>
          <Link
            to="/app"
            onClick={onNavigate}
            className={estiloLink}
          >
            APP
          </Link>
        </li>
        <li>
          <Link
            to="/faq"
            onClick={onNavigate}
            className={estiloLink}
          >
            FAQ
          </Link>
        </li>
        <li>
          <Link
            to="/contato"
            onClick={onNavigate}
            className={estiloLink}
          >
            Contato
          </Link>
        </li>
      </ul>
    </nav>
  );
}
