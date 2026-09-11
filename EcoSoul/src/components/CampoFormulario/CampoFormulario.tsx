import type { ReactNode } from 'react';

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};
export default function CampoFormulario({
  id,
  label,
  error,
  children
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
