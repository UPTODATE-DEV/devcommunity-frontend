import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export const useI18n = <T extends string>() => {
  const router = useRouter()
  const { pathname, asPath, query } = router
  const setState = (lang: T): void => {
    router.push({ pathname, query }, asPath, { locale: lang })
    Cookies.set('NEXT_LOCALE', lang, { expires: 365 })
  }
  return setState
}
