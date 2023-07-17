export const FRIENDS = "friends"
export const NOT_FRIENDS = "not-friends"
export const YOU_SEND = "you-send"
export const OTHER_SEND = "other-send"

export const USER_STATUS_TRANSFORM = {
    [FRIENDS] : "",
    [NOT_FRIENDS] : YOU_SEND,
    [YOU_SEND] : NOT_FRIENDS,
    [OTHER_SEND] : FRIENDS
}