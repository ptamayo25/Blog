import { useState, useCallback } from "react";

export function useForm(initialValues = {}, validate = () => ({})) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear error when field is modified
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate field on blur
      const fieldErrors = validate({ [name]: values[name] });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
    },
    [values, validate]
  );

  const handleSubmit = useCallback(
    async (onSubmit) => {
      setIsSubmitting(true);

      // Validate all fields
      const formErrors = validate(values);
      setErrors(formErrors);

      if (Object.keys(formErrors).length === 0) {
        try {
          await onSubmit(values);
          setValues(initialValues);
          setTouched({});
        } catch (error) {
          setErrors((prev) => ({ ...prev, submit: error.message }));
        }
      }

      setIsSubmitting(false);
    },
    [values, initialValues, validate]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
