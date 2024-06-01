var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
	var email = req.body.emailServer;
	var senha = req.body.senhaServer;

	if (email == undefined) {
		res.status(400).send("Seu email está undefined!");
	} else if (senha == undefined) {
		res.status(400).send("Sua senha está indefinida!");
	} else {
		usuarioModel
			.autenticar(email, senha)
			.then(function (resultadoAutenticar) {
				console.log(
					`\nResultados encontrados: ${resultadoAutenticar.length}`
				);
				console.log(
					`Resultados: ${JSON.stringify(resultadoAutenticar)}`
				); // transforma JSON em String

				if (resultadoAutenticar.length == 1) {
					console.log(resultadoAutenticar);

					res.json({
						id: resultadoAutenticar[0].id,
						nome: resultadoAutenticar[0].nome,
						email: resultadoAutenticar[0].email,
					});
				} else if (resultadoAutenticar.length == 0) {
					res.status(403).send("Email e/ou senha inválido(s)");
				} else {
					res.status(403).send(
						"Mais de um usuário com o mesmo login e senha!"
					);
				}
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o login! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function cadastrar(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html
	var nome = req.body.nomeServer;
	var cpf = req.body.cpfServer;
	var email = req.body.emailServer;
	var senha = req.body.senhaServer;

	// Faça as validações dos valores
	if (nome == undefined) {
		res.status(400).send("Seu nome está undefined!");
	} else if (cpf == undefined) {
		res.status(400).send("Seu cpf está undefined!");
	} else if (email == undefined) {
		res.status(400).send("Seu email está undefined!");
	} else if (senha == undefined) {
		res.status(400).send("Sua senha está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.cadastrar(nome, cpf, email, senha)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}


function armazenarPontuacao(req, res) {
	var userId = req.body.userId;
	var acertos = req.body.acertos;
	var erros = req.body.erros;
	var categoriaID = req.body.categoriaId;

	// Validações básicas
	if (!userId || !acertos || !erros || !categoriaID) {
		return res
			.status(400)
			.send("Dados insuficientes para armazenar pontuação!");
	}

	usuarioModel
		.verificarPontuacaoUsuario(userId, categoriaID)
		.then(function (resultado) {
			if (resultado.length > 0) {
				// Usuário já tem uma pontuação nesta categoria, então atualize
				return usuarioModel.atualizarPontuacaoUsuario(
					userId,
					acertos,
					erros,
					categoriaID
				);
			} else {
				// Usuário não tem pontuação nesta categoria, então insira
				return usuarioModel.inserirPontuacaoUsuario(
					userId,
					acertos,
					erros,
					categoriaID
				);
			}
		})
		.then(function () {
			res.status(200).send(
				"Pontuação armazenada ou atualizada com sucesso!"
			);
		})
		.catch(function (erro) {
			console.error(
				"Erro ao armazenar ou atualizar pontuação do usuário:",
				erro
			);
			res.status(500).send(
				"Erro ao armazenar ou atualizar pontuação do usuário"
			);
		});
}

function obterPontuacoes(req, res) {
    const userId = req.params.userId;
    const quizType = req.params.quizType;

    if (!userId) {
        return res.status(400).send("O ID do usuário está indefinido!");
    }
    if (!quizType) {
        return res.status(400).send("O tipo de quiz está indefinido!");
    }

    usuarioModel.obterPontuacoes(userId, quizType)
        .then(resultado => {
            console.log("Resultado da consulta:", resultado); // Log para depuração
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(404).send("Nenhum dado encontrado para o usuário e quiz especificados.");
            }
        })
        .catch(erro => {
            console.error("Erro ao obter pontuações:", erro);
            res.status(500).send("Erro ao obter pontuações");
        });
}

module.exports = {
	autenticar,
	cadastrar,
	armazenarPontuacao,
	obterPontuacoes
};