import { Col, Layout, Row } from "antd"
import 'antd/dist/antd.css'
import GlobalStats from "./GlobalStats"
import { Typography } from "antd"
import Sidebar from "./Sidebar"
import CryptoCoinList from "./CryptoCoinList"
import CryptoNewsList from "./CryptoNewsList"
import Footers from "./Footer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCryptoCoins, getCryptoNews, getGlobalStats } from "../getDataApi"
import { setCryptoCoins, setCryptoNews, setGlobalStats } from "../actions"
import { useNavigate } from "react-router-dom"
const { Content } = Layout
const { Title } = Typography

const Home = () => {
    const crypto = useSelector((state) => state.crypto)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(crypto)
    useEffect(() => {
        getGlobalStats().then((response) => dispatch(setGlobalStats(response))).catch((error) => console.log(error))
        getCryptoCoins().then((response) => dispatch(setCryptoCoins(response))).catch((error) => console.log(error))
        getCryptoNews().then((response) => dispatch(setCryptoNews(response))).catch((error) => console.log(error))
    }, [])
    const handleCryptoShowMore = () => {
        navigate('/cryptocurrencies')
    }
    const handleNewsShowMore = () => {
        navigate('/news')
    }
    return (
        <>
            <Layout>
                <Sidebar selectedMenu={'1'} />
                <Content>
                    <Layout className='main-layout'>
                        <GlobalStats data={crypto.globalstats} />
                        <Layout style={{marginTop:'10px'}}>
                            <Row>
                                <Col span={20}>
                                    <Title level={3}>Top 10 Cryptos in the World</Title>
                                </Col>
                                <Col span={4}>
                                    <Title level={5} style={{textAlign:'center'}}><a onClick={handleCryptoShowMore}>Show more</a></Title>
                                </Col>
                            </Row>
                            <Layout style={{margin:'10px'}}>
                                <CryptoCoinList data={crypto.cryptocoins} maxcoins={10} />
                            </Layout>
                        </Layout>
                        <Layout style={{marginTop:'10px', marginBottom:'10px'}}>
                            <Row>
                                <Col span={20}>
                                    <Title level={3}>Latest Crypto News</Title>
                                </Col>
                                <Col span={4}>
                                    <Title level={5} style={{textAlign:'center'}}><a onClick={handleNewsShowMore}>Show more</a></Title>
                                </Col>
                            </Row>
                            <Layout style={{margin:'10px'}}>
                                <CryptoNewsList data={crypto.cryptonews} maxnews={10} />
                            </Layout>
                        </Layout>
                    </Layout>
                    <Footers />
                </Content>
          </Layout>
        </>
    )
}

export default Home