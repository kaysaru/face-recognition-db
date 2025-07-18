import ky from "ky";

export const api = ky.extend({
    prefixUrl: import.meta.env.DEV ? 'api' : 'https://81915d18a4fa.ngrok-free.app',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    }
})