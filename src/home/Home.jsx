import { useEffect, useRef, useState } from 'react';
import Style from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import Api from '../services/Api';

const Home = () => {
  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputEmail = useRef();
  const navigate = useNavigate();

  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios');
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    try{
    await Api.post('/usuarios', {
      name: inputName.current.value,
      email: inputEmail.current.value,
    });
    await getUsers(); // Atualiza a lista de usuários após a criação
    handleCadastro();
  }catch(error){
    alert( (error.response?.data?.msg || error.message)+". Faça login");
      console.error("Erro ao criar usuário:", error); // Para depuração
  }
  }
  


  
  async function loginUsers() {
    try{
    await Api.post('/usuarios/login', {
      email: inputEmail.current.value
    });
    navigate('/cadastro', {state:{users}});
  }catch(error){
    alert( (error.response?.data?.msg || error.message)+". Faça login");
      console.error("Erro ao criar usuário:", error); // Para depuração
  }
  }

  useEffect(() => {

    getUsers(); // Carrega os usuários ao carregar a página
  }, []);

  const handleCadastro = () => {
    navigate('/cadastro', { state: { users } }); // Navega para a página de cadastro com a lista atualizada
  };

  return (
    <div className={Style.init}>
      <h1>Acesse a plataforma</h1>
      <form className={Style.form}>
        <input type="text" id="nome" placeholder="Digite seu nome" ref={inputName} />
        <input type="email" id="email" placeholder="Insira seu email" ref={inputEmail} />
        <div className={Style["form-buttons"]}>
          <button
            type="button"
            id="button1"
            onClick={async () => {
              await createUsers();
              
            }}
          >
            Cadastrar
          </button>
          <button type="button" id="button2" onClick={async()=> {await loginUsers()}}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
