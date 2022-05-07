import { BulbOutlined, HomeOutlined, LineChartOutlined, TransactionOutlined } from "@ant-design/icons"
import { Layout, Menu } from "antd"
import { useNavigate } from "react-router-dom"
const { Sider } = Layout

const Sidebar = ({selectedMenu}) => {
    const navigate = useNavigate()
    const onSelectMenu = (ev) => {
        console.log(ev.key)
        switch (ev.key) {
            case '1':
                navigate('/')
                break
            case '2':
                navigate('/cryptocurrencies')
                break
            case '3':
                navigate('/exchanges')
                break
            case '4':
                navigate('/news')
                break
            default:
                navigate('/')
        }
    }
    return (
        <Sider className='sider' collapsed>
            <div className='logo-title'>
                <p>
                    <img src='https://www.freepnglogos.com/uploads/logo-design/sold-cupcake-kingdom-logo-design-logo-cowboy-18.png' />
                    Cryptoverse
                </p>
            </div>
            <Menu theme='dark' onSelect={onSelectMenu} defaultSelectedKeys={[selectedMenu]}>
                <Menu.Item key={1} icon={<HomeOutlined />}>Home</Menu.Item>
                <Menu.Item key={2} icon={<LineChartOutlined />}>Cryptocurrencies</Menu.Item>
                <Menu.Item key={3} icon={<TransactionOutlined />}>Exchanges</Menu.Item>
                <Menu.Item key={4} icon={<BulbOutlined />}>News</Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Sidebar