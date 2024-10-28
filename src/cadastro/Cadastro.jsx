import { useEffect, useState } from 'react';
import Api from '../services/Api';
import { useLocation } from 'react-router-dom';
import Style from '../cadastro/Cadastro.module.css'
import ComponenteInput from './ComponenteInput';
import { FaTrash } from 'react-icons/fa';

const Cadastro = () => {
  const location = useLocation();
  const [users, setUsers] = useState(location.state?.users || []); // Inicializando o state com os users recebidos

  const [exercicios, setExercicios] = useState([]);
  const [exercicioAtual, setExercicioAtual] = useState('');

  // Função para buscar usuários da API e atualizar o estado local
  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios');
    setUsers(usersFromApi.data); // Atualizando o state com os usuários vindos da API
  }

  const adicionarExercicio = () =>{
    if(exercicioAtual.trim()=== '') return;
    setExercicios([...exercicios, exercicioAtual]);
    setExercicioAtual('');
  }
  useEffect(() => {
    // Atualiza os usuários sempre que o componente é montado
    getUsers();
  }, []); // Executa uma única vez ao montar o componente

  return (
    <>

      {users.length > 0 ? (
        users.map((user) => (
          <>
            <div className={Style.init} key={user.id}>
              <h1>Bem vindo: {user.name}</h1>
              <h2>Vamos cadastrar sua ficha de treino</h2>
            </div>
            <label>Treino A</label>
            <ComponenteInput 
              value={exercicioAtual}
              onChange={(e)=> setExercicioAtual(e.target.value)} 
              />
            <button 
              onClick={adicionarExercicio}
              className='border border-gray-100 bg-gray-500 text-black py-0.5 px-4  rounded'
              >Adicionar exercicio
            </button>
          <div className=' border border-gray-150 px-2 py-2'>
            <h2 className='bg-slate-100 text-black px-1'>Exercicios adicionados:</h2>
            <ul >
              {exercicios.map((exercicio, index) =>(
                <li className='flex items-center border border-gray-150 ' key={index}>{exercicio} <FaTrash className='ml-28'/></li>
              ))}
            </ul>
          </div>
          </>
        ))
      ) : (
        <h1>Nenhum usuário encontrado</h1>
      )}
    </>
  );
};

export default Cadastro;
