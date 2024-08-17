export interface FormProps<T> {
  initialValues?: T;
  loading: boolean;
  onSubmit: (data: T) => void;
}
