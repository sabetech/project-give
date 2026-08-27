export type TRole = {
    id: string
    name: string
    created: string
    updated: string
}

export type TPermission = {
    id: string
    name: string
    created: string
    updated: string
}

export type TMember = {
    id: string
    email: string
    name: string
    avatar?: string
    role?: TRole
    created: string
    updated: string
    verified: boolean
    collectionId: string
    collectionName: string
}

export type TUser = TMember
