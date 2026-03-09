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
  className =  'w-full p-4 bg-zinc-800/80 border border-teal-500/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-500/50 transition-colors',
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
