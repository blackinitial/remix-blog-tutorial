import { Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { createPost } from "~/models/post.server";
import invariant from "tiny-invariant";

type ActionData = {
  title: null | string
  slug: null | string
  markdown: null | string
} | undefined

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();

  const title = formData.get('title');
  const slug = formData.get('slug')
  const markdown = formData.get('markdown')

  const errors: ActionData = {
    title: title ? null : 'Title is required',
    slug: slug ? null : 'Slug is required',
    markdown: markdown ? null : 'Markdown is required'
  }

  const hasErrors = Object.values(errors).some(errorMessage => errorMessage)
  if (hasErrors) {
    return json<ActionData>(errors)
  }

  invariant(typeof title == 'string', 'title must be a string')
  invariant(typeof slug == 'string', 'slug must be a string')
  invariant(typeof markdown == 'string', 'markdown must be a string')

  await createPost({ title, slug, markdown })
  
  return redirect("/posts/admin");
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPostRoute() {
  const errors = useActionData() as ActionData;
  return (
    <Form method="post">
      <p>
        <label htmlFor="title">
          Post Title: {errors?.title ? (
            <em className="text-red-500">{errors.title}</em>
          ) : null}
          <input type="text" name="title" className={inputClassName} />
        </label>
      </p>
      <p>
        <label htmlFor="slug">
          Post Slug: {errors?.slug ? (
            <em className="text-red-500">{errors.slug}</em>
          ) : null}
          <input type="text" name="slug" className={inputClassName} />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">
          Markdown: {errors?.markdown ? (
            <em className="text-red-500">{errors.markdown}</em>
          ) : null}
          <textarea name="markdown" id="markdowon" rows="20" className={`${inputClassName} font-mono`} />
        </label>
      </p>
      <p className="text-right">
        <button type="submit" className="rounded bg-blue-500 px-4 text-white">
          Create Post
        </button>
      </p>
    </Form>
  )
}