import { ViewState } from 'react-map-gl/mapbox';

export default function ViewStateView(props: { viewState: ViewState }) {
  return (
    <div className='card-container container-dark absolute top-2 left-2 w-48 overflow-x-scroll p-4'>
      <pre className=''>{JSON.stringify(props.viewState, undefined, 2)}</pre>
    </div>
  );
}
