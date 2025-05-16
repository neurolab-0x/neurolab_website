import { useState, useCallback } from 'react';
import { z } from 'zod';
import { useAppUtils } from './useAppUtils';

export function useFormValidation<T extends z.ZodObject<any>>(schema: T) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { handleError } = useAppUtils();

  const validate = useCallback(
    (data: unknown): data is z.infer<T> => {
      try {
        schema.parse(data);
        setErrors({});
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            if (err.path) {
              newErrors[err.path.join('.')] = err.message;
            }
          });
          setErrors(newErrors);
        } else {
          handleError(error instanceof Error ? error : new Error('Validation failed'));
        }
        return false;
      }
    },
    [schema, handleError]
  );

  const validateField = useCallback(
    (field: string, value: unknown): boolean => {
      try {
        const fieldSchema = schema.shape[field];
        if (!fieldSchema) {
          return true;
        }
        fieldSchema.parse(value);
        setErrors((prev) => ({ ...prev, [field]: '' }));
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const message = error.errors[0]?.message || 'Invalid value';
          setErrors((prev) => ({ ...prev, [field]: message }));
        }
        return false;
      }
    },
    [schema]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const getFieldError = useCallback(
    (field: string): string | undefined => {
      return errors[field];
    },
    [errors]
  );

  return {
    validate,
    validateField,
    clearErrors,
    getFieldError,
    errors,
  };
} 