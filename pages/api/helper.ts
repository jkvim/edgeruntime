import { Token } from "@/types/types"

export const serializeToken = (token: Token): Token => {
  return {
    key: token.key,
    date: token.date ? Number(token.date) : Date.now(),
    count: token.count ? Number(token.count) : 0,
    ip: token.ip,
  }
}