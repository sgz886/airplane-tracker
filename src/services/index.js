import mockWebsocket from './mockWebsocket';
import flightService from './flightService';

export default process.env.REACT_APP_USE_MOCK ? mockWebsocket : flightService;
