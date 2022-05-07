import axios from "axios"

export const getGlobalStats = async () => {
    // const options = {
    //     method: 'GET',
    //     url: 'https://coinranking1.p.rapidapi.com/stats',
    //     params: {referenceCurrencyUuid: '6mUvpzCc2lFo'},
    //     headers: {
    //      'x-access-token': 'c17e4e4014msh2a9f3b187045b2ap1aac89jsn09d2063e94c6'
    //     }
    // }
    const response = await axios.get('https://coinranking1.p.rapidapi.com/stats', {
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': 'c17e4e4014msh2a9f3b187045b2ap1aac89jsn09d2063e94c6'
        },
        params: {
            'referenceCurrencyUuid': '6mUvpzCc2lFo'
        }
    }).catch((error) => {
        console.log('Error...', error)
        throw new Error('Error getting crypto stats')
    })
    console.log(response)
    if (response.status === 200) {
        response.data.data.btcDominance = null
        response.data.data.bestCoins = null
        response.data.data.newestCoins = null
        console.log(response.data)
        return response.data.data
    } else
        throw new Error('Error during fetch of crypto stats')
}

export const getCryptoCoins = async (offset = 0, limit = 10) => {
    const response = await axios.get('https://coinranking1.p.rapidapi.com/coins', {
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': 'c17e4e4014msh2a9f3b187045b2ap1aac89jsn09d2063e94c6'
        },
        params: {
            'referenceCurrencyUuid': '6mUvpzCc2lFo',
            'timePeriod': '24h',
            'tiers': '1',
            'orderBy': 'marketCap',
            'orderDirection': 'desc',
            'limit': limit,
            'offset': offset
        }
    }).catch((error) => {
        console.log('Error...', error)
        throw new Error('Error getting crypto coins')
    })
    console.log(response)
    if (response.status === 200) {
        console.log(response.data)
        return response.data.data.coins
    } else
        throw new Error('Error during fetch of crypto coins')
}

export const getCryptoNews = async (q = 'crypto', offset = 0, limit = 10) => {
    const response = await axios.get('https://bing-news-search1.p.rapidapi.com/news/search', {
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
            'X-RapidAPI-Key': 'c17e4e4014msh2a9f3b187045b2ap1aac89jsn09d2063e94c6'
        },
        params: {
            'q': q,
            'freshness': 'Month',
            'textFormat': 'Raw',
            'safeSearch': 'Off',
            'count': limit,
            'offset': offset
        }
    }).catch((error) => {
        console.log('Error...', error)
        throw new Error('Error getting crypto news')
    })
    console.log('~~~~~~~~~~~~~~~~~~', response.data.value)
    if (response.status === 200) {
        console.log(response.data)
        return response.data.value
    } else
        throw new Error('Error during fetch of crypto news')
}

export const getExchanges = async (offset = 0, limit = 50) => {
    const response = await axios.get('https://coinranking1.p.rapidapi.com/exchange/-zdvbieRdZ/coins', {
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': 'c17e4e4014msh2a9f3b187045b2ap1aac89jsn09d2063e94c6'
        },
        params: {
            'referenceCurrencyUuid': '6mUvpzCc2lFo',
            'orderBy': '24hVolume',
            'orderDirection': 'desc',
            'limit': limit,
            'offset': offset
        }
    }).catch((error) => {
        console.log('Error...', error)
        throw new Error('Error getting exchanges')
    })
    console.log('~~~~~~~~~~~~~~~~~~', response.data)
    if (response.status === 200) {
        console.log(response.data.data)
        return response.data.data.coins
    } else
        throw new Error('Error during fetch of exchanges')
}

export const getCoinData = async (uuid) => {
    const response = await axios.get('https://coinranking1.p.rapidapi.com/coin/'+uuid, {
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': 'c17e4e4014msh2a9f3b187045b2ap1aac89jsn09d2063e94c6'
        },
        params: {
            'referenceCurrencyUuid': '6mUvpzCc2lFo',
            'timePeriod': '24h'
        }
    }).catch((error) => {
        console.log('Error...', error)
        throw new Error('Error getting coin')
    })
    console.log('~~~~~~~~~~~~~~~~~~', response.data)
    if (response.status === 200) {
        console.log(response.data.data)
        return response.data.data.coin
    } else
        throw new Error('Error during fetch of coin')
}

export const getCoinPriceHistory = async (uuid, timePeriod = '3h') => {
    const response = await axios.get('https://coinranking1.p.rapidapi.com/coin/'+uuid+'/history', {
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': 'c17e4e4014msh2a9f3b187045b2ap1aac89jsn09d2063e94c6'
        },
        params: {
            'referenceCurrencyUuid': '6mUvpzCc2lFo',
            'timePeriod': timePeriod
        }
    }).catch((error) => {
        console.log('Error...', error)
        throw new Error('Error getting coin price history')
    })
    console.log('~~~~~~~~~~~~~~~~~~', response.data)
    if (response.status === 200) {
        console.log(response.data.data)
        return response.data.data
    } else
        throw new Error('Error during fetch of coin price history')
}