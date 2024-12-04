import React, { useRef } from "react";
import './Style.css'
function FormComponent({ titulo, functionForm }) {
    const inputName = useRef();
    const inputPassword = useRef();

    function handleFormSubmit() {
        const name = inputName.current.value;
        const password = inputPassword.current.value;
        functionForm(name, password); // Passa os valores para a função
    }

    return (
        <div className="form">
            <h1>Faça {titulo}</h1>
            <form>
                <label htmlFor="name">Nome:</label>
                <input type="text" placeholder="Seu nome" ref={inputName} />
                <label htmlFor="password">Senha:</label>
                <input type="password" placeholder="Digite sua senha" ref={inputPassword} />
            </form>
            <button type="button" onClick={handleFormSubmit}>
                Enviar
            </button>
        </div>
    );
}

export default FormComponent;
