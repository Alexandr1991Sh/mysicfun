import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// `createApi` - функция из `RTK Query`, позволяющая создать объект `API`
// для взаимодействия с внешними `API` и управления состоянием приложения
export const baseApi = createApi({
    // `reducerPath` - имя куда будут сохранены состояние и экшены для этого `API`

    reducerPath: 'baseApi',
    // `baseQuery` - конфигурация для `HTTP-клиента`, который будет использоваться для отправки запросов
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        },
        prepareHeaders: headers => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
        },
    }),
    tagTypes: ['Playlists'],
    endpoints: () => ({})
})