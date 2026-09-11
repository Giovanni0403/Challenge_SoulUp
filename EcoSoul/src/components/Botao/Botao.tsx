import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type BotaoProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  id?: string;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
};

type LinkBotaoProps = {
  children: ReactNode;
  to: string;
  variant?: 'primary' | 'secondary';
  className?: string;
};

function definirEstilo(secundario: boolean) {
  const estiloBase =
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075c62]';

  if (secundario) {
    return (
      estiloBase +
      ' bg-white text-[#075c62] ring-1 ring-[#075c62]/25 hover:bg-teal-50'
    );
  }

  return estiloBase + ' bg-[#075c62] text-white hover:bg-[#043e42]';
}

export function Botao(props: BotaoProps) {
  return (
    <button
      id={props.id}
      type={props.type || 'button'}
      className={
        definirEstilo(props.variant === 'secondary') +
        ' ' +
        (props.className || '')
      }
      onClick={props.onClick}
      aria-label={props['aria-label']}
      aria-expanded={props['aria-expanded']}
      aria-controls={props['aria-controls']}
    >
      {props.children}
    </button>
  );
}

export function LinkBotao(props: LinkBotaoProps) {
  return (
    <Link
      to={props.to}
      className={
        definirEstilo(props.variant === 'secondary') +
        ' ' +
        (props.className || '')
      }
    >
      {props.children}
    </Link>
  );
}
