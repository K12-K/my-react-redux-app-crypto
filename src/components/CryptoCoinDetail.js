import { Avatar, Col, Divider, Layout, List, Row, Select } from "antd"
import { Content } from "antd/lib/layout/layout"
import Title from "antd/lib/typography/Title"
import { useParams } from "react-router-dom"
import Footers from "./Footer"
import Sidebar from "./Sidebar"
import '../CryptoCoinDetail.css'
import { useEffect } from "react"
import { getCoinData, getCoinPriceHistory } from "../getDataApi"
import { useDispatch, useSelector } from "react-redux"
import { removeCoinDetail, setCoinDetail, setCoinPriceHistory } from "../actions"
import { Line } from "react-chartjs-2"
import moment from "moment"
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title as ChartTitle, Tooltip } from "chart.js"
import { CheckOutlined, CloseOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, HolderOutlined, MoneyCollectOutlined, NumberOutlined, PayCircleOutlined, ThunderboltOutlined, TrophyOutlined } from "@ant-design/icons"
const { Option } = Select

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
);
  
const CryptoCoinDetail = () => {
    const { uuid } = useParams()
    const coin = useSelector((state) => state.coindetail)
    const coinDetail = coin.data
    const coinPriceHistory = coin.priceHistory
    const dispatch = useDispatch()
    const fetchCoinDetail = async () => {
        const response = await getCoinData(uuid).catch((error) => console.log(error))
        console.log('.asd..asd.', response)
        dispatch(setCoinDetail(response))
        fetchCoinPriceHistory(uuid)
    }
    const fetchCoinPriceHistory = async (uuid, timePeriod = '3h') => {
        const response = await getCoinPriceHistory(uuid, timePeriod).catch((error) => {console.log(error);return})
        dispatch(setCoinPriceHistory(response))
    }
    useEffect(() => {
        console.log('sdfn',uuid)
        if (uuid && uuid !== '') fetchCoinDetail()
        return () => {
            dispatch(removeCoinDetail())
        }
    }, [])
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
    function dateFormatter(val) {
        return moment(new Date(val*1000)).format('D/M/YYYY')
    }
    const handleTimePeriodChange = (ev) => {
        console.log(ev)
        fetchCoinPriceHistory(uuid, ev)
    }
    // const coinStatistics = ((coinDetail !== undefined && (Object.keys(coinDetail).length == 0)) ? [] : [
    //     {
    //         'icon': <DollarCircleOutlined />,

    //     }
    // ])
    /// Chart Related
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'// as const
            },
            // title: {
            //     display: true,
            //     text: 'Chart.js Line Chart'
            // }
        }
    }
    console.log(')_)_))))_)_)_)_-0',coinPriceHistory)
    const chartData = {
        labels: coinPriceHistory.history !== undefined ? coinPriceHistory.history.map((value) => dateFormatter(value.timestamp)).reverse() : [],
        datasets: [
            {
                label: 'Price in INR',
                data: coinPriceHistory.history !== undefined ? coinPriceHistory.history.map((value) => value.price).reverse() : [],
                borderColor: 'rgb(0, 113, 190)',
                backgroundColor: 'rgba(0, 113, 190, 0.5)'
            }
        ]
    }

    console.log('...', coinDetail)
    return (
        <>
            <Layout>
                <Sidebar selectedMenu={'2'} />
                <Content>
                    <Layout className='main-layout'>
                        {
                            coinDetail !== undefined && (Object.keys(coinDetail).length == 0 ? <>
                                <h1>Loading Coin Detail.....</h1>
                            </> : <>
                                <Title style={{color:'#0071BE', textAlign:'center'}} level={2}>{coinDetail.name + " (" + coinDetail.symbol + ") Price"}</Title>
                                <h4 style={{color:'gray', textAlign:'center'}}>{coinDetail.name + " live price in Indian Rupees (INR). View value statistics, market cap and supply."}</h4>
                                <Divider type="horizontal"></Divider>
                                <Layout style={{marginTop:'10px', marginBottom:'10px'}}>
                                    <Select defaultValue={"3h"} style={{width: 120}} onChange={handleTimePeriodChange}>
                                        <Option value="3h">3h</Option>
                                        <Option value="24h">24h</Option>
                                        <Option value="7d">7d</Option>
                                        <Option value="30d">30d</Option>
                                        <Option value="3m">3m</Option>
                                        <Option value="1y">1y</Option>
                                        <Option value="3y">3y</Option>
                                        <Option value="5y">5y</Option>
                                    </Select>
                                    <Row>
                                        <Col span={15}>
                                            <Title style={{color:'#0071BE'}} level={4}>{coinDetail.name + " Price Chart"}</Title>
                                        </Col>
                                        <Col span={3}>
                                            <h4 style={{textAlign:'end'}} level={4}>{"Change: " + coinPriceHistory.change}</h4>
                                        </Col>
                                        <Col span={6}>
                                            <h4 style={{textAlign:'center'}} level={5}>{"Current " + coinDetail.name + " Price: Rs " + numFormatter(coinDetail.price)}</h4>
                                        </Col>
                                    </Row>
                                    <Line options={chartOptions} data={chartData} />
                                    <Row style={{marginTop:'20px'}}>
                                        <Col span={12} style={{paddingRight:'10px'}}>
                                            <Title style={{color:'#0071BE'}} level={4}>{coinDetail.name + " Value Statistics"}</Title>
                                            <h4 style={{color:'gray'}}>{"An overview showing the statistics of " + coinDetail.name + ", such as the base and quote currency, the rank, and trading volume."}</h4>
                                            <List size="small">
                                                <List.Item extra={<h3>Rs {numFormatter(coinDetail.price)}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<DollarCircleOutlined />} />Price to INR</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>{coinDetail.rank}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<NumberOutlined />} />Rank</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>Rs {numFormatter(coinDetail['24hVolume'])}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<ThunderboltOutlined />} />24h Volume</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>Rs {numFormatter(coinDetail.marketCap)}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<DollarCircleOutlined />} />Market Cap</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>Rs {numFormatter(coinDetail.allTimeHigh.price)}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<TrophyOutlined />} />All-time-high(daily avg.)</h4>} />
                                                </List.Item>
                                            </List>
                                        </Col>
                                        <Col span={12}>
                                            <Title style={{color:'#0071BE'}} level={4}>Other Stats Info</Title>
                                            <h4 style={{color:'gray'}}>{"An overview showing the statistics of " + coinDetail.name + ", such as the number of markets and exchanges, total supply, and the circulating supply."}</h4>
                                            <List size="small">
                                                <List.Item extra={<h3>{numFormatter(coinDetail.numberOfMarkets)}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<FundOutlined />} />Number Of Markets</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>{coinDetail.numberOfExchanges}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<MoneyCollectOutlined />} />Number Of Exchanges</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>{coinDetail.supply.confirmed ? <Avatar style={{color:'black'}} src={<CheckOutlined />} /> : <Avatar style={{color:'black'}} src={<CloseOutlined />} />}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<ExclamationCircleOutlined />} />Approved Supply</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>{numFormatter(coinDetail.supply.total)}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<ExclamationCircleOutlined />} />Total Supply</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>{numFormatter(coinDetail.supply.circulating)}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<ExclamationCircleOutlined />} />Circulating Supply</h4>} />
                                                </List.Item>
                                            </List>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:'20px'}}>
                                        <Col span={12} style={{paddingRight:'10px'}}>
                                            <Title style={{color:'#0071BE'}} level={4}>{"What is " + coinDetail.name + "?"}</Title>
                                            <h4 style={{color:'gray'}}>
                                            <div dangerouslySetInnerHTML={{
                                                __html: coinDetail.description
                                            }} />
                                            </h4>
                                        </Col>
                                        <Col span={12}>
                                            <Title style={{color:'#0071BE'}} level={4}>{coinDetail.name + " Links"}</Title>
                                            <List size="small">
                                                {
                                                    coinDetail.links.map((value, index) => {
                                                        return <List.Item key={index} extra={<a target={"_blank"} href={value.url}><h3 style={{color:'#0071BE'}}>{value.name}</h3></a>}>
                                                            <List.Item.Meta
                                                            description={<h4 style={{display:'flex', alignItems:'center', textTransform:'capitalize', color:'gray'}}>{value.type}</h4>} />
                                                        </List.Item>
                                                    })

                                                }
                                                {/* <List.Item extra={<a type="_blank" href={coinDetail.links}><h3>{coinDetail.links}</h3></a>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<FundOutlined />} />Number Of Markets</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>{coinDetail.numberOfExchanges}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<MoneyCollectOutlined />} />Number Of Exchanges</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>{coinDetail.supply.confirmed ? <Avatar style={{color:'black'}} src={<CheckOutlined />} /> : <Avatar style={{color:'black'}} src={<CloseOutlined />} />}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<ExclamationCircleOutlined />} />Approved Supply</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>{numFormatter(coinDetail.supply.total)}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<ExclamationCircleOutlined />} />Total Supply</h4>} />
                                                </List.Item>
                                                <List.Item extra={<h3>{numFormatter(coinDetail.supply.circulating)}</h3>}>
                                                    <List.Item.Meta
                                                    description={<h4 style={{display:'flex', alignItems:'center', color:'gray'}}><Avatar style={{color:'gray'}} src={<ExclamationCircleOutlined />} />Circulating Supply</h4>} />
                                                </List.Item> */}
                                            </List>
                                        </Col>
                                    </Row>
                                </Layout>
                            </>
                        )}
                    </Layout>
                    <Footers />
                </Content>
            </Layout>
        </>

    )
}

export default CryptoCoinDetail