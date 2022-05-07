import { Empty, Space } from "antd"
import CryptoNews from "./CryptoNews"

const CryptoNewsList = ({data, maxnews = -1}) => {
    return (
        <Space size={[8, 12]} wrap>
            {
                data.length !== 0 ? (
                    maxnews !== -1 ? data.slice(0, maxnews).map((value, index) => {
                        const providerData = {}
                        if(!value.provider[0].hasOwnProperty('image'))
                            providerData.imageUrl = 'null'
                        else
                            providerData.imageUrl = value.provider[0].image.thumbnail.contentUrl
                        const newsData = {}
                        if(!value.hasOwnProperty('image'))
                            newsData.imageUrl = 'null'
                        else
                            newsData.imageUrl = value.image.thumbnail.contentUrl
                        return <CryptoNews key={index} name={value.name} imageUrl={newsData.imageUrl}
                            description={value.description} providerImageUrl={providerData.imageUrl}
                            providerName={value.provider[0].name} datePublished={value.datePublished} />
                    }) : data.map((value, index) => {
                        const providerData = {}
                        if(!value.provider[0].hasOwnProperty('image'))
                            providerData.imageUrl = 'null'
                        else
                            providerData.imageUrl = value.provider[0].image.thumbnail.contentUrl
                        const newsData = {}
                        if(!value.hasOwnProperty('image'))
                            newsData.imageUrl = 'null'
                        else
                            newsData.imageUrl = value.image.thumbnail.contentUrl
                        return <CryptoNews key={index} name={value.name} imageUrl={newsData.imageUrl}
                            description={value.description} providerImageUrl={providerData.imageUrl}
                            providerName={value.provider[0].name} datePublished={value.datePublished} />
                    })
                ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </Space>
    )
}

export default CryptoNewsList