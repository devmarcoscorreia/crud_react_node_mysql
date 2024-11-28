# crud_react_node_mysql
Projeto usando React no frontend e Node no backend com banco Mysql

Banco e tabela criados no mysql - conexão root
**********************************************

CREATE DATABASE IF NOT EXISTS meubanco;

use meubanco;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mane VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);
