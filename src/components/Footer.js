import 'antd/dist/antd.css'
import { Layout } from "antd"
const { Footer } = Layout

const Footers = () => {
    return (
        <Footer style={{textAlign: 'center', backgroundColor:'#001529'}}>
            <h5 style={{color: 'white'}}>Copyright 2021</h5>
            <h6 style={{color: 'white'}}>All Rights Reserved</h6>
        </Footer>
    )
}

export default Footers