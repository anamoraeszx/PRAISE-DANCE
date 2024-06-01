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

INSERT INTO Categoria VALUES
(1, 'ballet'),
(2, 'Hip Hop');

	/*Respostas do Usuario e Corretas*/
CREATE TABLE Resposta (
    idResposta INT PRIMARY KEY AUTO_INCREMENT,
    acertos INT,
    erros INT,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
	fkCategoria INT,
	FOREIGN KEY (fkCategoria) REFERENCES Categoria(idCategoria)
);

select * from Resposta;


SELECT MAX(acertos) AS max_acertos FROM Resposta;
select MIN(acertos) as min_acertos from Resposta;
SELECT AVG(acertos) AS media_acertos FROM Resposta;
SELECT ROUND(AVG(acertos), 2) AS media_acertos_arredondada FROM Resposta;

-- CONETANDO AS TABELAS

SELECT Resposta.idResposta, Resposta.acertos, Resposta.erros, Usuario.nome AS nome_usuario FROM Resposta
INNER JOIN Usuario ON Resposta.fkUsuario = Usuario.id;

SELECT Resposta.idResposta, Resposta.acertos, Resposta.erros, Categoria.categoria AS nome_categoria FROM Resposta
INNER JOIN Categoria ON Resposta.fkCategoria = Categoria.idCategoria;

SELECT Resposta.idResposta, Resposta.acertos, Resposta.erros, Usuario.nome AS nome_usuario, Categoria.categoria AS nome_categoria FROM Resposta
INNER JOIN Usuario ON Resposta.fkUsuario = Usuario.id
INNER JOIN Categoria ON Resposta.fkCategoria = Categoria.idCategoria;









