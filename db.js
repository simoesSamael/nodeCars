
const mysql = require('mysql2/promise');

async function conectarBD() {

    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'modelos'
    })
    
    global.connection = connection;
    return global.connection;
}

async function listarCarros() {
    const conexao = await conectarBD();
    const [registros] = await conexao.query('select * from carros;');
    return registros; 
}

async function inserirCarro(carros) {
    const conexao = await conectarBD();
    const sql = "insert into carros (modelo, ano, marca) values (?,?, ?);";
    return await conexao.query(sql, [carros.modelo, carros.ano, carros.marca]);
}

async function apagaCarros(codigo) {
    const conexao = await conectarBD();
    const sql = " delete from carros where id =?;";
    return await conexao.query(sql, [codigo]);
}

module.exports = { listarCarros, inserirCarro, apagaCarros }
