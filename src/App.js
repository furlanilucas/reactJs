import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    // Verificar e carregar as tarefas do localStorage ao montar o componente
    const tarefasStorage = localStorage.getItem('@tarefa');
    if (tarefasStorage) {
      const parsedTarefas = JSON.parse(tarefasStorage);
      setTarefas(parsedTarefas);
      console.log('Tarefas carregadas do localStorage:', parsedTarefas);
    } else {
      console.log('Nenhuma tarefa encontrada no localStorage.');
    }
  }, []);

  useEffect(() => {
    // Salvar as tarefas no localStorage sempre que a lista de tarefas mudar
    localStorage.setItem('@tarefa', JSON.stringify(tarefas));
    console.log('Tarefas salvas no localStorage:', tarefas);
  }, [tarefas]);

  function handleRegister(e) {
    e.preventDefault();
    if (input.trim()) {
      const novasTarefas = [...tarefas, input];
      setTarefas(novasTarefas); // Adiciona a nova tarefa à lista
      setInput(''); // Limpa o campo de entrada
      console.log('Nova tarefa adicionada:', input);
    }
  }

  return (
    <div>
      <h1>Lista de tarefas</h1>

      <form onSubmit={handleRegister}>
        <label>Nome da tarefa</label><br />
        <input
          placeholder='Digite a tarefa'
          value={input}
          onChange={(event) => setInput(event.target.value)}
        /><br />
        <br />

        <button type='submit'>Registrar</button>
      </form>
      <br />
      
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>{tarefa}</li> // Usa o índice como chave por simplicidade
        ))}
      </ul>
    </div>
  );
}

export default App;
