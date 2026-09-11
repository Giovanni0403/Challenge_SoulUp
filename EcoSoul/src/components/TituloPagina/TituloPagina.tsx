import { useEffect } from 'react';

type PageHeadingProps = {
  title: string;
  description: string;
  eyebrow?: string;
};
export default function TituloPagina({
  title,
  description,
  eyebrow = 'ECOSOUL / MOBILIDADE SUSTENTÁVEL'
}: PageHeadingProps) {
  useEffect(() => {
    document.title = title + ' | EcoSoul';
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('conteudo')?.focus({ preventScroll: true });
  }, [title]);

  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold tracking-[0.16em] text-[#043e42]">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-[#043e42]">
        {description}
      </p>
    </div>
  );
}
