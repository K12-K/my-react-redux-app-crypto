import { Layout, Input } from "antd"
import { useEffect, useRef } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from "react-redux"
import { setCryptoCoins } from "../actions"
import { getCryptoCoins } from "../getDataApi"
import CryptoCoinList from "./CryptoCoinList"
import Footers from "./Footer"
import Sidebar from "./Sidebar"
const { Content } = Layout

const Cryptocurrencies = () => {
    const crypto = useSelector((state) => state.crypto)
    const dispatch = useDispatch()
    const currentPage = useRef(0)
    const fetchMoreCoins = (ev) => {
        console.log('####',ev)
        currentPage.current += 1
        getCryptoCoins(currentPage.current*10).then((response) => dispatch(setCryptoCoins(response))).catch((error) => console.log(error))
    }
    useEffect(() => {
        if(crypto.cryptocoins.length === 0)
            getCryptoCoins().then((response) => dispatch(setCryptoCoins(response))).catch((error) => console.log(error))
    }, [])
    return (
        <>
            <Layout>
                <Sidebar selectedMenu={'2'} />
                <Content>
                    <Layout className='main-layout'>
                        {/* ////////////////////// Search Bar for CryptoCoins */}
                        <Input placeholder={'Search Cryptocurrency'} />
                        {/* ///////////////////// */}
                        <Layout style={{marginTop:'10px', marginBottom:'10px'}}>
                            <InfiniteScroll
                                dataLength={crypto.cryptocoins.length}
                                next={fetchMoreCoins}
                                hasMore={true}
                                loader={console.log('loading more coins...')}>
                                <CryptoCoinList data={crypto.cryptocoins} />
                            </InfiniteScroll>
                        </Layout>
                    </Layout>
                    <Footers />
                </Content>
            </Layout>
        </>
    )
}

export default Cryptocurrencies