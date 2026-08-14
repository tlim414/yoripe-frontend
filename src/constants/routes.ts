export const SEARCH_TYPE = {
  ALL: 'all',
  TITLE: 'title',
  INGREDIENT: 'ingredient',
} as const;

export const QUERY_PARAMS = {
  Q: 'q',
  BY: 'by',
} as const;

export const ROUTES = {
  LANDING: '/',
  MY: '/my-recipes',
  EXPLORE: '/explore',
  SETTINGS: '/settings',
} as const;
