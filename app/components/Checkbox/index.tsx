import { useId } from "react";

type Props = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ label, ...props }: Props) => {
  const id = useId();
  return (
    <div>
      <input type="checkbox" id={id} {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
