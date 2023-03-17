export interface Page {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}

export interface PageParam {
  pageParam?: number;
}

export interface SearchType {
  sort: string;
}

export interface Props {
  setSearchInfo: React.Dispatch<React.SetStateAction<SearchType>>;
}
