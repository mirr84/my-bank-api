const makeGenerators = (n = 200, possible = '') => {
    let text = "";
    for (let i = 0; i < n; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const makeToken = (n = 200) =>
    makeGenerators(n, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-+=");

const makeNumber = (n = 7) =>
    makeGenerators(n, "0123456789");

module.exports = ({makeToken, makeNumber});