import axios from 'axios'
import cheerio from '../node_modules/cheerio/dist/commonjs/index.js'

export let holidayRU = ''
export let holidayEN = ''

async function updateHoliday() {
    parseWebsiteRU().then((holiday) => {
        holidayRU = holiday
    })
    parseWebsiteEN().then((holiday) => {
        holidayEN = holiday
    })
    setTimeout(updateHoliday, 1000 * 60 * 60 * 6)
}

export async function parseWebsiteRU() {
    try {
        const response = await axios.get('https://kakoyprazdnik.com')
        const html = response.data

        const $ = cheerio.load(html)

        const elements = $('#bloktxt > h4')
        
        let date = new Date()
        
        let holiday = `Праздники на: ${date}\n`

        elements.each((index, element) => {
            holiday += `${$(element).text().trim()}\n`
        })

        return holiday
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
        
        let holiday = `Holiday on: ${date}\n`

        elements.each((index, element) => {
            holiday += `${$(element).text().trim()}\n`
        })

        return holiday
    } catch (error) {
        console.error(`Ошибка при парсинге сайта: ${error}`)
        return null
    }
}

updateHoliday()