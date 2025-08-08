import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  description?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  required = false,
  children,
  description
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      {description && (
        <p className="text-sm text-gray-500 mb-2" id={`${id}-description`}>
          {description}
        </p>
      )}
      {React.cloneElement(children as React.ReactElement, {
        id,
        'aria-invalid': error ? 'true' : 'false',
        'aria-describedby': error
          ? `${id}-error ${description ? `${id}-description` : ''}`
          : description
            ? `${id}-description`
            : undefined,
        required
      })}
      {error && (
        <p
          className="mt-1 text-sm text-red-600"
          id={`${id}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

interface AccessibleFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error?: string;
}

const AccessibleForm: React.FC<AccessibleFormProps> = ({
  children,
  onSubmit,
  error,
  ...props
}) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label={props['aria-label']}
      {...props}
    >
      {error && (
        <div
          className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md"
          role="alert"
        >
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      {children}
    </form>
  );
};

export default AccessibleForm; 