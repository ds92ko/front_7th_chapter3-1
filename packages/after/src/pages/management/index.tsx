import { Toast, ToastContainer } from '@/components/feedback';
import { Button } from '@/components/form';
import { Tab, Tabs } from '@/components/navigation';
import { useToast } from '@/hooks/useToast';
import { useState } from 'react';
import { PostDialog, PostStats, PostTable } from './components/post';
import { UserDialog, UserStats, UserTable } from './components/user';
import { pageConfig, toastConfig, toastMessages } from './constants';
import { usePostCRUD, usePostData, usePostStats } from './hooks/post';
import { useUserCRUD, useUserData, useUserStats } from './hooks/user';

type TabType = 'post' | 'user';

export const ManagementPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('post');
  const toast = useToast();

  // User 관련
  const { data: users, loadData: loadUsers } = useUserData();
  const userStats = useUserStats(users);
  const userCRUD = useUserCRUD(loadUsers, toast.showSuccess, toast.showError);

  // Post 관련
  const { data: posts, loadData: loadPosts } = usePostData();
  const postStats = usePostStats(posts);
  const postCRUD = usePostCRUD(loadPosts, toast.showSuccess, toast.showError);

  return (
    <div className="bg-muted min-h-[calc(100vh-4rem-1px)]">
      <div className="mx-auto max-w-[1200px] p-5">
        <div className="mb-5">
          <h1 className="heading-1 text-foreground mb-1">{pageConfig.title}</h1>
          <p className="body-small text-foreground/70">{pageConfig.description}</p>
        </div>

        <div className="border-border bg-card rounded-xl border p-3">
          <Tabs value={activeTab} onChange={value => setActiveTab(value as TabType)}>
            <Tab value="post">{pageConfig.tabs.post}</Tab>
            <Tab value="user">{pageConfig.tabs.user}</Tab>
          </Tabs>

          <div>
            <div className="mb-4 text-right">
              <Button
                variant="default"
                onClick={() => {
                  if (activeTab === 'user') {
                    userCRUD.setIsCreateModalOpen(true);
                  } else {
                    postCRUD.setIsCreateModalOpen(true);
                  }
                }}
              >
                {pageConfig.buttons.create}
              </Button>
            </div>

            {activeTab === 'user' ? (
              <>
                <UserStats stats={userStats} />
                <UserTable
                  users={users}
                  onEdit={userCRUD.handleEdit}
                  onDelete={userCRUD.handleDelete}
                />
              </>
            ) : (
              <>
                <PostStats stats={postStats} />
                <PostTable
                  posts={posts}
                  onEdit={postCRUD.handleEdit}
                  onDelete={postCRUD.handleDelete}
                  onStatusAction={postCRUD.handleStatusAction}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* User Dialogs */}
      <UserDialog
        mode="create"
        open={activeTab === 'user' && userCRUD.isCreateModalOpen}
        onOpenChange={userCRUD.setIsCreateModalOpen}
        form={userCRUD.form}
        onSubmit={userCRUD.handleCreate}
        onCancel={() => {
          userCRUD.setIsCreateModalOpen(false);
          userCRUD.resetForm();
        }}
      />
      <UserDialog
        mode="edit"
        open={activeTab === 'user' && userCRUD.isEditModalOpen}
        onOpenChange={userCRUD.setIsEditModalOpen}
        form={userCRUD.form}
        selectedItem={userCRUD.selectedItem}
        onSubmit={userCRUD.handleUpdate}
        onCancel={() => {
          userCRUD.setIsEditModalOpen(false);
          userCRUD.resetForm();
        }}
      />

      {/* Post Dialogs */}
      <PostDialog
        mode="create"
        open={activeTab === 'post' && postCRUD.isCreateModalOpen}
        onOpenChange={postCRUD.setIsCreateModalOpen}
        form={postCRUD.form}
        onSubmit={postCRUD.handleCreate}
        onCancel={() => {
          postCRUD.setIsCreateModalOpen(false);
          postCRUD.resetForm();
        }}
      />
      <PostDialog
        mode="edit"
        open={activeTab === 'post' && postCRUD.isEditModalOpen}
        onOpenChange={postCRUD.setIsEditModalOpen}
        form={postCRUD.form}
        selectedItem={postCRUD.selectedItem}
        onSubmit={postCRUD.handleUpdate}
        onCancel={() => {
          postCRUD.setIsEditModalOpen(false);
          postCRUD.resetForm();
        }}
      />

      {/* Toast Container */}
      <ToastContainer>
        {toast.toasts.map(toastItem => (
          <Toast
            key={toastItem.id}
            variant={toastItem.variant}
            title={toastItem.variant === 'success' ? toastMessages.success : toastMessages.error}
            onClose={() => toast.removeToast(toastItem.id)}
            duration={toastConfig.duration}
          >
            {toastItem.message}
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
};
