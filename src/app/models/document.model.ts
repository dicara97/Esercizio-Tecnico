export interface Document {
    title: string;
    optionalValues?: [{
        name: string;
        type: string;
        isRequired: boolean
        id: number
    }]
}
