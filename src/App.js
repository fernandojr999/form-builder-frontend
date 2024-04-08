import React, { useEffect, useState } from 'react';
import './App.css';
import DynamicForm from './DynamicForm';
import FormCreate from './form-create/FormCreate';

function App() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [createState, setCreateState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/metadata');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenForm = async (item) => {
    setSelectedItem(item);
    setCreateState(null);
    try {
      const response = await fetch(`http://localhost:8080/data/${item.id}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar dados');
      }
      const jsonData = await response.json();
      setJsonData(jsonData);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  const handleCreateForm = async () => {
    setSelectedItem(null)
    setCreateState(true);
  }

  return (
    <div>
      <ul style={{display: 'flex', textDecoration: 'none',}}>
        <li style={{marginLeft: '20px'}}>
          <button onClick={() => handleCreateForm()}>Criar Formulário</button>
        </li>
        {data.map((item, index) => (
          <li key={index} style={{marginLeft: '20px'}}>
            <button onClick={() => handleOpenForm(item)}>{item.name}</button>
          </li>
        ))}
      </ul>

      {selectedItem && (
        <div className='form-container'>
          <label>{selectedItem.name}   </label>
          <button onClick={() => setSelectedItem(null)}>Fechar Formulário</button>
          <br></br>

          <table style={{ border: '1px solid black'}}>
            <thead>
              <tr>
                {selectedItem.fields.map((item, index) => (
                  <td style={{width: '10%'}}>{item.name}</td>
                ))}
              </tr>
            </thead>
            <tbody>
            {jsonData.map((item, index) => (
              <tr>
                {selectedItem.fields.map((field, index1) => (
                  <td style={{ border: '1px solid black', width: '10%'}}>{JSON.parse(item)[field.name]}</td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>

          <DynamicForm formJSON={selectedItem} />
        </div>
      )}
      
      {createState &&(
        <div className='form-container'>
          <FormCreate/>
        </div>
      )}

      </div>
  );
}

export default App;
