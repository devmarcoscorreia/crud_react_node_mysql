import React from "react";
import Main from '../templates/Main'

export default props =>
    <Main icon='home' title='Início'
        subtitle='Projeto frontend criado com React'>
        <div className='display-4'>Bem vindo!</div>
        <hr />
        <p className="mb-0">Sistema de cadastro de clientes desenvolvido com React e Mysql</p>
    </Main>
