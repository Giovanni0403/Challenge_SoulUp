import Card from '../../components/Card/Card';
import TituloPagina from '../../components/TituloPagina/TituloPagina';
import { members } from '../../dados/project';

export default function Integrantes() {
  return (
    <>
      <TituloPagina
        title="Quem faz a EcoSoul"
        description="Quatro pessoas, uma ideia em comum: transformar mobilidade em impacto positivo."
        eyebrow="INTEGRANTES / 1TDSPH"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <Card key={member.rm} className="flex flex-col">
            <img
              src={`/img/${member.image}`}
              alt={member.name}
              className="mb-5 aspect-square w-full rounded-lg object-cover object-top"
              loading="lazy"
            />
            <h2 className="text-xl font-bold">{member.name}</h2>
            <p className="mt-2 text-sm text-slate-600">
              RM {member.rm} · 1TDSPH
            </p>
            <div className="mt-auto flex flex-wrap gap-4 pt-5 text-sm font-semibold text-teal-800">
              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
                aria-label={`GitHub de ${member.name} (abre em nova aba)`}
              >
                GitHub ↗
              </a>
              <a
                href={`https://www.linkedin.com/in/${member.linkedin}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
                aria-label={`LinkedIn de ${member.name} (abre em nova aba)`}
              >
                LinkedIn ↗
              </a>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
