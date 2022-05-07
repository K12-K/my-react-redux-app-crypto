import { Layout, Select } from "antd"
import Footers from "./Footer"
import Sidebar from "./Sidebar"
import CryptoNewsList from './CryptoNewsList'
import { getCryptoNews } from "../getDataApi"
import { setCryptoNews } from "../actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
const { Content } = Layout
const { Option } = Select

const News = () => {
    const crypto = useSelector((state) => state.crypto)
    const dispatch = useDispatch()
    const currentPage = useRef(0)
    const fetchMoreNews = (ev) => {
        console.log('####',ev)
        currentPage.current += 1
        getCryptoNews(currentPage.current*10).then((response) => dispatch(setCryptoNews(response))).catch((error) => console.log(error))
    }
    useEffect(() => {
        if(crypto.cryptonews.length === 0)
            getCryptoNews().then((response) => dispatch(setCryptoNews(response))).catch((error) => console.log(error))
    }, [])
    const handleSelectChange = (value) => {
        console.log('asfd..value..', value)
    }
    return (
        <>
            <Layout>
                <Sidebar selectedMenu={'4'} />
                <Content>
                    <Layout className='main-layout'>
                        {/* ////////////////////// Select Bar to select CryptoCoin for Crypto News */}
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select a Crypto"
                            defaultValue={['Bitcoin']}
                            onChange={handleSelectChange}
                            optionLabelProp="label">
                            <Option value="Bitcoin" label="Bitcoin">
                                <div className="demo-option-label-item">
                                    {/* <span role="img" aria-label="China">
                                    🇨🇳
                                    </span> */}
                                    Bitcoin
                                </div>
                            </Option>
                            <Option value="Terra" label="Terra">
                                <div className="demo-option-label-item">
                                    Terra
                                </div>
                            </Option>
                        </Select>
                        {/* ///////////////////// */}
                        <Layout style={{marginTop:'10px'}}>
                            <InfiniteScroll
                                dataLength={crypto.cryptonews.length}
                                next={fetchMoreNews}
                                hasMore={true}
                                loader={console.log('loading more news...')}>
                                <CryptoNewsList data={crypto.cryptonews} />
                            </InfiniteScroll>
                        </Layout>
                    </Layout>
                    <Footers />
                </Content>
            </Layout>
        </>
    )
}

export default News