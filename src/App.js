import Filters from './components/Filters';
import Table from './components/Table';
import TextSearch from './components/TextSearch';
import Provider from './context/myProvider';

function App() {
  return (
    <Provider>
      <TextSearch />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
