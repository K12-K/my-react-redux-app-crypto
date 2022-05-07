import { Avatar, Card } from "antd"
import { Typography } from "antd"
import { useNavigate } from "react-router-dom"
const { Title } = Typography

const CryptoCoin = ({uuid, rank, name, iconUrl, price, marketCap, dailyChange}) => {
    const navigate = useNavigate()
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
    const handleCoinClick = () => {
        navigate(`/crypto/${uuid}`)
    }
    return (
        <Card onClick={handleCoinClick} title={rank + '. ' + name} extra={<Avatar src={iconUrl} />} style={{width:'230px'}} size='small' hoverable>
            <Title level={5}>Price: {numFormatter(price)}</Title>
            <Title level={5}>Market Cap: {numFormatter(marketCap)}</Title>
            <Title level={5}>Daily Change: {numFormatter(dailyChange)}</Title>
        </Card>
    )
}

export default CryptoCoin