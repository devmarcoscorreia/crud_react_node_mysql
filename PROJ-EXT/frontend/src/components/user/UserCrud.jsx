import React, { Component } from "react";
import axios from 'axios';
import Main from "../templates/Main";

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users';
const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends Component {
    state = { ...initialState }

    componentDidMount() {
        this.loadUsers();
    }

    // Função para carregar todos os usuários
    loadUsers() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data });
        }).catch(error => {
            console.error('Erro ao carregar usuários:', error);
        });
    }

    // Função para limpar o formulário
    clear() {
        this.setState({ user: initialState.user });
    }

    // Função para salvar ou atualizar o usuário
    save() {
        const user = this.state.user;
        const method = user.id ? 'put' : 'post';
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;

        axios[method](url, user)
            .then(resp => {
                // Após salvar ou atualizar, recarrega a lista de usuários do backend
                this.loadUsers();
                this.setState({ user: initialState.user });
            }).catch(error => {
                console.error('Erro ao salvar o usuário:', error);
            });
    }

    // Atualiza o campo do formulário conforme o usuário digita
    updateField(event) {
        const user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    // Renderiza o formulário de entrada de dados
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="email" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={() => this.save()}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={() => this.clear()}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Carrega um usuário para ser editado no formulário
    load(user) {
        this.setState({ user });
    }

    // Remove um usuário e atualiza a lista local
    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`)
            .then(resp => {
                this.loadUsers();
            }).catch(error => {
                console.error('Erro ao remover usuário:', error);
            });
    }

    // Renderiza a tabela de usuários
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    // Renderiza as linhas da tabela de usuários
    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    // Renderiza o botão de sair para voltar à página anterior
    renderExitButton() {
        return (
            <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-secondary" onClick={() => window.history.back()}>
                    Sair
                </button>
            </div>
        );
    }

    // Renderiza o componente principal
    render() {
        return (
            <Main {...headerProps}>
                {this.renderExitButton()}
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
