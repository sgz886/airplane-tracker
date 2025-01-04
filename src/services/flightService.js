// Using WebSocket
class FlightService {
  constructor(callback) {
    this.callback = callback;
    this.ws = new WebSocket('wss://your-backend/flights');
    this.setupWebSocket();
  }

  setupWebSocket() {
    this.ws.onmessage = (event) => {
      const flightData = JSON.parse(event.data);
      this.callback(flightData);
    };

    this.ws.onclose = () => {
      setTimeout(() => this.setupWebSocket(), 3000);
    };
  }

  unsubscribe() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export default (callback) => {
  const service = new FlightService(callback);
  return () => service.unsubscribe();
};
