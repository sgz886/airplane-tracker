import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState, memo } from 'react';

const defaultCenter = {
  lat: -37.8136,
  lng: 144.9631,
};

const libraries = ['marker', 'places', 'drawing'];

function Map() {
  const [marker, setMarker] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);
  const [shapes, setShapes] = useState([]);

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
      polylineOptions: {
        strokeColor: '#FF0000',
        strokeWeight: 2,
      },
      polygonOptions: {
        strokeColor: '#FF0000',
        strokeWeight: 2,
        fillColor: 'yellow',
        fillOpacity: 0.3,
      },
    });
    drawingManagerInstance.setMap(mapInstance);
    setDrawingManager(drawingManagerInstance);

    // Add listener for when a shape is completed
    window.google.maps.event.addListener(
      drawingManagerInstance,
      'overlaycomplete',
      (event) => {
        drawingManagerInstance.setDrawingMode(null);
        const shape = event.overlay;
        setShapes((prev) => [...prev, shape]);
      },
    );
  }, []);

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

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className='relative h-full w-full'>
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
      <div className='absolute bottom-4 left-4 flex gap-2'>
        <button
          type='button'
          onClick={startDrawingLine}
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        >
          Draw Line
        </button>
        <button
          type='button'
          onClick={startDrawingPolygon}
          className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
        >
          Draw Polygon
        </button>
        <button
          type='button'
          onClick={clearDrawings}
          className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default memo(Map);
