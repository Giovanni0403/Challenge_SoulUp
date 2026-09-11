type PerguntaFaqProps = {
  id: string;
  question: string;
  answer: string;
  aberta: boolean;
  alternar: () => void;
};

export default function PerguntaFaq(props: PerguntaFaqProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-teal-900/15 bg-white">
      <h3>
        <button
          id={'pergunta-' + props.id}
          type="button"
          aria-expanded={props.aberta}
          aria-controls={props.id}
          onClick={props.alternar}
          className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-semibold text-[#0d2225] hover:bg-teal-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal-800"
        >
          <span>{props.question}</span>
          <span aria-hidden="true" className="text-2xl text-teal-700">
            {props.aberta ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={props.id}
        aria-labelledby={'pergunta-' + props.id}
        hidden={!props.aberta}
        className="border-t border-teal-900/10 px-5 py-4 leading-relaxed text-slate-600"
      >
        {props.answer}
      </div>
    </div>
  );
}
