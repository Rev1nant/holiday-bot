import axios from 'axios'
import cheerio from './node_modules/cheerio/dist/commonjs/index.js'

export async function parseWebsiteRU() {
    try {
        const response = await axios.get('https://kakoyprazdnik.com')
        const html = response.data

        const $ = cheerio.load(html)

        const elements = $('#bloktxt > h4')
        
        let date = new Date()
        
        let text = `Праздники на: ${date}\n`

        elements.each((index, element) => {
            text += `${$(element).text().trim()}\n`
        })

        return text
    } catch (error) {
        console.error(`Ошибка при парсинге сайта: ${error}`)
        return null
    }
}

export async function parseWebsiteEN() {
    try {
        const response = await axios.get('https://nationaltoday.com/today/')
        const html = response.data

        const $ = cheerio.load(html)

        const elements = $('.holiday-title')
        
        let date = new Date()
        
        let text = `Holiday on: ${date}\n`

        elements.each((index, element) => {
            text += `${$(element).text().trim()}\n`
        })

        return text
    } catch (error) {
        console.error(`Ошибка при парсинге сайта: ${error}`)
        return null
    }
}
