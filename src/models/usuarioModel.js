var database = require("../database/config");

function autenticar(email, senha) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
		email,
		senha
	);
	var instrucaoSql = `
        SELECT id, nome, cpf, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, cpf, email, senha) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nome,
		cpf,
		email,
		senha
	);

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.
	var instrucaoSql = `
        INSERT INTO usuario (nome, cpf, email, senha) VALUES ('${nome}', '${cpf}', '${email}', '${senha}');
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function verificarPontuacaoUsuario(idUsuario) {
    var instrucaoSql = `SELECT * FROM Resposta WHERE fkUsuario = ${idUsuario};`;
    return database.executar(instrucaoSql);
}
	
function inserirPontuacaoUsuario(idUsuario, acertos, erros, fkCategoria) {
    var instrucaoSql = `INSERT INTO Resposta (acertos, erros, fkUsuario, fkCategoria) VALUES (${acertos}, ${erros} ,${idUsuario}, ${fkCategoria}  );`;
    return database.executar(instrucaoSql);
}

function atualizarPontuacaoUsuario(idUsuario, acertos, erros, fkCategoria) {
    var instrucaoSql = `UPDATE Resposta SET acertos = ${acertos}, erros = ${erros} WHERE fkUsuario = ${idUsuario} AND fkCategoria = ${fkCategoria};`;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    verificarPontuacaoUsuario,
    inserirPontuacaoUsuario,
    atualizarPontuacaoUsuario
};
