import Pagination from "./Pagination";
import Item from "./Item";

type PaginationType = typeof Pagination & {Item: typeof Item};

const _Pagination = Pagination as PaginationType;

_Pagination.Item = Item;

export default _Pagination;