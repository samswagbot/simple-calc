interface KeyPadProps {
  className?: string;
  value: string | number;
  onClick: (event: React.MouseEvent) => void;
}

export default function KeyPad({ className, value, onClick }: KeyPadProps) {
  return (
    <button onClick={onClick} className={className}>
      {value}
    </button>
  );
}
