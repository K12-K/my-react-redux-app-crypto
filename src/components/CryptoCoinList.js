import { Empty, Space } from "antd"
import CryptoCoin from "./CryptoCoin"

const CryptoCoinList = ({data, maxcoins = -1}) => {
    console.log('fsdfsfsdfsdf.././.',data)
    return (
        <Space size={[12, 16]} wrap>
            {
                data.length !== 0 ? (
                    maxcoins !== -1 ? data.slice(0, maxcoins).map((value, index) => {
                        return <CryptoCoin key={index} uuid={value.uuid} rank={value.rank} name={value.name} iconUrl={value.iconUrl}
                            price={value.price} marketCap={value.marketCap} dailyChange={value.change} />
                    }) : data.map((value, index) => {
                        return <CryptoCoin key={index} uuid={value.uuid} rank={value.rank} name={value.name} iconUrl={value.iconUrl}
                            price={value.price} marketCap={value.marketCap} dailyChange={value.change} />
                    })
                ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </Space>
    )
}

export default CryptoCoinList