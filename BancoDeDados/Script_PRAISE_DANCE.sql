CREATE DATABASE PRAISE_DANCE;
USE PRAISE_DANCE;

CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
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
idPergunta INT PRIMARY KEY AUTO_INCREMENT,
perguntas VARCHAR (100),
fkCategoria INT,
FOREIGN KEY (fkCategoria) REFERENCES Categoria(idCategoria)
);

CREATE TABLE Resposta(
idResposta INT,
respostasUsuario VARCHAR (45),
respostaCorreta VARCHAR (45),
pontuação INT,
fkUsuario INT,
fkPergunta INT,
primary key (idResposta, fkUsuario, fkPergunta),
FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
FOREIGN KEY (fkPergunta) REFERENCES Pergunta(idPergunta)
);