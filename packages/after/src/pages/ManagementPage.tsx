import { Badge } from '@/components/data-display/badge';
import { StatCard } from '@/components/data-display/stat-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/data-display/table';
import { Alert } from '@/components/feedback/alert';
import { Toast, ToastContainer } from '@/components/feedback/toast';
import { Button } from '@/components/form/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form/form';
import { Input } from '@/components/form/input';
import { NativeSelect, NativeSelectOption } from '@/components/form/native-select';
import { Textarea } from '@/components/form/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/overlay/dialog';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Tab, Tabs } from '../components/navigation/tabs';
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

  const form = useForm<FormData>({
    defaultValues: {},
  });

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
    form.reset({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType, loadData, form]);

  const handleCreate = async (formData: FormData) => {
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
      form.reset({});
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
      form.reset({
        username: item.username,
        email: item.email,
        role: item.role,
        status: item.status,
      });
    } else if (entityType === 'post' && isPost(item)) {
      form.reset({
        title: item.title,
        content: item.content,
        author: item.author,
        category: item.category,
        status: item.status,
      });
    }

    setIsEditModalOpen(true);
  };

  const handleUpdate = async (formData: FormData) => {
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
      form.reset({});
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
        },
        stat2: {
          label: '비활성',
          value: users.filter(u => u.status === 'inactive').length,
        },
        stat3: {
          label: '정지',
          value: users.filter(u => u.status === 'suspended').length,
        },
        stat4: {
          label: '관리자',
          value: users.filter(u => u.role === 'admin').length,
        },
      };
    } else {
      const posts = data.filter(isPost);
      return {
        total: posts.length,
        stat1: {
          label: '게시됨',
          value: posts.filter(p => p.status === 'published').length,
        },
        stat2: {
          label: '임시저장',
          value: posts.filter(p => p.status === 'draft').length,
        },
        stat3: {
          label: '보관됨',
          value: posts.filter(p => p.status === 'archived').length,
        },
        stat4: {
          label: '총 조회수',
          value: posts.reduce((sum, p) => sum + p.views, 0),
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

  // User 셀 렌더러
  const userRoleMap: Record<
    User['role'],
    { variant: 'purple' | 'orange' | 'primary' | 'gray'; label: string }
  > = {
    admin: { variant: 'purple', label: '관리자' },
    moderator: { variant: 'orange', label: '운영자' },
    user: { variant: 'primary', label: '사용자' },
  };

  const userStatusMap: Record<
    User['status'],
    { variant: 'green' | 'gray' | 'red'; label: string }
  > = {
    active: { variant: 'green', label: '활성' },
    inactive: { variant: 'gray', label: '비활성' },
    suspended: { variant: 'red', label: '정지' },
  };

  const userCellRenderers: Record<string, (user: User) => React.ReactNode> = {
    role: user => {
      const config = userRoleMap[user.role];
      return (
        <Badge variant={config.variant} rounded>
          {config.label}
        </Badge>
      );
    },
    status: user => {
      const config = userStatusMap[user.status];
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
    lastLogin: user => user.lastLogin || '-',
    actions: user => (
      <div className="flex gap-2">
        <Button variant="default" size="sm" onClick={() => handleEdit(user)}>
          수정
        </Button>
        <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
          삭제
        </Button>
      </div>
    ),
  };

  // Post 셀 렌더러
  const postCategoryMap: Partial<
    Record<string, { variant: 'primary' | 'pink' | 'green' | 'secondary' }>
  > = {
    development: { variant: 'primary' },
    design: { variant: 'pink' },
    accessibility: { variant: 'green' },
  };

  const postStatusMap: Record<
    Post['status'],
    { variant: 'green' | 'yellow' | 'gray' | 'red'; label: string }
  > = {
    published: { variant: 'green', label: '게시됨' },
    draft: { variant: 'yellow', label: '임시저장' },
    archived: { variant: 'gray', label: '보관됨' },
  };

  const postCellRenderers: Record<string, (post: Post) => React.ReactNode> = {
    category: post => {
      const config = postCategoryMap[post.category] || { variant: 'secondary' as const };
      return (
        <Badge variant={config.variant} rounded>
          {post.category}
        </Badge>
      );
    },
    status: post => {
      const config = postStatusMap[post.status];
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
    views: post => post.views.toLocaleString(),
    actions: post => (
      <div className="flex flex-wrap gap-2">
        <Button variant="default" size="sm" onClick={() => handleEdit(post)}>
          수정
        </Button>
        {post.status === 'draft' && (
          <Button
            variant="success"
            size="sm"
            onClick={() => handleStatusAction(post.id, 'publish')}
          >
            게시
          </Button>
        )}
        {post.status === 'published' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleStatusAction(post.id, 'archive')}
          >
            보관
          </Button>
        )}
        {post.status === 'archived' && (
          <Button variant="info" size="sm" onClick={() => handleStatusAction(post.id, 'restore')}>
            복원
          </Button>
        )}
        <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
          삭제
        </Button>
      </div>
    ),
  };

  // 셀 렌더링 함수
  const renderCellContent = (row: Entity, columnKey: string): React.ReactNode => {
    const cellValue = row[columnKey as keyof Entity];

    if (entityType === 'user' && isUser(row)) {
      const renderer = userCellRenderers[columnKey];
      return renderer ? renderer(row) : cellValue;
    }

    if (entityType === 'post' && isPost(row)) {
      const renderer = postCellRenderers[columnKey];
      return renderer ? renderer(row) : cellValue;
    }

    return cellValue;
  };

  return (
    <div className="bg-muted">
      <div className="mx-auto max-w-[1200px] p-5">
        <div className="mb-5">
          <h1 className="heading-1 text-foreground mb-1">관리 시스템</h1>
          <p className="body-small text-muted-foreground">사용자와 게시글을 관리하세요</p>
        </div>

        <div className="border-border bg-card rounded-xl border p-3">
          <Tabs value={entityType} onChange={value => setEntityType(value as EntityType)}>
            <Tab value="post">게시글</Tab>
            <Tab value="user">사용자</Tab>
          </Tabs>

          <div>
            <div className="mb-4 text-right">
              <Button variant="default" onClick={() => setIsCreateModalOpen(true)}>
                새로 만들기
              </Button>
            </div>

            <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
              <StatCard variant="info" label="전체" value={stats.total} />
              <StatCard variant="success" label={stats.stat1.label} value={stats.stat1.value} />
              <StatCard variant="warning" label={stats.stat2.label} value={stats.stat2.value} />
              <StatCard variant="error" label={stats.stat3.label} value={stats.stat3.value} />
              <StatCard variant="secondary" label={stats.stat4.label} value={stats.stat4.value} />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  {renderTableColumns().map(column => (
                    <TableHead
                      key={column.key}
                      style={column.width ? { width: column.width } : undefined}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {renderTableColumns().map(column => (
                      <TableCell key={column.key}>{renderCellContent(row, column.key)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog
        open={isCreateModalOpen}
        onOpenChange={open => {
          setIsCreateModalOpen(open);
          if (!open) {
            form.reset({});
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
              {entityType === 'user' ? (
                <>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          사용자명 <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="사용자명을 입력하세요" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          이메일 <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="이메일을 입력하세요"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>역할</FormLabel>
                          <FormControl>
                            <NativeSelect
                              value={field.value || 'user'}
                              onChange={e => {
                                const value = e.target.value;
                                if (
                                  value === 'user' ||
                                  value === 'moderator' ||
                                  value === 'admin'
                                ) {
                                  field.onChange(value);
                                }
                              }}
                            >
                              <NativeSelectOption value="user">사용자</NativeSelectOption>
                              <NativeSelectOption value="moderator">운영자</NativeSelectOption>
                              <NativeSelectOption value="admin">관리자</NativeSelectOption>
                            </NativeSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>상태</FormLabel>
                          <FormControl>
                            <NativeSelect
                              value={field.value || 'active'}
                              onChange={e => {
                                const value = e.target.value;
                                if (
                                  value === 'active' ||
                                  value === 'inactive' ||
                                  value === 'suspended'
                                ) {
                                  field.onChange(value);
                                }
                              }}
                            >
                              <NativeSelectOption value="active">활성</NativeSelectOption>
                              <NativeSelectOption value="inactive">비활성</NativeSelectOption>
                              <NativeSelectOption value="suspended">정지</NativeSelectOption>
                            </NativeSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          제목 <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="게시글 제목을 입력하세요" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            작성자 <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="작성자명" required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>카테고리</FormLabel>
                          <FormControl>
                            <NativeSelect
                              value={field.value || ''}
                              onChange={e => field.onChange(e.target.value)}
                            >
                              <NativeSelectOption value="" disabled>
                                카테고리 선택
                              </NativeSelectOption>
                              <NativeSelectOption value="development">
                                Development
                              </NativeSelectOption>
                              <NativeSelectOption value="design">Design</NativeSelectOption>
                              <NativeSelectOption value="accessibility">
                                Accessibility
                              </NativeSelectOption>
                            </NativeSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>내용</FormLabel>
                        <FormControl>
                          <Textarea placeholder="게시글 내용을 입력하세요" rows={6} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    form.reset({});
                  }}
                >
                  취소
                </Button>
                <Button type="submit" variant="default">
                  생성
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditModalOpen}
        onOpenChange={open => {
          setIsEditModalOpen(open);
          if (!open) {
            form.reset({});
            setSelectedItem(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{`${entityType === 'user' ? '사용자' : '게시글'} 수정`}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
              {selectedItem && (
                <Alert variant="info">
                  ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                  {entityType === 'post' &&
                    isPost(selectedItem) &&
                    ` | 조회수: ${selectedItem.views}`}
                </Alert>
              )}

              {entityType === 'user' ? (
                <>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          사용자명 <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="사용자명을 입력하세요" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          이메일 <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="이메일을 입력하세요"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>역할</FormLabel>
                          <FormControl>
                            <NativeSelect
                              value={field.value || 'user'}
                              onChange={e => {
                                const value = e.target.value;
                                if (
                                  value === 'user' ||
                                  value === 'moderator' ||
                                  value === 'admin'
                                ) {
                                  field.onChange(value);
                                }
                              }}
                            >
                              <NativeSelectOption value="user">사용자</NativeSelectOption>
                              <NativeSelectOption value="moderator">운영자</NativeSelectOption>
                              <NativeSelectOption value="admin">관리자</NativeSelectOption>
                            </NativeSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>상태</FormLabel>
                          <FormControl>
                            <NativeSelect
                              value={field.value || 'active'}
                              onChange={e => {
                                const value = e.target.value;
                                if (
                                  value === 'active' ||
                                  value === 'inactive' ||
                                  value === 'suspended'
                                ) {
                                  field.onChange(value);
                                }
                              }}
                            >
                              <NativeSelectOption value="active">활성</NativeSelectOption>
                              <NativeSelectOption value="inactive">비활성</NativeSelectOption>
                              <NativeSelectOption value="suspended">정지</NativeSelectOption>
                            </NativeSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          제목 <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="게시글 제목을 입력하세요" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            작성자 <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="작성자명" required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>카테고리</FormLabel>
                          <FormControl>
                            <NativeSelect
                              value={field.value || ''}
                              onChange={e => field.onChange(e.target.value)}
                            >
                              <NativeSelectOption value="" disabled>
                                카테고리 선택
                              </NativeSelectOption>
                              <NativeSelectOption value="development">
                                Development
                              </NativeSelectOption>
                              <NativeSelectOption value="design">Design</NativeSelectOption>
                              <NativeSelectOption value="accessibility">
                                Accessibility
                              </NativeSelectOption>
                            </NativeSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>내용</FormLabel>
                        <FormControl>
                          <Textarea placeholder="게시글 내용을 입력하세요" rows={6} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    form.reset({});
                    setSelectedItem(null);
                  }}
                >
                  취소
                </Button>
                <Button type="submit" variant="default">
                  수정 완료
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <ToastContainer>
        {showSuccessAlert && (
          <Toast
            variant="success"
            title="성공"
            onClose={() => setShowSuccessAlert(false)}
            duration={5000}
          >
            {alertMessage}
          </Toast>
        )}
        {showErrorAlert && (
          <Toast
            variant="error"
            title="오류"
            onClose={() => setShowErrorAlert(false)}
            duration={5000}
          >
            {errorMessage}
          </Toast>
        )}
      </ToastContainer>
    </div>
  );
};
