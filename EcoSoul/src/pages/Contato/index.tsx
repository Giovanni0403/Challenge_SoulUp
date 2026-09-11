import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TituloPagina from '../../components/TituloPagina/TituloPagina';
import Card from '../../components/Card/Card';
import CampoFormulario from '../../components/CampoFormulario/CampoFormulario';
import { Botao } from '../../components/Botao/Botao';
import { members } from '../../dados/project';
import type { ContactValues } from '../../dados/tipos';

const valoresIniciais: ContactValues = {
  nome: '',
  email: '',
  telefone: '',
  mensagem: '',
  satisfacao: 5
};
const estiloCampo =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none placeholder:text-slate-500 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 aria-invalid:border-red-600';

function formatarTelefone(value: string) {
  const numeros = value.replace(/\D/g, '').slice(0, 11);
  if (numeros.length < 3) return numeros;
  const local = numeros.slice(2);
  const posicaoHifen = local.length > 8 ? 5 : 4;
  return `(${numeros.slice(0, 2)}) ${local.slice(0, posicaoHifen)}${local.length > posicaoHifen ? '-' + local.slice(posicaoHifen) : ''}`;
}
export default function Contato() {
  const [aviso, setAviso] = useState('');
  const [satisfacao, setSatisfacao] = useState(5);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ContactValues>({
    defaultValues: valoresIniciais,
    mode: 'onTouched'
  });
  function validarMensagem(dados: ContactValues) {
    setAviso(
      `${dados.nome.trim()}, sua mensagem foi validada nesta demonstração. Nenhum dado foi enviado ou armazenado. Para falar com a equipe, use os e-mails abaixo.`
    );
    reset(valoresIniciais);
    setSatisfacao(valoresIniciais.satisfacao);
  }
  function limparAviso() {
    setAviso('');
  }

  function limparFormulario() {
    reset(valoresIniciais);
    setSatisfacao(valoresIniciais.satisfacao);
    limparAviso();
  }

  return (
    <>
      <TituloPagina
        title="Vamos conversar?"
        description="Compartilhe sua dúvida, sugestão ou ideia. Sua opinião faz parte dessa jornada."
        eyebrow="CONTATO / FALE COM A ECOSOUL"
      />
      <div className="grid items-start gap-7 lg:grid-cols-[1.6fr_1fr]">
        <form
          noValidate
          onSubmit={handleSubmit(validarMensagem, limparAviso)}
          onChange={limparAviso}
          onReset={limparFormulario}
          className="min-w-0 rounded-xl bg-white p-6 shadow-sm md:p-8"
        >
          <fieldset className="min-w-0 space-y-5">
            <legend className="mb-2 text-2xl font-bold">
              Dados de contato
            </legend>
            <p className="text-sm text-slate-600">
              Campos com * são obrigatórios. O formulário é uma demonstração,
              sem envio de dados.
            </p>
            <CampoFormulario
              id="nome"
              label="Nome completo *"
              error={errors.nome?.message}
            >
              <input
                id="nome"
                autoComplete="name"
                maxLength={100}
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? 'nome-error' : undefined}
                className={estiloCampo}
                placeholder="Como podemos chamar você?"
                {...register('nome', {
                  required: 'Informe seu nome.',
                  validate: (value) =>
                    value.trim().length >= 3 ||
                    'Digite pelo menos 3 caracteres.',
                  maxLength: { value: 100, message: 'Use até 100 caracteres.' }
                })}
              />
            </CampoFormulario>
            <CampoFormulario
              id="email"
              label="E-mail *"
              error={errors.email?.message}
            >
              <input
                id="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={estiloCampo}
                placeholder="voce@exemplo.com"
                {...register('email', {
                  required: 'Informe seu e-mail.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Digite um e-mail válido, como voce@exemplo.com.'
                  }
                })}
              />
            </CampoFormulario>
            <CampoFormulario
              id="telefone"
              label="Telefone com DDD *"
              error={errors.telefone?.message}
            >
              <input
                id="telefone"
                type="tel"
                autoComplete="tel-national"
                maxLength={15}
                aria-invalid={!!errors.telefone}
                aria-describedby={
                  errors.telefone ? 'telefone-error' : undefined
                }
                className={estiloCampo}
                placeholder="(11) 99999-9999"
                {...register('telefone', {
                  required: 'Informe seu telefone.',
                  validate: (value) =>
                    /^\d{10,11}$/.test(value.replace(/\D/g, '')) ||
                    'Informe o DDD e um telefone com 10 ou 11 dígitos.',
                  onChange: (event) =>
                    setValue('telefone', formatarTelefone(event.target.value))
                })}
              />
            </CampoFormulario>
            <CampoFormulario
              id="mensagem"
              label="Como podemos ajudar? *"
              error={errors.mensagem?.message}
            >
              <textarea
                id="mensagem"
                rows={6}
                maxLength={2000}
                aria-invalid={!!errors.mensagem}
                aria-describedby={
                  errors.mensagem ? 'mensagem-error' : undefined
                }
                className={`${estiloCampo} resize-y`}
                placeholder="Digite sua mensagem aqui..."
                {...register('mensagem', {
                  required: 'Escreva sua mensagem.',
                  validate: (value) =>
                    value.trim().length >= 10 ||
                    'Escreva pelo menos 10 caracteres.',
                  maxLength: {
                    value: 2000,
                    message: 'Use até 2.000 caracteres.'
                  }
                })}
              />
            </CampoFormulario>
            <CampoFormulario
              id="satisfacao"
              label="Nível de satisfação"
              error={errors.satisfacao?.message}
            >
              <div className="flex items-center gap-4">
                <input
                  id="satisfacao"
                  type="range"
                  min={1}
                  max={5}
                  className="min-h-11 w-full accent-teal-700"
                  {...register('satisfacao', {
                    valueAsNumber: true,
                    min: 1,
                    max: 5,
                    onChange: (event) =>
                      setSatisfacao(Number(event.target.value))
                  })}
                />
                <output
                  htmlFor="satisfacao"
                  className="shrink-0 rounded-lg bg-teal-50 px-3 py-2 font-bold text-teal-800"
                >
                  {satisfacao} / 5
                </output>
              </div>
            </CampoFormulario>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Botao type="submit">Validar mensagem →</Botao>
              <Botao type="reset" variant="secondary">
                Limpar
              </Botao>
            </div>
            <div role="status" aria-live="polite">
              {aviso && (
                <p className="rounded-lg bg-teal-50 p-4 leading-relaxed text-teal-900">
                  {aviso}
                </p>
              )}
            </div>
          </fieldset>
        </form>
        <aside aria-labelledby="contatos">
          <h2 id="contatos" className="mb-5 text-2xl font-bold text-white">
            Informações para contato
          </h2>
          <div className="space-y-4">
            {members.map((member) => (
              <Card key={member.rm}>
                <h3 className="font-bold">{member.name}</h3>
                <a
                  className="mt-3 block text-sm text-teal-800 underline underline-offset-4"
                  href={`tel:+55${member.phone.replace(/\D/g, '')}`}
                >
                  {member.phone}
                </a>
                <a
                  className="mt-2 block break-all text-sm text-teal-800 underline underline-offset-4"
                  href={`mailto:rm${member.rm}@fiap.com.br`}
                >
                  rm{member.rm}@fiap.com.br
                </a>
              </Card>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
