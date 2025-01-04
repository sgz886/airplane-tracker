const allPositions = [
  { lng: 144.9062356, lat: -37.6425174 },
  { lng: 144.9020498, lat: -37.6434476 },
  { lng: 144.8960811, lat: -37.6447654 },
  { lng: 144.8918177, lat: -37.6456180 },
  { lng: 144.8871668, lat: -37.6470908 },
  { lng: 144.8821283, lat: -37.6482536 },
  { lng: 144.8756945, lat: -37.6510441 },
  { lng: 144.8693382, lat: -37.6530595 },
  { lng: 144.8636795, lat: -37.6548424 },
  { lng: 144.8587185, lat: -37.6567028 },
  { lng: 144.8547652, lat: -37.6580205 },
  { lng: 144.8521297, lat: -37.6595708 },
  { lng: 144.8508895, lat: -37.6608886 },
  { lng: 144.8494167, lat: -37.6633691 },
  { lng: 144.8489516, lat: -37.6655395 },
  { lng: 144.8490291, lat: -37.6671674 },
  { lng: 144.8496492, lat: -37.6688727 },
  { lng: 144.8511995, lat: -37.6694928 },
  { lng: 144.8536800, lat: -37.6694928 },
  { lng: 144.8554629, lat: -37.6692603 },
];

const INIT_NUMBER_OF_POSITIONS = 5;

function calculateHeading(currentPosition, prevPosition) {
  return (Math.atan2(
    currentPosition.lng - prevPosition.lng,
    currentPosition.lat - prevPosition.lat,
  ) * 180) / Math.PI;
}

// Mock WebSocket implementation
class MockWebSocket {
  constructor() {
    this.callbacks = new Set();
    this.startEmitting();
    this.flightPathLength = INIT_NUMBER_OF_POSITIONS;
  }

  generateData() {
    const fullPath = allPositions.slice(0, this.flightPathLength);
    const heading = calculateHeading(fullPath[fullPath.length - 1], fullPath[fullPath.length - 2]);
    return {
      flightNumber: 'Plane01',
      position: fullPath[fullPath.length - 1],
      heading,
      path: fullPath,
    };
  }

  subscribe(callback) {
    this.callbacks.add(callback);
    // Send initial data
    callback(this.generateData());

    return () => this.callbacks.delete(callback);
  }

  startEmitting() {
    setInterval(() => {
      if (this.flightPathLength < allPositions.length) {
        this.flightPathLength += 1;
      } else {
        this.flightPathLength = INIT_NUMBER_OF_POSITIONS;
      }

      const data = this.generateData();

      this.callbacks.forEach((cb) => cb(data));
    }, 1000);
  }
}

const mockWS = new MockWebSocket();
export default (callback) => mockWS.subscribe(callback);
