import { Empty, Space } from "antd"
import CryptoExchange from "./CryptoExchange"

const CryptoExchangeList = ({data}) => {
    console.log('exhangefsdfsfsdfsdf.././.',data)
    return (
        data.length !== 0 ? (
            data.map((value, index) => {
                return <CryptoExchange key={index} rank={value.rank} name={value.name} iconUrl={value.iconUrl}
                    hVolume={value['24hVolume']} noofmarkets={value.numberOfMarkets} symbol={value.symbol}
                    uuid={value.uuid} />
            })
        ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    )
}

export default CryptoExchangeList