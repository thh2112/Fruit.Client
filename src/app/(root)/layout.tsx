interface Props {
  children: React.ReactNode;
  a: React.ReactNode;
  b: React.ReactNode;
}
export default function layout({ children, a, b }: Props) {
  return (
    <div>
      <div>{children}</div>
      <div>{a}</div>
      <div>{b}</div>
      <div>Layout</div>
    </div>
  );
}
