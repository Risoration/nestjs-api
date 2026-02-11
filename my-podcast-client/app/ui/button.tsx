type ButtonProps = {
  text: string;
  onClick: () => void;
  type: 'submit' | 'reset' | 'button';
};

export function Button(
  { text, onClick, type }: ButtonProps,
  { children }: any,
) {
  return (
    <div className=''>
      <button type={type} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
