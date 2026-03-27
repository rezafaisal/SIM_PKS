import Dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/id'
Dayjs.extend(relativeTime)
Dayjs.extend(localizedFormat).locale('id')

export const dayjs = Dayjs
