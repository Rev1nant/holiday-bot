import { Bot, GrammyError, HttpError } from 'grammy'
import dotenv from 'dotenv'
import { hydrate } from '@grammyjs/hydrate'
import { parseWebsiteRU, parseWebsiteEN } from './parser.js'
import { languageKeyboard, menuKeyboardEN, menuKeyboardRU } from './inlineKeyboard.js'

dotenv.config()

const bot = new Bot(process.env.TOKEN)
 
bot.use(hydrate())

bot.api.setMyCommands([
    {
        command: 'start',
        description: 'Start Bot'
    },
])

bot.command('start', async(ctx) => {
    await ctx.reply('Select language', {
            reply_markup: languageKeyboard
    })
})

bot.callbackQuery('language', async(ctx) => {
    await ctx.answerCallbackQuery() 
    ctx.callbackQuery.message.editText('Select language', {
        reply_markup: languageKeyboard
    })
})

bot.callbackQuery('english', async(ctx) => {
    await ctx.answerCallbackQuery()
    parseWebsiteEN().then((text) => {
        ctx.callbackQuery.message.editText(text, {
            reply_markup: menuKeyboardEN
        })
    })
})

bot.callbackQuery('russian', async(ctx) => {
    await ctx.answerCallbackQuery()
    parseWebsiteRU().then((text) => {
        ctx.callbackQuery.message.editText(text, {
            reply_markup: menuKeyboardRU
        })
    })
})


bot.catch((err) => {
    const ctx = err.ctx
    const e = err.error

    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description)
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e)
    } else {
        console.error("Unknown error:", e)
    }
}) 

bot.start()