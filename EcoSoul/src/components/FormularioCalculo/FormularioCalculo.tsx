import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Botao } from '../Botao/Botao';
import CampoFormulario from '../CampoFormulario/CampoFormulario';
import { nomesTransporte } from '../../dados/calculo';
import type { DadosCalculo, TipoTransporte } from '../../dados/tipos';

type FormularioCalculoProps = {
  valoresIniciais?: DadosCalculo;
  textoBotao: string;
  // Deve lançar erro se a API recusar; o formulário mostra a mensagem.
  onSalvar: (dados: DadosCalculo) => Promise<void>;
  onCancelar?: () => void;
  limparAoSalvar?: boolean;
};

const valoresPadrao: DadosCalculo = {
  nome: '',
  tipoTransporte: 'ONIBUS',
  distanciaKm: 1
};
const estiloCampo =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none placeholder:text-slate-500 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 aria-invalid:border-red-600';

export default function FormularioCalculo({
  valoresIniciais = valoresPadrao,
  textoBotao,
  onSalvar,
  onCancelar,
  limparAoSalvar = false
}: FormularioCalculoProps) {
  const [enviando, setEnviando] = useState(false);
  const [erroApi, setErroApi] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DadosCalculo>({ defaultValues: valoresIniciais, mode: 'onTouched' });

  async function enviar(dados: DadosCalculo) {
    setEnviando(true);
    setErroApi('');
    try {
      await onSalvar({ ...dados, nome: dados.nome.trim() });
      if (limparAoSalvar) reset(valoresPadrao);
    } catch (erro) {
      setErroApi(erro instanceof Error ? erro.message : 'Erro inesperado.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(enviar)} className="space-y-5">
      <CampoFormulario id="nome" label="Nome de usuário *" error={errors.nome?.message}>
        <input
          id="nome"
          maxLength={100}
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? 'nome-error' : undefined}
          className={estiloCampo}
          placeholder="Ex.: maria.silva"
          {...register('nome', {
            validate: (valor) => {
              if (!valor.trim()) return 'Informe o nome de usuário.';
              if (/^\d+([.,]\d+)?$/.test(valor.trim())) return 'O nome não pode ser só um número.';
              return true;
            },
            maxLength: { value: 100, message: 'Use até 100 caracteres.' }
          })}
        />
      </CampoFormulario>

      <fieldset>
        <legend className="mb-2 block text-sm font-semibold">Transporte *</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(nomesTransporte) as TipoTransporte[]).map((tipo) => (
            <label
              key={tipo}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-slate-300 px-4 has-checked:border-teal-700 has-checked:bg-teal-50"
            >
              <input
                type="radio"
                value={tipo}
                className="accent-teal-700"
                {...register('tipoTransporte', { required: true })}
              />
              {nomesTransporte[tipo]}
            </label>
          ))}
        </div>
      </fieldset>

      <CampoFormulario
        id="distanciaKm"
        label="Distância do trajeto (km) *"
        error={errors.distanciaKm?.message}
      >
        <input
          id="distanciaKm"
          type="number"
          inputMode="decimal"
          min={0.1}
          max={1000}
          step={0.1}
          aria-invalid={!!errors.distanciaKm}
          aria-describedby={errors.distanciaKm ? 'distanciaKm-error' : undefined}
          className={estiloCampo}
          {...register('distanciaKm', {
            valueAsNumber: true,
            validate: (valor) => {
              if (Number.isNaN(valor)) return 'Informe a distância.';
              if (valor <= 0) return 'A distância deve ser maior que zero.';
              if (valor > 1000) return 'A distância máxima é 1000 km.';
              return true;
            }
          })}
        />
      </CampoFormulario>

      {erroApi && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-800">
          {erroApi}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Botao type="submit" disabled={enviando}>
          {enviando ? 'Enviando…' : textoBotao}
        </Botao>
        {onCancelar && (
          <Botao variant="secondary" onClick={onCancelar} disabled={enviando}>
            Cancelar
          </Botao>
        )}
      </div>
    </form>
  );
}
