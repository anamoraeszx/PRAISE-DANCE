// usuarioModel.js

var database = require("../database/config");

function atualizarPontuacaoUsuario(idUsuario, pontuacao) {
    var instrucaoSql = `UPDATE usuario SET pontuacao = ${pontuacao} WHERE id = ${idUsuario}`;
    return database.executar(instrucaoSql);
}

module.exports = {
    atualizarPontuacaoUsuario // Adicionado novo método
};
