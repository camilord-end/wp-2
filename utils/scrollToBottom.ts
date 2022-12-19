import { MutableRefObject } from 'react'

export const scrollToBottom = (ref: MutableRefObject<null>) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  ref.current.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}
