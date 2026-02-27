type InputProps = {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
};

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  className = 'relative py-4 mb-2 focus:shadow-teal-500/40 focus:shadow-lg focus:outline-none border-b-2 border-teal-500/30 focus:border-teal-400 transition-colors',
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={className}
    />
  );
}
