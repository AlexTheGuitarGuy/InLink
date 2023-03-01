export type MessageData = {
  message: string
  photo: string
  userId: number
  userName: string
}
export enum Status {
  READY = 'ready',
  PENDING = 'pending',
  ERROR = 'error',
}

const subscribers = {
  message: [] as MessageSubscriber[],
  status: [] as StatusSubscriber[],
}

export type MessageSubscriber = (message: MessageData[]) => void
export type StatusSubscriber = (status: Status) => void

type WSEventType = 'message' | 'status'

let ws = null as WebSocket | null

const closeHandler = () => {
  console.error('WS CLOSED')
  updateStatus(Status.PENDING)
  setTimeout(createChannel, 3000)
}

const openHandler = () => {
  console.log('WS OPENED')
  updateStatus(Status.READY)
}

const messageHandler = (event: MessageEvent) => {
  const receivedMessages = JSON.parse(event.data)

  subscribers.message.forEach((subscriber) => subscriber(receivedMessages))
}

const errorHandler = () => {
  console.error('An error has occurred during WebSocket connection. Try refreshing the page.')
  updateStatus(Status.ERROR)
}

const updateStatus = (status: Status) => {
  subscribers.status.forEach((subscriber) => {
    subscriber(status)
  })
}

const effectCleanup = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('error', errorHandler)
}

const createChannel = () => {
  effectCleanup()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  updateStatus(Status.PENDING)

  ws?.addEventListener('close', closeHandler)
  ws?.addEventListener('open', openHandler)
  ws?.addEventListener('message', messageHandler)
  ws?.addEventListener('error', errorHandler)
}

export const chatAPI = {
  subscribe: (type: WSEventType, subscriber: MessageSubscriber | StatusSubscriber) => {
    // @ts-ignore
    subscribers[type].push(subscriber)
  },
  unsubscribe: (type: WSEventType, unsubscribed: MessageSubscriber | StatusSubscriber) => {
    // @ts-ignore
    subscribers[type] = subscribers[type].filter((subscriber) => subscriber !== unsubscribed)
  },
  start: () => {
    createChannel()
  },
  stop: () => {
    effectCleanup()
    Object.keys(subscribers).forEach((key: string) => {
      subscribers[key as keyof typeof subscribers] = []
    })
    ws?.close()
  },
  sendMessage: (message: string) => {
    ws?.send(message)
  },
}
