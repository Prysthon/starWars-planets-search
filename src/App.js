import Table from './components/Table';
import TextSearch from './components/TextSearch';
import Provider from './context/myProvider';

function App() {
  return (
    <Provider>
      <TextSearch />
      <Table />
    </Provider>
  );
}

export default App;
