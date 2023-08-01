export interface List {
    name: string
    entries: Entry[]
}

export interface Entry {
    id: string
    mediaId: number
    media: {
        bannerImage: string
        title: {
            userPreferred: string
        }
        id: number
    }
}
