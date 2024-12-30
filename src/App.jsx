import Head from './components/Head';
import Map from './components/Map';

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <Head>Location</Head>
      <main className='flex-1'><Map /></main>
    </div>
  );
}

export default App;
