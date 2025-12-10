import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TextMorph } from "../ui/text-morph";
import { Input } from "../ui/input";
import { nanoid } from "nanoid";
import { createOrganizationWithDefaults } from "@/lib/create-default-resources";

const formSchema = z.object({
  name: z.string().min(1, "Workspace name is required"),
});

export function OrganizationForm({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsSubmitting(true);
        await createOrganizationWithDefaults(value.name, userId);
      } catch (error) {
        console.error("Error creating organization:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex items-center gap-4 mt-4 w-full"
    >
      <form.Field
        name="name"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <div className="flex-1">
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder="Workspace Name"
                className="rounded-full bg-primary/5 border-none h-10 placeholder:font-semibold placeholder:text-gray-400 shadow-none"
              />
              {isInvalid && (
                <p className="text-xs text-red-500 mt-1 ml-4">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          );
        }}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "px-8 inline-flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary font-semibold text-white select-none disabled:cursor-not-allowed disabled:bg-blue-400/40",
          "transform transition-transform duration-200 ease-out hover:scale-97 active:scale-97 disabled:scale-100",
          isSubmitting
            ? "text-[#b3b3b3] disabled:bg-primary/5"
            : "bg-primary disabled:bg-blue-400/40",
        )}
      >
        {isSubmitting && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
          >
            <path
              d="M14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961C13.2417 11.0241 12.7998 11.6855 12.2426 12.2426C11.6855 12.7998 11.024 13.2418 10.2961 13.5433C9.56814 13.8448 8.78793 14 8 14C7.21206 14 6.43185 13.8448 5.70389 13.5433C4.97594 13.2418 4.31451 12.7998 3.75736 12.2426C3.2002 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 7.21207 2.15519 6.43186 2.45672 5.7039C2.75825 4.97595 3.2002 4.31451 3.75736 3.75736C4.31451 3.20021 4.97594 2.75825 5.7039 2.45673C6.43185 2.1552 7.21207 2 8 2C8.78793 2 9.56814 2.1552 10.2961 2.45673C11.0241 2.75826 11.6855 3.20021 12.2426 3.75736C12.7998 4.31452 13.2417 4.97595 13.5433 5.7039C13.8448 6.43186 14 7.21207 14 8L14 8Z"
              stroke="#DADADA"
              strokeWidth="3"
            />
            <path
              d="M14 8C14 8.94687 13.7759 9.88029 13.346 10.7239C12.9162 11.5676 12.2927 12.2976 11.5267 12.8541C10.7607 13.4107 9.87381 13.778 8.9386 13.9261C8.0034 14.0743 7.04641 13.9989 6.14589 13.7063"
              stroke="#191919"
              strokeOpacity="0.36"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )}
        <TextMorph className={cn(isSubmitting ? "ml-2" : "ml-0")}>
          {isSubmitting ? "Creating..." : "Create"}
        </TextMorph>
      </button>
    </form>
  );
}
