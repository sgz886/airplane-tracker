import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {
  memo, useCallback, useEffect, useState,
} from 'react';
import FlightMarker from './FlightMarker';
import subscribeToFlightData from '../../services';
import ActionButton from './ActionButton';

const defaultLocation = {
  lat: -37.66,
  lng: 144.88,
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const polylineOptions = {
  strokeColor: '#FF0000',
  strokeWeight: 2,
};
const polygonOptions = {
  strokeColor: '#FF0000',
  strokeWeight: 2,
  fillColor: 'yellow',
  fillOpacity: 0.3,
};

const libraries = ['marker', 'places', 'drawing'];

function Map() {
  const [marker, setMarker] = useState(null);
  const [flightData, setFlightData] = useState({});
  const [drawingManager, setDrawingManager] = useState(null);
  const [shapes, setShapes] = useState([]);
  console.log('shapes = ', shapes);
  const { isLoaded } = useJsApiLoader({
    id: 'map1',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'en',
    libraries,
  });

  useEffect(() => {
    // Subscribe to flight data updates
    const unsubscribe = subscribeToFlightData(setFlightData);
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const createMarker = (mapInstance) => {
    const newMarker = new window.google.maps.marker.AdvancedMarkerElement({
      map: mapInstance,
      position: defaultLocation,
      title: 'my location',
    });
    setMarker(newMarker);
  };

  const createDrawingManager = (mapInstance) => {
    const drawingManagerInstance = new window.google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: false,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          window.google.maps.drawing.OverlayType.POLYLINE,
          window.google.maps.drawing.OverlayType.POLYGON,
        ],
      },
      polylineOptions,
      polygonOptions,
    });

    drawingManagerInstance.setMap(mapInstance);
    setDrawingManager(drawingManagerInstance);

    window.google.maps.event.addListener(
      drawingManagerInstance,
      'overlaycomplete',
      (event) => {
        const shape = event.overlay;
        setShapes((prev) => [...prev, shape]);
        drawingManagerInstance.setDrawingMode(null);
      },
    );
  };

  const onLoad = useCallback(
    (mapInstance) => {
      // createMarker(mapInstance);
      createDrawingManager(mapInstance);
    },
    [],
  );

  const onUnmount = useCallback(() => {
    if (marker) {
      marker.setMap(null);
    }
    if (drawingManager) {
      drawingManager.setMap(null);
    }
    shapes.forEach((shape) => shape.setMap(null));
  }, [marker, drawingManager, shapes]);

  const startDrawingLine = () => {
    if (drawingManager) {
      drawingManager.setDrawingMode(
        window.google.maps.drawing.OverlayType.POLYLINE,
      );
    }
  };

  const startDrawingPolygon = () => {
    if (drawingManager) {
      drawingManager.setDrawingMode(
        window.google.maps.drawing.OverlayType.POLYGON,
      );
    }
  };

  const clearDrawings = () => {
    shapes.forEach((shape) => shape.setMap(null));
    setShapes([]);
    if (drawingManager) {
      drawingManager.setDrawingMode(null);
    }
  };

  if (!isLoaded) return <div className='text-2xl'>Loading...</div>;

  return (
    <div className='relative h-full w-full'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultLocation}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapId: process.env.REACT_APP_GOOGLE_MAPS_MAP_ID,
        }}
      >
        {flightData && <FlightMarker flightData={flightData} />}
      </GoogleMap>
      <div className='absolute bottom-4 left-4 flex gap-2'>
        <ActionButton
          onClick={startDrawingLine}
          className='bg-blue-500 hover:bg-blue-600'
        >
          Draw Line
        </ActionButton>
        <ActionButton
          onClick={startDrawingPolygon}
          className='bg-green-500 hover:bg-green-600'
        >
          Draw Polygon
        </ActionButton>
        <ActionButton
          onClick={clearDrawings}
          className='bg-red-500 hover:bg-red-600'
        >
          Clear
        </ActionButton>
      </div>
    </div>
  );
}

export default memo(Map);
