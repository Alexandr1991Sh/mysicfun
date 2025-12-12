import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi.ts";
import s from './PlaylistsPage.module.css'
import {type ChangeEvent, useState} from "react";
import {useDebounceValue} from "@/common/hooks";
import {Pagination} from "@/common/components";
import {CreatePlaylistForm, PlaylistsList} from "@/features/playlists/ui";

export const PlaylistsPage = () => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const debounceSearch = useDebounceValue(search)

    const {data, isLoading} = useFetchPlaylistsQuery({
        search: debounceSearch,
        pageNumber: currentPage,
        pageSize: pageSize,
    })

    if (isLoading) return <h2>Skeleton loader...</h2>

    const changePageSizeHandler = (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
    }

    const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        setCurrentPage(1)
    }


    return (
        <div className={s.container}>

            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <input
                type="search"
                placeholder={'Search playlist by title'}
                onChange={(e) => searchPlaylistHandler(e)}
            />
            <PlaylistsList isPlaylistsLoading={isLoading} playlists={data?.data || []}/>
            <Pagination setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        pagesCount={data?.meta.pagesCount || 1}
                        pageSize={pageSize}
                        changePageSize={changePageSizeHandler}/>
        </div>
    )
}

