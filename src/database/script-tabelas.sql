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

CREATE TABLE Categoria (
	idCategoria INT PRIMARY KEY AUTO_INCREMENT,
	categoria VARCHAR (45),
	CONSTRAINT chk_categoria CHECK (categoria IN ('ballet', 'Hip Hop'))
);
/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

CREATE TABLE Pergunta (
idPergunta INT PRIMARY KEY AUTO_INCREMENT,
perguntas VARCHAR (100),
fkCategoria INT,
FOREIGN KEY (fkCategoria) REFERENCES Categoria(idCategoria)
);

	/*Respostas do Usuario e Corretas*/
CREATE TABLE Resposta (
    idResposta INT PRIMARY KEY AUTO_INCREMENT,
    respostaUsuario VARCHAR(45),
    pontuacao INT,
	fkUsuario int,
	FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);


