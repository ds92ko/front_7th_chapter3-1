import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/atoms';
import { FormInput, FormSelect, FormTextarea } from '../components/molecules';
import { Alert, Modal, Table } from '../components/organisms';
import type { Post } from '../services/postService';
import { postService } from '../services/postService';
import type { User } from '../services/userService';
import { userService } from '../services/userService';

type EntityType = 'user' | 'post';
type Entity = User | Post;

// 타입 가드 함수들
function isUser(entity: Entity): entity is User {
  return 'username' in entity && 'email' in entity;
}

function isPost(entity: Entity): entity is Post {
  return 'title' in entity && 'content' in entity && 'author' in entity;
}

// FormData 타입 정의
type FormData = {
  username?: string;
  email?: string;
  role?: User['role'];
  status?: string; // User['status'] | Post['status'] - entityType에 따라 다름
  title?: string;
  content?: string;
  author?: string;
  category?: string;
};

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<FormData>({});

  const loadData = useCallback(async () => {
    try {
      let result: Entity[];

      if (entityType === 'user') {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch {
      setErrorMessage('데이터를 불러오는데 실패했습니다');
      setShowErrorAlert(true);
    }
  }, [entityType]);

  useEffect(() => {
    loadData();
    setFormData({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType, loadData]);

  const handleCreate = async () => {
    try {
      if (entityType === 'user') {
        if (!formData.username || !formData.email) {
          setErrorMessage('사용자명과 이메일을 입력해주세요');
          setShowErrorAlert(true);
          return;
        }
        const userStatus = formData.status || 'active';
        if (userStatus !== 'active' && userStatus !== 'inactive' && userStatus !== 'suspended') {
          setErrorMessage('유효하지 않은 상태입니다');
          setShowErrorAlert(true);
          return;
        }
        await userService.create({
          username: formData.username,
          email: formData.email,
          role: formData.role || 'user',
          status: userStatus,
        });
      } else {
        if (!formData.title || !formData.author || !formData.category) {
          setErrorMessage('제목, 작성자, 카테고리를 입력해주세요');
          setShowErrorAlert(true);
          return;
        }
        const postStatus = formData.status || 'draft';
        if (postStatus !== 'draft' && postStatus !== 'published' && postStatus !== 'archived') {
          setErrorMessage('유효하지 않은 상태입니다');
          setShowErrorAlert(true);
          return;
        }
        await postService.create({
          title: formData.title,
          content: formData.content || '',
          author: formData.author,
          category: formData.category,
          status: postStatus,
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage(`${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`);
      setShowSuccessAlert(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : '생성에 실패했습니다';
      setErrorMessage(message);
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);

    if (entityType === 'user' && isUser(item)) {
      setFormData({
        username: item.username,
        email: item.email,
        role: item.role,
        status: item.status,
      });
    } else if (entityType === 'post' && isPost(item)) {
      setFormData({
        title: item.title,
        content: item.content,
        author: item.author,
        category: item.category,
        status: item.status,
      });
    }

    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      if (entityType === 'user' && isUser(selectedItem)) {
        const updateData: Partial<Omit<User, 'id' | 'createdAt'>> = {};
        if (formData.username) updateData.username = formData.username;
        if (formData.email) updateData.email = formData.email;
        if (formData.role) updateData.role = formData.role;
        const userStatus = formData.status;
        if (userStatus === 'active' || userStatus === 'inactive' || userStatus === 'suspended') {
          updateData.status = userStatus;
        }
        await userService.update(selectedItem.id, updateData);
      } else if (entityType === 'post' && isPost(selectedItem)) {
        const updateData: Partial<Omit<Post, 'id' | 'createdAt' | 'views'>> = {};
        if (formData.title) updateData.title = formData.title;
        if (formData.content !== undefined) updateData.content = formData.content;
        if (formData.author) updateData.author = formData.author;
        if (formData.category) updateData.category = formData.category;
        const postStatus = formData.status;
        if (postStatus === 'draft' || postStatus === 'published' || postStatus === 'archived') {
          updateData.status = postStatus;
        }
        await postService.update(selectedItem.id, updateData);
      }

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage(`${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`);
      setShowSuccessAlert(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : '수정에 실패했습니다';
      setErrorMessage(message);
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (entityType === 'user') {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      setAlertMessage('삭제되었습니다');
      setShowSuccessAlert(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : '삭제에 실패했습니다';
      setErrorMessage(message);
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (id: number, action: 'publish' | 'archive' | 'restore') => {
    if (entityType !== 'post') return;

    try {
      if (action === 'publish') {
        await postService.publish(id);
      } else if (action === 'archive') {
        await postService.archive(id);
      } else if (action === 'restore') {
        await postService.restore(id);
      }

      await loadData();
      const message = action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : '작업에 실패했습니다';
      setErrorMessage(message);
      setShowErrorAlert(true);
    }
  };

  const getStats = () => {
    if (entityType === 'user') {
      const users = data.filter(isUser);
      return {
        total: users.length,
        stat1: {
          label: '활성',
          value: users.filter(u => u.status === 'active').length,
          color: '#2e7d32',
        },
        stat2: {
          label: '비활성',
          value: users.filter(u => u.status === 'inactive').length,
          color: '#ed6c02',
        },
        stat3: {
          label: '정지',
          value: users.filter(u => u.status === 'suspended').length,
          color: '#d32f2f',
        },
        stat4: {
          label: '관리자',
          value: users.filter(u => u.role === 'admin').length,
          color: '#1976d2',
        },
      };
    } else {
      const posts = data.filter(isPost);
      return {
        total: posts.length,
        stat1: {
          label: '게시됨',
          value: posts.filter(p => p.status === 'published').length,
          color: '#2e7d32',
        },
        stat2: {
          label: '임시저장',
          value: posts.filter(p => p.status === 'draft').length,
          color: '#ed6c02',
        },
        stat3: {
          label: '보관됨',
          value: posts.filter(p => p.status === 'archived').length,
          color: 'rgba(0, 0, 0, 0.6)',
        },
        stat4: {
          label: '총 조회수',
          value: posts.reduce((sum, p) => sum + p.views, 0),
          color: '#1976d2',
        },
      };
    }
  };

  // 🚨 Table 컴포넌트에 로직을 위임하여 간소화
  const renderTableColumns = () => {
    if (entityType === 'user') {
      return [
        { key: 'id', header: 'ID', width: '60px' },
        { key: 'username', header: '사용자명', width: '150px' },
        { key: 'email', header: '이메일' },
        { key: 'role', header: '역할', width: '120px' },
        { key: 'status', header: '상태', width: '120px' },
        { key: 'createdAt', header: '생성일', width: '120px' },
        { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
        { key: 'actions', header: '관리', width: '200px' },
      ];
    } else {
      return [
        { key: 'id', header: 'ID', width: '60px' },
        { key: 'title', header: '제목' },
        { key: 'author', header: '작성자', width: '120px' },
        { key: 'category', header: '카테고리', width: '140px' },
        { key: 'status', header: '상태', width: '120px' },
        { key: 'views', header: '조회수', width: '100px' },
        { key: 'createdAt', header: '작성일', width: '120px' },
        { key: 'actions', header: '관리', width: '250px' },
      ];
    }
  };

  const stats = getStats();

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '5px',
              color: '#333',
            }}
          >
            관리 시스템
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>사용자와 게시글을 관리하세요</p>
        </div>

        <div
          style={{
            background: 'white',
            border: '1px solid #ddd',
            padding: '10px',
          }}
        >
          <div
            style={{
              marginBottom: '15px',
              borderBottom: '2px solid #ccc',
              paddingBottom: '5px',
            }}
          >
            <button
              onClick={() => setEntityType('post')}
              style={{
                padding: '8px 16px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: entityType === 'post' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'post' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'post' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              게시글
            </button>
            <button
              onClick={() => setEntityType('user')}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: entityType === 'user' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'user' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'user' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              사용자
            </button>
          </div>

          <div>
            <div style={{ marginBottom: '15px', textAlign: 'right' }}>
              <Button variant="primary" size="md" onClick={() => setIsCreateModalOpen(true)}>
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div style={{ marginBottom: '10px' }}>
                <Alert variant="success" title="성공" onClose={() => setShowSuccessAlert(false)}>
                  {alertMessage}
                </Alert>
              </div>
            )}

            {showErrorAlert && (
              <div style={{ marginBottom: '10px' }}>
                <Alert variant="error" title="오류" onClose={() => setShowErrorAlert(false)}>
                  {errorMessage}
                </Alert>
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px',
                marginBottom: '15px',
              }}
            >
              <div
                style={{
                  padding: '12px 15px',
                  background: '#e3f2fd',
                  border: '1px solid #90caf9',
                  borderRadius: '3px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>전체</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
                  {stats.total}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#e8f5e9',
                  border: '1px solid #81c784',
                  borderRadius: '3px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {stats.stat1.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>
                  {stats.stat1.value}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#fff3e0',
                  border: '1px solid #ffb74d',
                  borderRadius: '3px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {stats.stat2.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>
                  {stats.stat2.value}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#ffebee',
                  border: '1px solid #e57373',
                  borderRadius: '3px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {stats.stat3.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d32f2f' }}>
                  {stats.stat3.value}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#f5f5f5',
                  border: '1px solid #bdbdbd',
                  borderRadius: '3px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {stats.stat4.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#424242' }}>
                  {stats.stat4.value}
                </div>
              </div>
            </div>

            <div style={{ border: '1px solid #ddd', background: 'white', overflow: 'auto' }}>
              <Table
                columns={renderTableColumns()}
                data={data}
                striped
                hover
                entityType={entityType}
                onEdit={item => {
                  handleEdit(item);
                }}
                onDelete={handleDelete}
                onPublish={id => handleStatusAction(id, 'publish')}
                onArchive={id => handleStatusAction(id, 'archive')}
                onRestore={id => handleStatusAction(id, 'restore')}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setFormData({});
        }}
        title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}
        size="large"
        showFooter
        footerContent={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setIsCreateModalOpen(false);
                setFormData({});
              }}
            >
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleCreate}>
              생성
            </Button>
          </>
        }
      >
        <div>
          {entityType === 'user' ? (
            <>
              <FormInput
                name="username"
                value={formData.username || ''}
                onChange={value => setFormData({ ...formData, username: value })}
                label="사용자명"
                placeholder="사용자명을 입력하세요"
                required
                width="full"
                fieldType="username"
              />
              <FormInput
                name="email"
                value={formData.email || ''}
                onChange={value => setFormData({ ...formData, email: value })}
                label="이메일"
                placeholder="이메일을 입력하세요"
                type="email"
                required
                width="full"
                fieldType="email"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <FormSelect
                  name="role"
                  value={formData.role || 'user'}
                  onChange={value => {
                    if (value === 'user' || value === 'moderator' || value === 'admin') {
                      setFormData({ ...formData, role: value });
                    }
                  }}
                  options={[
                    { value: 'user', label: '사용자' },
                    { value: 'moderator', label: '운영자' },
                    { value: 'admin', label: '관리자' },
                  ]}
                  label="역할"
                  size="md"
                />
                <FormSelect
                  name="status"
                  value={formData.status || 'active'}
                  onChange={value => {
                    if (value === 'active' || value === 'inactive' || value === 'suspended') {
                      setFormData({ ...formData, status: value });
                    }
                  }}
                  options={[
                    { value: 'active', label: '활성' },
                    { value: 'inactive', label: '비활성' },
                    { value: 'suspended', label: '정지' },
                  ]}
                  label="상태"
                  size="md"
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                name="title"
                value={formData.title || ''}
                onChange={value => setFormData({ ...formData, title: value })}
                label="제목"
                placeholder="게시글 제목을 입력하세요"
                required
                width="full"
                fieldType="postTitle"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <FormInput
                  name="author"
                  value={formData.author || ''}
                  onChange={value => setFormData({ ...formData, author: value })}
                  label="작성자"
                  placeholder="작성자명"
                  required
                  width="full"
                />
                <FormSelect
                  name="category"
                  value={formData.category || ''}
                  onChange={value => {
                    if (typeof value === 'string') {
                      setFormData({ ...formData, category: value });
                    }
                  }}
                  options={[
                    { value: 'development', label: 'Development' },
                    { value: 'design', label: 'Design' },
                    { value: 'accessibility', label: 'Accessibility' },
                  ]}
                  label="카테고리"
                  placeholder="카테고리 선택"
                  size="md"
                />
              </div>
              <FormTextarea
                name="content"
                value={formData.content || ''}
                onChange={value => setFormData({ ...formData, content: value })}
                label="내용"
                placeholder="게시글 내용을 입력하세요"
                rows={6}
              />
            </>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setFormData({});
          setSelectedItem(null);
        }}
        title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`}
        size="large"
        showFooter
        footerContent={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setIsEditModalOpen(false);
                setFormData({});
                setSelectedItem(null);
              }}
            >
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleUpdate}>
              수정 완료
            </Button>
          </>
        }
      >
        <div>
          {selectedItem && (
            <Alert variant="info">
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
              {entityType === 'post' && isPost(selectedItem) && ` | 조회수: ${selectedItem.views}`}
            </Alert>
          )}

          {entityType === 'user' ? (
            <>
              <FormInput
                name="username"
                value={formData.username || ''}
                onChange={value => setFormData({ ...formData, username: value })}
                label="사용자명"
                placeholder="사용자명을 입력하세요"
                required
                width="full"
                fieldType="username"
              />
              <FormInput
                name="email"
                value={formData.email || ''}
                onChange={value => setFormData({ ...formData, email: value })}
                label="이메일"
                placeholder="이메일을 입력하세요"
                type="email"
                required
                width="full"
                fieldType="email"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <FormSelect
                  name="role"
                  value={formData.role || 'user'}
                  onChange={value => {
                    if (value === 'user' || value === 'moderator' || value === 'admin') {
                      setFormData({ ...formData, role: value });
                    }
                  }}
                  options={[
                    { value: 'user', label: '사용자' },
                    { value: 'moderator', label: '운영자' },
                    { value: 'admin', label: '관리자' },
                  ]}
                  label="역할"
                  size="md"
                />
                <FormSelect
                  name="status"
                  value={formData.status || 'active'}
                  onChange={value => {
                    if (value === 'active' || value === 'inactive' || value === 'suspended') {
                      setFormData({ ...formData, status: value });
                    }
                  }}
                  options={[
                    { value: 'active', label: '활성' },
                    { value: 'inactive', label: '비활성' },
                    { value: 'suspended', label: '정지' },
                  ]}
                  label="상태"
                  size="md"
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                name="title"
                value={formData.title || ''}
                onChange={value => setFormData({ ...formData, title: value })}
                label="제목"
                placeholder="게시글 제목을 입력하세요"
                required
                width="full"
                fieldType="postTitle"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <FormInput
                  name="author"
                  value={formData.author || ''}
                  onChange={value => setFormData({ ...formData, author: value })}
                  label="작성자"
                  placeholder="작성자명"
                  required
                  width="full"
                />
                <FormSelect
                  name="category"
                  value={formData.category || ''}
                  onChange={value => {
                    if (typeof value === 'string') {
                      setFormData({ ...formData, category: value });
                    }
                  }}
                  options={[
                    { value: 'development', label: 'Development' },
                    { value: 'design', label: 'Design' },
                    { value: 'accessibility', label: 'Accessibility' },
                  ]}
                  label="카테고리"
                  placeholder="카테고리 선택"
                  size="md"
                />
              </div>
              <FormTextarea
                name="content"
                value={formData.content || ''}
                onChange={value => setFormData({ ...formData, content: value })}
                label="내용"
                placeholder="게시글 내용을 입력하세요"
                rows={6}
              />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
