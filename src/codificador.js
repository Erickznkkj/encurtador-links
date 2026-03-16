function gerarCodigo(length=5){
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < length; i++) {
        codigo += caracteres[Math.floor(Math.random() * caracteres.length)];
    }
    return codigo;
}

module.exports = gerarCodigo;