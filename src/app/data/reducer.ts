import { createReducer, on } from '@ngrx/store';
import { ProvidePosts, DeletePost, ProvidePost } from './actions';

interface BlogState {
  posts: any[];
  post: any;
}

const initialBlogState: BlogState = {
  posts: [],
  post: null
};

const BlogReducer = createReducer(
  initialBlogState,
  on(ProvidePosts, (state: BlogState, { posts }) => ({
    ...state,
    posts
  })),
  on(DeletePost, (state: BlogState, { id }) => ({
    ...state,
    posts: state.posts.filter(p => p.id !== id)
  })),
  on(ProvidePost, (state: BlogState, { id }) => ({
    ...state,
    post: state.posts.find(p => p.id === id)
  }))
);

export interface AppState {
  blog: BlogState;
}

export const AppReducers = {
  blog: BlogReducer
};
