"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { BlogPost } from "@/types/database";
import { createBlogPost, updateBlogPost } from "./actions";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { BlogCoverUpload } from "@/components/admin/BlogCoverUpload";

type Props = {
  post?: BlogPost | null;
  onClose: () => void;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function BlogPostForm({ post, onClose }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState(post?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url ?? "");
  const isEditing = !!post;

  useEffect(() => {
    if (post?.content) setContent(post.content);
  }, [post?.content]);

  useEffect(() => {
    if (post?.cover_image_url) setCoverImageUrl(post.cover_image_url);
  }, [post?.cover_image_url]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = isEditing
      ? await updateBlogPost(post.id, formData)
      : await createBlogPost(formData);

    if (result?.error) {
      setError(result.error);
      return;
    }
    router.refresh();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain bg-black/70 p-4 backdrop-blur-sm">
      <div className="my-4 flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-md border border-border bg-card sm:my-0">
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-serif text-xl font-medium">
            {isEditing ? "Edit Post" : "New Post"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 text-foreground-muted transition-colors hover:bg-border hover:text-foreground"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4">
            <div className="space-y-4">
              {error && (
                <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground-muted">
                  Title *
                </label>
                <input
                  name="title"
                  required
                  defaultValue={post?.title}
                  onChange={(e) => {
                    const slugInput = e.target.form?.querySelector('[name="slug"]') as HTMLInputElement;
                    if (slugInput && !post) slugInput.value = slugify(e.target.value);
                  }}
                  className="mt-1 w-full rounded-md border border-border bg-card-hover px-3 py-2 text-foreground placeholder:text-foreground-subtle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-muted">
                  Slug *
                </label>
                <input
                  name="slug"
                  required
                  defaultValue={post?.slug}
                  className="mt-1 w-full rounded-md border border-border bg-card-hover px-3 py-2 text-foreground placeholder:text-foreground-subtle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-muted">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  rows={2}
                  defaultValue={post?.excerpt ?? ""}
                  className="mt-1 w-full rounded-md border border-border bg-card-hover px-3 py-2 text-foreground placeholder:text-foreground-subtle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-muted">
                  Content *
                </label>
                <p className="mb-2 mt-1 text-xs text-foreground-muted">
                  Use the toolbar to format text, add images (upload or paste), and embed YouTube videos.
                </p>
                <RichTextEditor content={content} onChange={setContent} />
                <input type="hidden" name="content" value={content} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-muted">
                  Cover Image
                </label>
                <p className="mb-2 mt-1 text-xs text-foreground-muted">
                  Optional. 3:2 landscape for blog post headers.
                </p>
                <BlogCoverUpload
                  value={coverImageUrl || null}
                  onChange={(url) => setCoverImageUrl(url ?? "")}
                />
              </div>

              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground-muted">
                    Category
                  </label>
                  <input
                    name="category"
                    defaultValue={post?.category ?? ""}
                    placeholder="Studio News, Aftercare Tips"
                    className="mt-1 w-full rounded-md border border-border bg-card-hover px-3 py-2 text-foreground placeholder:text-foreground-subtle"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    name="is_published"
                    type="checkbox"
                    defaultChecked={post?.is_published ?? false}
                    className="h-4 w-4 rounded border-border bg-card-hover text-accent"
                  />
                  <label className="text-sm text-foreground-muted">Published</label>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-border bg-card-hover px-4 py-3 sm:px-6">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-2">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] rounded-md border border-border px-4 py-3 text-sm text-foreground-muted transition-colors hover:bg-border hover:text-foreground sm:py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="min-h-[48px] rounded-md border border-accent bg-accent-muted px-4 py-3 text-base font-medium text-accent transition-colors hover:bg-accent hover:text-ivory sm:py-2 sm:text-sm"
              >
                {isEditing ? "Save" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
