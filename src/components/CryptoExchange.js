import { Avatar, Col, Row } from "antd"
import { Typography } from "antd"
import { Collapse } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { setCoinsDescription } from "../actions"
import { getCoinData } from "../getDataApi"
const { Title } = Typography
const { Panel } = Collapse

const CryptoExchange = ({rank, name, iconUrl, hVolume, noofmarkets, symbol, uuid}) => {
    const coinsdescription = useSelector((state) => state.coinsdescription)
    const dispatch = useDispatch()
    function numFormatter(val) {
        if (val >= 10000000) {
          val = (val / 10000000).toFixed(2) + ' Cr';
        } else if (val >= 100000) {
          val = (val / 100000).toFixed(2) + ' Lac';
        } else if (val >= 1000) {
            val = (val / 1000).toFixed(2) + ' K'
        } else {
            val = (val / 1).toFixed(2)
        }
        return val;
    }
    function handleCallback(ev) {
        console.log('asdasaf', ev[0], uuid)
        if (ev[0] !== undefined) {
            console.log('qw', uuid, coinsdescription)
            // if (coinsdescription.data.length === 0 || coinsdescription.data.find((coin) => {console.log('123',coin,uuid);return coin.uuid === uuid}) === undefined) {
            //     getCoinData(uuid).then((response) => dispatch(setCoinsDescription({uuid: response.uuid, description: response.description}))).catch((error) => console.log(error))
            // }
            if (coinsdescription.data === undefined || !coinsdescription.data.hasOwnProperty(`${uuid}`)) {
                console.log('sfdfsds))))))))))')
                getCoinData(uuid).then((response) => dispatch(setCoinsDescription({uuid: response.uuid, description: response.description}))).catch((error) => console.log(error))
            }
        }
    }
    return (
        <Collapse onChange={handleCallback}>
            <Panel
                showArrow={false}
                header={
                    <Row style={{ width: '100%' }}>
                        <Col span={6}>
                            <h4>
                                {rank+'  '}
                                <Avatar src={iconUrl} />
                                {'  '+name}
                            </h4>
                        </Col>
                        <Col span={6}>{numFormatter(hVolume)}</Col>
                        <Col span={6}>{noofmarkets}</Col>
                        <Col span={6}>{symbol}</Col>
                    </Row>
                }
                key={''+rank}>
                    {console.log('++++++++',rank)}
                    <div dangerouslySetInnerHTML={{
                        __html: coinsdescription.data.hasOwnProperty(`${uuid}`) ? (console.log('fsdf'),coinsdescription.data[`${uuid}`].description) : ''
                    }} />
            </Panel>
        </Collapse>
    )
}

export default CryptoExchange