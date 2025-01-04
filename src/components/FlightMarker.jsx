import { Marker, InfoWindow, Polyline } from '@react-google-maps/api';

function FlightMarker({ flightData }) {
  const {
    position, flightNumber, heading, path,
  } = flightData;

  // Create SVG string with dynamic rotation
  const getAirplaneIcon = (rotation) => `data:image/svg+xml,${encodeURIComponent(`
      <svg width="48" height="48" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <path 
          fill="#FFD700" 
          stroke="#000" 
          stroke-width="10"
          transform="rotate(${rotation}, 400, 400)"
          d="M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684"
        />
      </svg>
    `)}`;

  return (
    <>
      <Marker
        position={position}
        icon={{
          url: getAirplaneIcon(heading), // Adjust rotation to match the heading
          scaledSize: new window.google.maps.Size(48, 48),
          anchor: new window.google.maps.Point(24, 24),
        }}
      >
        <InfoWindow position={position}>
          <span>{flightNumber}</span>
        </InfoWindow>
      </Marker>
      <Polyline
        path={path}
        options={{
          strokeColor: '#FF00FF',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        }}
      />
    </>
  );
}

export default FlightMarker;
