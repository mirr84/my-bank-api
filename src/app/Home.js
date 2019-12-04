import React, {useEffect, useState} from 'react';

import {connector} from "../store/utils/simpleConnector";
import {Col, Radio, InputNumber, Layout, Row, DatePicker, Divider, Button, notification, Table} from "antd";
import moment from "moment";
import axios from "axios/index";

const methods = {
    componentWillMount(props) {
        console.log('init Home', props);
    }
}

const columns = [
    {
        title: '#',
        dataIndex: 'num',
        width: 70,
    },
    {
        title: 'Дата птатежа',
        dataIndex: 'date',
    },
    {
        title: 'Платеж',
        dataIndex: 'payment',
    },
    {
        title: 'ОД',
        dataIndex: 'od',
    },
    {
        title: 'Проценты',
        dataIndex: 'percent',
    },
    {
        title: 'Остаток',
        dataIndex: 'saldo',
    },
];

const Home = ({history, match, dispatch}) => {

    const dateFormat = 'DD.MM.YYYY';

    const [amount, setAmount] = useState(1110000);
    const [period, setPeriod] = useState(240);
    const [percent, setPercent] = useState(13.75);
    const [type, setType] = useState('a');
    const [date, setDate] = useState('04.12.2019');
    const [loadingCalc, setIsLoadingCalc] = useState(false);
    const [dataCalc, setDataCalc] = useState([]);
    const [overpayment, setOverpayment] = useState(0);

    useEffect(() => {
        // что то поменяли в state
    });

    const sendReq = () => {
        const req = {amount, period, percent, type, date};

        setIsLoadingCalc(true);
        axios.post(`/api/bank/calc`, req)
            .then(
                ({data}) => {
                    notification.success({
                        message: 'Получили данные',
                    });
                    setOverpayment(data.map((a) => a.percent).reduce((a, b) => parseFloat(a) + parseFloat(b), 0).toFixed(2))
                    setDataCalc(data);
                }
            )
            .catch(
                (error) => {
                    notification.error({
                        message: 'Что то пошло не так',
                    });
                    setDataCalc([]);
                }
            )
            .finally(
                () => setIsLoadingCalc(false)
            )
    }

    return (
        <Layout style={{padding: 16}}>

            <Row gutter={16}>
                <Col span={2}>
                    <InputNumber placeholder="сумма"
                                 defaultValue={amount}
                                 onChange={setAmount}
                                 style={{width: '100%'}}
                    />
                </Col>
                <Col span={2}>
                    <InputNumber placeholder="кол мес"
                                 defaultValue={period}
                                 onChange={setPeriod}
                                 style={{width: '100%'}}
                    />
                </Col>
                <Col span={2}>
                    <InputNumber
                        placeholder="проценты"
                        defaultValue={percent}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        onChange={setPercent}
                        style={{width: '100%'}}
                    />
                </Col>
                <Col span={4}>
                    <Radio.Group defaultValue={type} buttonStyle="solid"
                                 onChange={({target: {value: type}}) => setType(type)}>
                        <Radio.Button value="a">аннуитетный</Radio.Button>
                        <Radio.Button value="b">дифференцированный </Radio.Button>
                    </Radio.Group>
                </Col>
                <Col span={2}>
                    <DatePicker defaultValue={date && moment(date, dateFormat)}
                                format={dateFormat}
                                onChange={(e) => setDate(e && e.format(dateFormat))}
                    />
                </Col>
                <Col span={2}>
                    <Button type="primary" loading={loadingCalc} onClick={sendReq}>
                        Расчет
                    </Button>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col>
                    <Divider/>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col>
                    Переплата: {overpayment}
                </Col>
            </Row>
            <Row gutter={16}>
                <Col>
                    <Divider/>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col>
                    график
                </Col>
            </Row>
            <Row gutter={16}>
                <Col>
                    <Divider/>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col>
                    <Table columns={columns}
                           dataSource={dataCalc}
                           size="small"
                           pagination={false}
                           loading={loadingCalc}
                           rowKey={record => record.num}
                    />
                </Col>
            </Row>
        </Layout>
    )

}

export default connector({methods, component: Home});
