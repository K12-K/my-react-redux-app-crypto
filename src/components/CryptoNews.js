import { Avatar, Card, Col, Row, Tooltip } from "antd"
import moment from "moment"
import { useRef } from "react"
import LinesEllipsis from "react-lines-ellipsis"
const { Meta } = Card

const CryptoNews = ({name, imageUrl, description, providerImageUrl, providerName, datePublished}) => {
    const lineEllipsisNameRef = useRef(false)
    function dateTimeFormatter(date) {
        return moment(new Date(date)).fromNow()
    }
    return (
        <Card /*extra={<img src={imageUrl !== 'null' && imageUrl} width={'80px'} height={'80px'} />}*/
             style={{width:'350px'}} size='small' hoverable>
             {/* title={name} description={description}> */}
            {/* <Meta
                avatar={<img src={imageUrl !== 'null' && imageUrl} width={'80px'} height={'80px'} />}
                title={name}
                description={description} /> */}
            <Row>
                <Col span={18} style={{marginTop:'5px'}}>
                    <h3>
                        <Tooltip title={lineEllipsisNameRef.current && name}>
                            <LinesEllipsis onReflow={(ev)=>{if(ev.clamped)lineEllipsisNameRef.current = true}} text={name} maxLine='3' ellipsis="..." trimRight basedOn="letters" />
                        </Tooltip>
                        {/* {name} */}
                    </h3>
                </Col>
                <Col span={6} style={{marginTop: '5px', display: (imageUrl !== 'null' ? 'block' : 'none')}}>
                    <img src={imageUrl !== 'null' ? imageUrl : ''} width={'80px'} height={'80px'} />
                </Col>
            </Row>
            <Row style={{marginTop:'10px'}}>
                <Col span={24}>
                    <LinesEllipsis text={description} maxLine='3' ellipsis="..." trimRight basedOn="letters" />
                </Col>
            </Row>
            <Row>
                <Col span={18} style={{marginTop:'5px'}}>
                    <h5>
                        <Avatar src={providerImageUrl === 'null' ? 'https://www.glow-skincare.com/wp-content/uploads/2016/09/e-symbol.jpg' : providerImageUrl} style={{marginRight:'5px'}} />
                        {providerName}
                    </h5>
                </Col>
                <Col span={6} style={{marginTop: '7px'}}>
                    <h5>{dateTimeFormatter(datePublished)}</h5>
                </Col>
            </Row>
        </Card>
    )
}

export default CryptoNews