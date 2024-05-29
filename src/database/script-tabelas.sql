-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE PRAISE_DANCE;

USE PRAISE_DANCE;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR (45),
	cpf CHAR (11),
	email VARCHAR (45),
	senha VARCHAR (45)
);

select * from usuario;

CREATE TABLE Categoria (
	idCategoria INT PRIMARY KEY,
	categoria VARCHAR (45)
);

INSERT INTO Categoria VALUE 
(1, 'ballet'),
(2, 'Hip Hop'):

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

	/*Respostas do Usuario e Corretas*/
CREATE TABLE Resposta (
    idResposta INT PRIMARY KEY AUTO_INCREMENT,
    acertos INT,
    erros INT,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    UNIQUE (fkUsuario),
    fkCategoria INT,
    FOREIGN KEY (fkCategoria) REFERENCES Categoria(idCategoria)
);

select * from Resposta;





