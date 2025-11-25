import type { Post } from '@/services/postService';
import type { User } from '@/services/userService';
import React from 'react';

// 🚨 Bad Practice: UI 컴포넌트가 도메인 타입을 알고 있음
interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;

  // 🚨 도메인 관심사 추가
  entityType?: 'user' | 'post';
  action?: 'create' | 'edit' | 'delete' | 'publish' | 'archive';
  entity?: User | Post; // 엔티티 객체를 직접 받음
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  entityType,
  action,
  entity,
}) => {
  // 🚨 Bad Practice: UI 컴포넌트가 비즈니스 규칙을 판단함
  let actualDisabled = disabled;
  let actualVariant = variant;
  let actualChildren = children;

  if (entityType && action && entity) {
    // 비즈니스 규칙: 관리자는 삭제 불가
    if (entityType === 'user' && action === 'delete' && (entity as User).role === 'admin') {
      actualDisabled = true;
    }

    // 비즈니스 규칙: 이미 게시된 글은 게시 버튼 비활성화
    if (entityType === 'post' && action === 'publish' && entity.status === 'published') {
      actualDisabled = true;
    }

    // 비즈니스 규칙: 게시된 글만 보관 가능
    if (entityType === 'post' && action === 'archive' && entity.status !== 'published') {
      actualDisabled = true;
    }

    // 자동 label 생성
    if (!children) {
      if (action === 'create') {
        actualChildren = `새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`;
      } else if (action === 'edit') {
        actualChildren = '수정';
      } else if (action === 'delete') {
        actualChildren = '삭제';
      } else if (action === 'publish') {
        actualChildren = '게시';
      } else if (action === 'archive') {
        actualChildren = '보관';
      }
    }

    // action에 따라 variant 자동 결정
    if (action === 'delete') {
      actualVariant = 'danger';
    } else if (action === 'publish') {
      actualVariant = 'success';
    } else if (action === 'archive') {
      actualVariant = 'secondary';
    }
  }

  const classes = ['btn', `btn-${actualVariant}`, `btn-${size}`, fullWidth && 'btn-fullwidth']
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} onClick={onClick} disabled={actualDisabled} className={classes}>
      {actualChildren}
    </button>
  );
};
