import { LinkBotao } from '../../components/Botao/Botao';
import TituloPagina from '../../components/TituloPagina/TituloPagina';

export default function NaoEncontrada() {
  return (
    <div className="py-16 text-center">
      <TituloPagina
        title="Página não encontrada"
        description="Este caminho não existe. Continue sua jornada pela página inicial."
        eyebrow="404 / VAMOS ENCONTRAR OUTRO CAMINHO"
      />
      <LinkBotao to="/">Voltar para Home</LinkBotao>
    </div>
  );
}
