export const pageConfig = {
  title: '관리 시스템',
  description: '사용자와 게시글을 관리하세요',
  tabs: {
    post: '게시글',
    user: '사용자',
  },
  buttons: {
    create: '새로 만들기',
  },
  stats: {
    total: '전체',
  },
};

export const entityNames = {
  user: '사용자',
  post: '게시글',
} as const;

export const toastConfig = {
  duration: 3000,
} as const;

