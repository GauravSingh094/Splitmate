import { createContext, useContext, useId } from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

export const Form = FormProvider;

interface FormItemContextValue {
  id: string;
  name: string;
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

const FormFieldContext = createContext<{ name: string }>({ name: '' });

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const id = useId();
  const fieldContext = useContext(FormFieldContext);

  return (
    <FormItemContext.Provider value={{ id, name: fieldContext.name }}>
      <div className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
}

export function useFormField() {
  const itemContext = useContext(FormItemContext);
  const fieldContext = useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name || itemContext.name || '', formState);

  if (!itemContext) {
    throw new Error('useFormField should be used within <FormItem>');
  }

  return {
    id: itemContext.id,
    name: fieldContext.name || itemContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    error: fieldState.error,
    getFieldState,
    formState,
  };
}

export function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { formItemId } = useFormField();
  return (
    <label
      htmlFor={formItemId}
      className={cn('text-sm font-medium text-foreground select-none', className)}
      {...props}
    />
  );
}

export function FormControl({ ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <div
      id={formItemId}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={Boolean(error)}
      {...props}
    />
  );
}

export function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { formDescriptionId } = useFormField();
  return (
    <p
      id={formDescriptionId}
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}

export function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) return null;

  return (
    <p id={formMessageId} className={cn('text-xs font-medium text-danger', className)} {...props}>
      {body}
    </p>
  );
}
