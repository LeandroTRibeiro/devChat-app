export type UserType = {
    userName: string,
    avatar: string,
    statusColor: string
};

export type ListUpdateType = {
    left: UserType,
    joined: UserType,
    list: UserType[]
};

export type MsgType = {
    status: boolean,
    user: UserType,
    msg: string
};

export type SendMsgType = {
    input: string,
    user: UserType
};

export type RingColorType = {
    color: string,
    user: UserType
}