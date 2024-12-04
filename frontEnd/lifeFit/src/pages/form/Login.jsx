import React from "react";
import FormComponent from "./FormComponent";
import Api from "../../services/Api";
import { useUserId } from "../../services/UserIDContext";
import './Style.css'
function Login() {
    const { setUserId } = useUserId();

    async function handleLogin(name, password) {
        try {
            const response = await Api.post("/login", {
                name,
                password,
            });
            setUserId(response.data.id); // Atualiza o contexto
            alert(`Bem-vindo, ${response.data.name} !`);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Nome ou senha inválidos.");
        }
    }

    return (
        <div>
            <FormComponent titulo="Login" functionForm={handleLogin} />
            <p >Não tem cadastro? <a className="text" href="/signup">Inscreva-se</a></p>
        </div>
    );
}

export default Login;
