import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState, memo } from 'react';

const defaultCenter = {
  lat: -37.8136,
  lng: 144.9631,
};

const libraries = ['marker', 'places'];

function Map() {
  const [marker, setMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'map1',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'en',
    libraries,
  });

  const onLoad = useCallback((mapInstance) => {
    const newMarker = new window.google.maps.marker.AdvancedMarkerElement({
      map: mapInstance,
      position: defaultCenter,
      title: 'my location',
    });
    setMarker(newMarker);
  }, []);

  const onUnmount = useCallback(() => {
    if (marker) {
      marker.setMap(null);
    }
  }, [marker]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={defaultCenter}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapId: process.env.REACT_APP_GOOGLE_MAPS_MAP_ID,
      }}
    />

  );
}

export default memo(Map);
