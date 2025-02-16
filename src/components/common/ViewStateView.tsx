import { ViewState } from 'react-map-gl/mapbox';

export default function ViewStateView(props: { viewState: ViewState }) {
  return (
    <div className='card-container container-dark absolute top-2 left-2 w-48 '>
      <pre className='p-2'>{JSON.stringify(props.viewState, undefined, 2)}</pre>
    </div>
  );
}
