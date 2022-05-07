import { Col, Layout, Row, Statistic } from "antd"
import { Typography } from "antd"
const { Header, Content } = Layout
const { Title } = Typography

const GlobalStats = ({data}) => {
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
    return (
        <Layout>
            <Title level={3}>Global Crypto Stats</Title>
            <Content style={{padding:10}}>
                <Row gutter={[48, 16]}>
                    <Col span={12}>
                        <Statistic title="Total Cryptocurrencies" value={numFormatter(data.totalCoins)} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Exchanges" value={numFormatter(data.totalExchanges)} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Market Cap" value={numFormatter(data.totalMarkets)} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total 24h Volume" value={numFormatter(data.total24hVolume)} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Markets" value={numFormatter(data.totalMarketCap)} />
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default GlobalStats