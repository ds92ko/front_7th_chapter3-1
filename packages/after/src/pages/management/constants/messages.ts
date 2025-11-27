export const userMessages = {
  success: {
    create: '사용자가 생성되었습니다',
    update: '사용자가 수정되었습니다',
    delete: '삭제되었습니다',
  },
  validation: {
    required: '사용자명과 이메일을 입력해주세요',
    invalidStatus: '유효하지 않은 상태입니다',
  },
};

export const postMessages = {
  success: {
    create: '게시글이 생성되었습니다',
    update: '게시글이 수정되었습니다',
    delete: '삭제되었습니다',
  },
  validation: {
    required: '제목, 작성자, 카테고리를 입력해주세요',
    invalidStatus: '유효하지 않은 상태입니다',
  },
  statusAction: {
    publish: '게시',
    archive: '보관',
    restore: '복원',
  },
};

export const dialogMessages = {
  button: {
    create: '생성',
    edit: '수정 완료',
  },
  title: {
    create: (entityName: string) => `새 ${entityName} 만들기`,
    edit: (entityName: string) => `${entityName} 수정`,
  },
};

export const toastMessages = {
  success: '성공',
  error: '오류',
};

