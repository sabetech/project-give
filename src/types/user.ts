export type TUser = {
    name: string
    email: string
    img_url?: string
    id?: number
    created_at?: string
    hasPermission?: (permission: TPermission) => boolean
    hasRole?: (role: TRole) => boolean
    
}

export type TRole = {
    id?: number
    name: string
}

export type TPermission = {
    name: string
}

export type TUserResponse = {
    data: {
        token: string,
        user: TUser
    }
    message: string
    success: boolean
}
