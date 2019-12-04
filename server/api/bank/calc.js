const moment = require('moment');
moment.locale('ru');

const dateFormat = 'DD.MM.YYYY';

const ann = (res, {amount, period, percent, date}) => {
    // num,date,payment,od,percent,saldo

    let data = [];
    let pm = percent / 12 / 100;

    for (let i = period; i > 0; i--) {

        let k = (pm * Math.pow(1 + pm, i)) / (Math.pow(1 + pm, i) - 1);

        let payment = amount * k;
        let percent = amount * pm;
        let od = payment - percent;
        let saldo = amount - od;

        date = moment(date, dateFormat).add(1, 'M').format(dateFormat + ' dddd')
        amount -= od;

        data.push(
            {
                num: i,
                date,
                payment: payment.toFixed(2),
                od: od.toFixed(2),
                percent: percent.toFixed(2),
                saldo: saldo.toFixed(2)
            }
        )
    }

    res.send(data);
}
const diff = (res, {amount, period, percent, date}) => {

    // num,date,payment,od,percent,saldo

    let data = [];
    let pm = percent / 12 / 100;

    for (let i = period; i > 0; i--) {

        date = moment(date, dateFormat).add(1, 'M').format(dateFormat+ ' dddd');
        let od = amount / i;
        let saldo = amount - od;
        let percent = saldo*pm;
        let payment = od + percent;

        amount -= od;

        data.push(
            {
                num: i,
                date,
                od: od.toFixed(2),
                percent: percent.toFixed(2),
                payment: payment.toFixed(2),
                saldo: payment.toFixed(2)
            }
        )
    }

    res.send(data)
}

module.exports.calc = ({amount, period, percent, type, date, res}) => {

    if (!amount || !Number(amount) || amount < 0) {
        res.sendStatus(500);
    } else if (!period || !Number(period) || period < 0) {
        res.sendStatus(500);
    } else if (!percent || !Number(percent) || percent < 0) {
        res.sendStatus(500);
    } else if (!type || !(type === 'a' || type === 'b')) {
        res.sendStatus(500);
    } else if (!date || !moment(date, dateFormat).isValid()) {
        res.sendStatus(500);
    } else {

        if (type === 'a') ann(res, {amount, period, percent, date});
        if (type === 'b') diff(res, {amount, period, percent, type, date});

    }

}
