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

CREATE TABLE Pergunta (
	/*Perguntas do QUIZ*/
	idPergunta INT PRIMARY KEY AUTO_INCREMENT,
	perguntas VARCHAR (100),
	fkCategoria INT,
FOREIGN KEY (fkCategoria) REFERENCES Categoria(idCategoria)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

CREATE TABLE Resposta(
	/*Respostas do Usuario e Corretas*/
	idResposta INT,
	respostasUsuario VARCHAR (45),
	respostaCorreta VARCHAR (45),
	pontuação INT,
	fkUsuario INT,
	fkPergunta INT,
	primary key (idResposta, fkUsuario, fkPergunta),
	FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
	FOREIGN KEY (fkPergunta) REFERENCES Pergunta(idPergunta)
);

