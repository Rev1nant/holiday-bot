import { InlineKeyboard } from "grammy"

export const languageKeyboard = new InlineKeyboard()
    .text('English', 'english').row()
    .text('Русский', 'russian')

export const menuKeyboardEN = new InlineKeyboard()
    .text('Update', 'english')
    .text('Select language', 'language')

export const menuKeyboardRU = new InlineKeyboard()
    .text('Обновить', 'russian')
    .text('Выбрать язык', 'language')
