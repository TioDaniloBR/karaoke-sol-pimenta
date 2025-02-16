type Props = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ label, ...props }: Props) => {
  return (
    <div>
      <input type="checkbox" id="checkbox" {...props} />
      <label htmlFor="checkbox">{label}</label>
    </div>
  );
};
