import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types.ts";
import {PlaylistCover, PlaylistDescription} from "@/features/playlists/ui";

type Props = {
    playlist: PlaylistData
    deletePlaylistHandler: (playlistId: string) => void
    editPlaylistHandler: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({playlist, editPlaylistHandler, deletePlaylistHandler}: Props) => {
    return <>
        <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images}/>
        <PlaylistDescription attributes={playlist.attributes}/>

        <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
        <button onClick={() => editPlaylistHandler(playlist)}>update</button>
    </>
}

