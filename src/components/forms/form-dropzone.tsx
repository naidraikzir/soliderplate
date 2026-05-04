import {
  Field,
  type FieldStore,
  type FormStore,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/solid'
import { createSignal, createUniqueId, For, Show, createEffect, type JSX } from 'solid-js'
import * as v from 'valibot'

import { cx } from '@/lib/cva'

import { Button } from '../ui/button'

type TFormInputProps<TSchema extends Schema, TFieldPath extends RequiredPath> = {
  of: FormStore<TSchema>
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>
  class?: string
  label?: JSX.Element
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  columns?: 1 | 2
}

type TFieldDropzone<TSchema extends Schema, TFieldPath extends RequiredPath> = FieldStore<
  TSchema,
  TFieldPath
>['input']

type TCreated = { base64: string; filename: string }

export function FormDropzone<TSchema extends Schema, TFieldPath extends RequiredPath>(
  props: TFormInputProps<TSchema, TFieldPath>,
) {
  const id = `dropzone-${createUniqueId()}`

  const [created, setCreated] = createSignal<TCreated[]>([])

  async function createBase64Strings(files: FileList) {
    if (!files.length) return

    return await Promise.all(
      [...files].map(
        (file) =>
          new Promise<TCreated>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () =>
              resolve({
                base64: reader.result as string,
                filename: file.name,
              })
            reader.onerror = reject
            reader.readAsDataURL(file)
          }),
      ),
    )
  }

  return (
    <Field of={props.of} path={props.path}>
      {(field) => {
        createEffect(() => {
          const input = field.input
          if (!input || (Array.isArray(input) && input.length === 0)) {
            setCreated([])
          }
        })

        return (
          <div
            class={cx(
              'self-start grid gap-2 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50',
              props.class,
            )}
            data-disabled={props.disabled ? '' : undefined}
          >
            <label
              for={id}
              class="text-sm font-medium select-none data-invalid:text-destructive"
              data-invalid={field.errors}
            >
              {props.label}
            </label>

            <div
              class={cx(
                'relative min-h-24 flex flex-col items-center justify-center gap-2 dark:bg-input/30',
                'border-2 border-dashed border-input rounded-md data-invalid:border-destructive p-2 data-invalid:text-destructive',
              )}
              data-invalid={field.errors}
            >
              <div>{props.placeholder || 'Drop'}</div>
              <input
                type="file"
                id={id}
                class="absolute inset-0 opacity-0 z-1 cursor-pointer"
                onChange={async (e) => {
                  if (!e.target.files?.length) return

                  const base64Strings = await createBase64Strings(e.target.files)
                  if (!base64Strings) return

                  if (props.multiple) {
                    const current = field.input as string[] | undefined
                    const newFiles = [...(current || []), ...base64Strings.map((s) => s.base64)]
                    setCreated((prev) => [...prev, ...base64Strings])
                    field.onInput(newFiles as TFieldDropzone<TSchema, TFieldPath>)
                  } else {
                    setCreated(base64Strings)
                    field.onInput(base64Strings[0].base64 as TFieldDropzone<TSchema, TFieldPath>)
                  }

                  e.target.value = ''
                }}
                multiple={props.multiple}
              />
            </div>

            <Show when={created().length}>
              <div class={cx('grid gap-2', props.columns === 2 ? 'md:grid-cols-2' : 'grid-cols-1')}>
                <For each={created()}>
                  {(file, f) => (
                    <div class="flex justify-between items-center gap-2 text-xs data-disabled:opacity-50">
                      <span class="w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        {file.filename}
                      </span>
                      <Show when={!props.disabled}>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => {
                            const index = f()

                            setCreated((prev) => prev.filter((_, i) => i !== index))

                            if (props.multiple) {
                              const current = field.input as string[]
                              field.onInput(
                                current.filter((_, i) => i !== index) as TFieldDropzone<
                                  TSchema,
                                  TFieldPath
                                >,
                              )
                            } else {
                              field.onInput('' as TFieldDropzone<TSchema, TFieldPath>)
                            }
                          }}
                        >
                          <span class="icon-[lucide--x] text-destructive text-base"></span>
                        </Button>
                      </Show>
                    </div>
                  )}
                </For>
              </div>
            </Show>

            <Show when={field.errors}>
              <div class="text-destructive text-xs data-disabled:opacity-50">
                {field.errors?.[0]}
              </div>
            </Show>
          </div>
        )
      }}
    </Field>
  )
}
