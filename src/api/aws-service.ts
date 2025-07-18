import {api} from "./ky.ts";

type UploadResponse = {
    objectKey: string,
    url: string,
}

export type Match = {
    faceId: string,
    imageUrl: string,
    similarity: number,
}

type SearchResponse = {
    matches: Match[]
}

export function upload(file: File) {
    const form = new FormData();
    form.append('file', file)
    return api.post<UploadResponse>('upload', {
        body: form,
    }).json()
}

export function search(file: File) {
    const form = new FormData();
    form.append('image', file)
    return api.post<SearchResponse>('search', {
        body: form,
    }).json()
}

export function index(file: File, objectKey: string) {
    const form = new FormData();
    form.append('image', file)
    form.append('objectKey', objectKey)
    return api.post('index', {
        body: form,
    }).text()
}
