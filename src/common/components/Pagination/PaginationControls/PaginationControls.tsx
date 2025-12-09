import s from "@/common/components/Pagination/Pagination.module.css";
import {getPaginationPages} from "@/common/utils";

type Props = {
    currentPage: number
    pagesCount: number
    setCurrentPage: (page: number) => void
}

export const PaginationControls = ({currentPage, pagesCount, setCurrentPage}: Props) => {
    const pages = getPaginationPages(currentPage, pagesCount)
    return (
        <div className={s.pagination}>
            {pages.map((page, idx) =>
                    page === '...' ? (
                        <span className={s.ellipsis} key={`ellipsis-${idx}`}>
            ...
          </span>
                    ) : (
                        <button
                            key={page}
                            className={
                                page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton
                            }
                            onClick={() => page !== currentPage && setCurrentPage(Number(page))}
                            disabled={page === currentPage}
                            type="button"
                        >
                            {page}
                        </button>
                    )
            )}
        </div>
    );
};

