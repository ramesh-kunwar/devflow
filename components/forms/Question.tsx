"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionsSchema } from "@/lib/validations";

import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion } from "@/lib/actions/question.action";

const type: any = "create";

const Question = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setIsSubmitting(true);

    try {
      // make an async call to your api -> create a question
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        // author:
      });
      // contain all form data
      // navigate to home
    } catch (error) {
    } finally {
    }
  }

  function handleInputkeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  }

  function handleTagRemove(tag: string, field: any) {
    const newTags: [string] = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semi-bold text-dark400_light800">
                Question title
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light900 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.6 text-light-500">
                Be specifice and imageine you're asking a question to another
                person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semi-bold text-dark400_light800">
                Detail explanation of your problem
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                {/* TODO: Add an editor component */}

                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    tinycomments_mode: "embedded",
                    tinycomments_author: "Author name",
                    mergetags_list: [
                      { value: "First.Name", title: "First Name" },
                      { value: "Email", title: "Email" },
                    ],
                    // ai_request: (request, respondWith) =>
                    //   respondWith.string(() =>
                    //     Promise.reject("See docs to implement AI Assistant")
                    //   ),
                  }}
                  initialValue="Welcome to TinyMCE!"
                />
                {/* editor component */}
              </FormControl>
              <FormDescription className="body-regular mt-2.6 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semi-bold text-dark400_light800">
                Tags
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <>
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border "
                      placeholder="Add tags..."
                      onKeyDown={(e) => handleInputkeyDown(e, field)}
                    />

                    {field.value.length > 0 && (
                      <div className="flex-start mt-2.5 gap-2.5">
                        {field.value.map((tag: any) => (
                          <Badge
                            key={tag}
                            className="subtle-medium background-light800_dark300
                        text-light400_light500 flex items-center justify-center gap-2 rounded-md px-4 py-2 capitalize selection:border-none "
                            onClick={() => handleTagRemove(tag, field)}
                          >
                            {tag}
                            <Image
                              src="/assets/icons/close.svg"
                              alt="Close icon"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.6 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Editing Question" : "Ask a question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};
export default Question;
