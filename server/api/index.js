const init = (app) => {

    const config = [

        {url: '/auth/auth', method: 'post', type: 'public'},
        {url: '/bank/calc', method: 'post', type: 'public'},

    ]

    require('./executer')({config, app});

}

module.exports = ({init});