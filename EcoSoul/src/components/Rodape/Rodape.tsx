import { Link } from 'react-router-dom';

export default function Rodape() {
  return (
    <footer className="bg-[#0f3034] px-5 py-9 text-sm text-teal-50 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row">
        <div>
          <p className="text-xl font-bold">
            EcoSoul<span className="text-teal-300">.</span>
          </p>
          <p className="mt-2">Cada viagem conta. Cada escolha transforma.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link className="underline underline-offset-4" to="/sobre">
            Sobre o projeto
          </Link>
          <Link className="underline underline-offset-4" to="/contato">
            Fale com a equipe
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-7 max-w-6xl border-t border-white/15 pt-5 text-xs text-teal-100">
        © 2026 EcoSoul · Projeto acadêmico FIAP / SoulUp · Desenvolvido por
        todos os integrantes da equipe.
      </p>
    </footer>
  );
}
