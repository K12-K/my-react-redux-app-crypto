import { Col, Collapse, Layout, Row } from "antd"
import { useEffect, useRef } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from "react-redux"
import { setExchanges } from "../actions"
import { getExchanges } from "../getDataApi"
import CryptoExchangeList from "./CryptoExchangeList"
import Footers from "./Footer"
import Sidebar from "./Sidebar"
const { Content } = Layout

const Exchanges = () => {
    const crypto = useSelector((state) => state.crypto)
    const dispatch = useDispatch()
    const currentPage = useRef(0)
    const fetchMoreExchanges = (ev) => {
        console.log('####',ev)
        currentPage.current += 1
        getExchanges(currentPage.current*50).then((response) => dispatch(setExchanges(response))).catch((error) => console.log(error))
    }
    useEffect(() => {
        console.log('dasdadada!!!!')
        if(crypto.exchanges.length === 0)
            getExchanges().then((response) => dispatch(setExchanges(response))).catch((error) => console.log(error))
    }, [])
    // const callback = (ev) => {
    //     console.log('sjsf..collapse..', ev.key)
    // }
    return (
        <>
            <Layout>
                <Sidebar selectedMenu={'3'} />
                <Content>
                    <Layout className='main-layout'>
                        <Row>
                            <Col span={6}>Exchanges</Col>
                            <Col span={6}>24h Trade Volume</Col>
                            <Col span={6}>Markets</Col>
                            {/* <Col span={6}>Change</Col> */}
                            <Col span={6}>Symbol</Col>
                        </Row>

                        <InfiniteScroll
                            dataLength={crypto.exchanges.length}
                            next={fetchMoreExchanges}
                            hasMore={true}
                            loader={console.log('loading more exchanges...')}>
                            <CryptoExchangeList data={crypto.exchanges} />
                        </InfiniteScroll>

                        {/* <Collapse onChange={callback} defaultActiveKey={['2']}> */}
                            {/* <CryptoExchangeList data={crypto.exchanges} /> */}
                            {/* <Panel
                                showArrow={false}
                                header={
                                <Row style={{ backgroundColor: 'red', width: '100%' }}>
                                    <Col span={6}>
                                        <h5>
                                            <Avatar src={'https://th.bing.com/th/id/OIP.E9HNeBpYIP5SPFvXTQx8zQHaGC?pid=ImgDet&rs=1'} />
                                            News Source
                                        </h5>
                                    </Col>
                                    <Col span={6}>24h Trade Volume</Col>
                                    <Col span={6}>Markets</Col>
                                    <Col span={6}>Change</Col>
                                </Row>
                            }
                            key="1">
                                <p>dasfsdfsf</p>
                            </Panel> */}
                            {/* <Panel
                                showArrow={false}
                                header="This is panel header with no arrow icon"
                                key="2">
                                <p>fsdfsggsdf</p>
                            </Panel> */}
                        {/* </Collapse> */}
                    </Layout>
                    <Footers />
                </Content>
            </Layout>
        </>
    )
}

export default Exchanges