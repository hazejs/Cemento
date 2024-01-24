import './App.css';
import Table from './components/Table';

function App() {

  const fakeTableData = {
    columns: {
      name: { id: 'name', ordinalNo: 1, title: 'Name', type: 'string' },
      age: { id: 'age', ordinalNo: 2, title: 'Age', type: 'number' },
    },
    data: [
      { id: '1', name: 'John Doe', age: 25 },
      { id: '2', name: 'Tomer Eden', age: 30 },
      {
        id: '3',
        name: 'Bob Johnson',
        age: 40,
        subRows: [
          { id: '3.1', name: 'Bob Marley', age: 10 },
          { id: '3.2', name: 'The Hulk', age: 15 },
        ],
      },
      { id: '4', name: 'Spiderman', age: 28 },
      { id: '5', name: 'Igal Antebi', age: 35 },
      {
        id: '6',
        name: 'Hulk Hogan',
        age: 45,
        subRows: [
          { id: '6.1', name: 'Dr. Strange', age: 20 },
          { id: '6.2', name: 'Thor', age: 22 },
        ],
      },
    ],
  };

  return (
    <div className="App">
      <Table tableData={fakeTableData}/>
    </div>
  );
}

export default App;
