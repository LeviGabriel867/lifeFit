import React from "react";
import FormComponent from "./FormComponent";
import Api from "../../services/Api";
import { useUserId } from "../../services/UserIDContext";
import './Style.css'
function SignUp() {
    const { setUserId } = useUserId();

    async function createUser(name, password) {
        try {
            const response = await Api.post("/signup", {
                name,
                password,
            });
            setUserId(response.data.id); // Atualiza o contexto
            alert("Usuário cadastrado com sucesso!");
        } catch (error) {
            alert(  error.response.data.error || "Erro ao criar usuário:");
        }
    }

    return (
        <div>
            <FormComponent titulo="Cadastro" functionForm={createUser} />
            <p>Cadastrado? <a className="text" href="/"> Fazer login</a></p>
        </div>
        
    );
}

export default SignUp;
