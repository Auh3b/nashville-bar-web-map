import BeerLogo from '../../../assets/beer.svg';

export default function LoadingMap() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div
        className='w-24 h-36 relative'
        style={{
          mask: `url(${BeerLogo})`,
          maskRepeat: 'no-repeat no-repeat',
          maskSize: 'cover',
        }}>
        <div className='bg-yellow-400 absolute bottom-0 rotate-180 w-full animate-[loading_2s_ease-in-out_infinite]'></div>
      </div>
    </div>
  );
}
