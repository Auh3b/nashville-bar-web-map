interface HeaderProps {
  explore: string;
}

export default function Header(props: HeaderProps) {
  const { explore } = props;
  return (
    <div className='mb-2'>
      <p className='text-xl font-bold mb-1'>Welcome to blog</p>
      {explore ? (
        <p className='text-sm'>Select a bar in {explore}</p>
      ) : (
        <p>Start by exploring neighbourhood</p>
      )}
    </div>
  );
}
