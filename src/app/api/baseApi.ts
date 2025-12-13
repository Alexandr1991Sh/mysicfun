import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {toast} from "react-toastify";
import {isErrorWithProperty} from "@/common/utils";

// `createApi` - функция из `RTK Query`, позволяющая создать объект `API`
// для взаимодействия с внешними `API` и управления состоянием приложения
export const baseApi = createApi({
    // `reducerPath` - имя куда будут сохранены состояние и экшены для этого `API`

    reducerPath: 'baseApi',
    // `baseQuery` - конфигурация для `HTTP-клиента`, который будет использоваться для отправки запросов
    baseQuery: async (args, api, extraOptions) => {
        // await new Promise(resolve => setTimeout(resolve, 2000)) // delay

        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            headers: {
                'API-KEY': import.meta.env.VITE_API_KEY ,
            },
            prepareHeaders: headers => {
                headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
                return headers
            },
        })(args, api, extraOptions)

        if (result.error) {
            switch (result.error.status) {
                case 404:
                    if (isErrorWithProperty(result.error.data, 'error')) {
                        toast(result.error.data.error, { type: 'error', theme: 'colored' })
                    } else {
                        toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
                    }
                    break

                case 429:
                    // ✅ 1. Type Assertions
                    // toast((result.error.data as { message: string }).message, { type: 'error', theme: 'colored' })
                    // ✅ 2. JSON.stringify
                    // toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
                    // ✅ 3. Type Predicate
                    if (isErrorWithProperty(result.error.data, 'message')) {
                        toast(result.error.data.message, { type: 'error', theme: 'colored' })
                    } else {
                        toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
                    }
                    break

                default:
                    toast('Some error occurred', { type: 'error', theme: 'colored' })
            }
        }

        return result

    },
    tagTypes: ['Playlists'],
    endpoints: () => ({})
})