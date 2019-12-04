
module.exports.auth = ({login, password, res}) => {

    res
        .set('token', 'token')
        .sendStatus(200);

}
