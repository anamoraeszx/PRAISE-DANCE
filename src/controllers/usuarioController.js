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
	var categoriaId = req.body.categoriaId;

	usuarioModel.verificarPontuacaoUsuario(userId)
		.then(function (resultado) {
			if (resultado.length > 0) {
				// Usuário já tem uma pontuação, então atualize
				return usuarioModel.atualizarPontuacaoUsuario(userId, acertos, erros, categoriaId);
			} else {
				// Usuário não tem pontuação, então insira
				return usuarioModel.inserirPontuacaoUsuario(userId, acertos, erros, categoriaId);
			}
		})
		.then(function () {
			res.status(200).send("Pontuação armazenada ou atualizada com sucesso!");
		})
		.catch(function (erro) {
			console.error("Erro ao armazenar ou atualizar pontuação do usuário:", erro);
			res.status(500).send("Erro ao armazenar ou atualizar pontuação do usuário");
		});
}

function obterPontuacaoUsuario(req, res) {
    const idUsuario = req.params.idUsuario;

    usuarioModel.verificarPontuacaoUsuario(idUsuario)
        .then(function (resultado) {
            res.json(resultado); // Envie os dados de pontuação do usuário como resposta
        })
        .catch(function (erro) {
            console.error("Erro ao obter pontuação do usuário:", erro);
            res.status(500).send("Erro ao obter pontuação do usuário");
        });
}

function gerarGraficoPontuacao(req, res) {
    try {
        // Recupera os dados de pontuação dos usuários do banco de dados
        const pontuacoes = usuarioModel.obterPontuacoes();

        // Processa os dados para o formato esperado pelo Chart.js
        const labels = pontuacoes.map(pontuacao => pontuacao.nome); // Nomes dos usuários
        const acertos = pontuacoes.map(pontuacao => pontuacao.acertos); // Quantidade de acertos
        const erros = pontuacoes.map(pontuacao => pontuacao.erros); // Quantidade de erros

        // Renderiza o gráfico
        res.render('grafico', {
            labels: JSON.stringify(labels),
            acertos: JSON.stringify(acertos),
            erros: JSON.stringify(erros)
        });
    } catch (error) {
        console.error("Erro ao gerar gráfico de pontuação:", error);
        res.status(500).send("Erro ao gerar gráfico de pontuação");
    }
}


module.exports = {
	autenticar,
	cadastrar,
	armazenarPontuacao,
	obterPontuacaoUsuario,
	gerarGraficoPontuacao
};