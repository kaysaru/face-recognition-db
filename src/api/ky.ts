import ky from "ky";

export const api = ky.extend({
    prefixUrl: import.meta.env.DEV ? 'api' : 'https://46802d1cb6ef.ngrok-free.app',
})