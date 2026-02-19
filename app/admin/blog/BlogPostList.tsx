"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { BlogPost } from "@/types/database";
import { BlogPostForm } from "./BlogPostForm";
import { deleteBlogPost } from "./actions";

type Props = {
  posts: BlogPost[];
};

export function BlogPostList({ posts }: Props) {
  const router = useRouter();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeletingId(id);
    await deleteBlogPost(id);
    setDeletingId(null);
    router.refresh();
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-foreground-muted">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={() => setShowCreate(true)}
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md border border-accent bg-accent-muted px-4 py-3 text-base font-medium text-accent transition-colors hover:bg-accent hover:text-ivory sm:w-auto sm:py-2 sm:text-sm"
        >
          <Plus size={20} strokeWidth={1.5} />
          New Post
        </button>
      </div>

      {/* Mobile card layout */}
      <div className="mt-6 flex flex-col gap-3 md:hidden">
        {posts.length === 0 ? (
          <div className="rounded-md border border-border bg-card px-4 py-12 text-center text-foreground-muted">
            No posts yet. Click &quot;New Post&quot; to create one.
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="rounded-md border border-border bg-card p-4"
            >
              <div className="flex items-start gap-3">
                {post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-card-hover font-serif text-xs text-foreground-muted">
                    Post
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground">{post.title}</div>
                  <div className="text-xs text-foreground-muted">/{post.slug}</div>
                  <div className="mt-1 text-sm text-foreground-muted">
                    {post.category || "—"}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        post.is_published
                          ? "bg-green-500/20 text-green-400"
                          : "bg-border text-foreground-muted"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-foreground-muted transition-colors hover:bg-border hover:text-foreground"
                      >
                        <Pencil size={14} strokeWidth={1.5} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="flex items-center gap-1.5 rounded-md border border-red-500/50 bg-red-500/10 px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop table layout */}
      <div className="mt-6 hidden overflow-x-auto rounded-md border border-border md:block">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground-muted">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground-muted">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground-muted">
                Status
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-foreground-muted"
                >
                  No posts yet. Click &quot;New Post&quot; to create one.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-border bg-card hover:bg-card-hover"
                >
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-foreground">{post.title}</div>
                      <div className="text-xs text-foreground-muted">
                        /{post.slug}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground-muted">
                    {post.category || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        post.is_published
                          ? "bg-green-500/20 text-green-400"
                          : "bg-border text-foreground-muted"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-foreground-muted transition-colors hover:bg-border hover:text-foreground"
                      >
                        <Pencil size={14} strokeWidth={1.5} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="flex items-center gap-1.5 rounded-md border border-red-500/50 bg-red-500/10 px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <BlogPostForm post={null} onClose={() => setShowCreate(false)} />
      )}
      {editingPost && (
        <BlogPostForm
          post={editingPost}
          onClose={() => setEditingPost(null)}
        />
      )}
    </>
  );
}
