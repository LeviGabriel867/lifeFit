import { useEffect, useState } from 'react';
import Api from '../services/Api';
import { useLocation } from 'react-router-dom';
import Style from '../cadastro/Cadastro.module.css';
import ComponenteInput from './ComponenteInput';
import { FaTrash } from 'react-icons/fa';

const Cadastro = () => {
  const location = useLocation();
  const [users, setUsers] = useState(location.state?.users || []);
  const [treinos, setTreinos] = useState([]);
  const [exercicioAtual, setExercicioAtual] = useState('');
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');

  // Função para buscar usuários da API e atualizar o estado local
  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios');
    setUsers(usersFromApi.data);
  }

  // Função para buscar os treinos salvos
  async function getTreinos() {
    const treinosFromApi = await Api.get('/treinos');
    setTreinos(treinosFromApi.data);
  }

  // Adiciona um novo exercício e o envia para a API
  const adicionarExercicio = async () => {
    if (exercicioAtual.trim() === '' || series.trim() === '' || repeticoes.trim() === '') return;

    const newTreino = {
      exercicio: exercicioAtual,
      series: parseInt(series),
      repeticoes: parseInt(repeticoes),
      userId: users[0]?.id, // Usando o primeiro usuário como exemplo
    };

    try {
      const response = await Api.post('/treinos', newTreino);
      setTreinos([...treinos, response.data]);
      setExercicioAtual('');
      setSeries('');
      setRepeticoes('');
    } catch (error) {
      console.error("Erro ao adicionar o treino:", error);
    }
  };

  useEffect(() => {
    getUsers();
    getTreinos();
  }, []);

  return (
    <>
      {users.length > 0 ? (
        users.map((user) => (
          <div className={Style.init} key={user.id}>
            <h1>Bem vindo: {user.name}</h1>
            <h2>Vamos cadastrar sua ficha de treino</h2>
            <label>Treino A</label>

            <ComponenteInput
              value={exercicioAtual}
              onChange={(e) => setExercicioAtual(e.target.value)}

              series={series}
              onChangeSeries={(e) => setSeries(e.target.value)}
              
              repeticoes={repeticoes}
              onChangeRepeticoes={(e)=> setRepeticoes(e.target.value)}
            />
    
            <button
              onClick={adicionarExercicio}
              className="border border-gray-100 bg-gray-500 text-white py-0.5 px-4 rounded"
            >
              Adicionar exercício
            </button>

            <div className="border border-gray-150 px-2 py-2">
              <h2 className="bg-slate-100 text-black px-1">Exercícios adicionados:</h2>
              
              <ul>
                  {treinos.map((treino, index) => (
                    <li className="flex flex-col items-start border border-gray-150 p-2 mb-2" key={index}>
                      <div>Exercício: {treino.exercicio}</div>
                      <div>Séries: {treino.series}</div>
                      <div>Repetições: {treino.repeticoes}</div>
                      <FaTrash className="self-end mt-2 cursor-pointer" />
                    </li>
                  ))}
              </ul>

            </div>
          </div>
        ))
      ) : (
        <h1>Nenhum usuário encontrado</h1>
      )}
    </>
  );
};

export default Cadastro;
