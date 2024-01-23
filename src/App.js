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
      { id: '2', name: 'Jane Smith', age: 30 },
      {
        id: '3',
        name: 'Bob Johnson',
        age: 40,
        subRows: [
          { id: '3.1', name: 'Bob Jr.', age: 10 },
          { id: '3.2', name: 'Bobette', age: 15 },
        ],
      },
      { id: '4', name: 'Alice White', age: 28 },
      { id: '5', name: 'Charlie Brown', age: 35 },
      {
        id: '6',
        name: 'Eva Green',
        age: 45,
        subRows: [
          { id: '6.1', name: 'Eva Jr.', age: 20 },
          { id: '6.2', name: 'Evan', age: 22 },
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
