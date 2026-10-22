export type UserData = {
    email: string,
    name: string,
    updatedAt: Date,
    createdAt: Date,
    emailVerified: boolean,
    image: string | null,
    age: number,
    role: string,
    city: string,
    sex: string,
    id: string
}

export interface UserDataContextInterface {
    data: UserData | null
}