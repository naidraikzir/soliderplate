import {
  Field,
  type FieldStore,
  type FormStore,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/solid'
import dayjs from 'dayjs'
import { createUniqueId, Index, type JSX, Show } from 'solid-js'
import * as v from 'valibot'

import { Button } from '@/components/ui/button'
import {
  Calendar,
  CalendarCell,
  CalendarCellTrigger,
  CalendarHeadCell,
  CalendarLabel,
  CalendarNav,
  CalendarTable,
} from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '@/components/ui/popover'

type TFormDatePickerProps<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
  TMultiple extends boolean,
> = {
  of: FormStore<TSchema>
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>
  format?: string
  class?: string
  label?: JSX.Element
  description?: string
  placeholder?: string
  multiple?: TMultiple
  disabled?: boolean
}

type FieldInputType<TSchema extends Schema, TFieldPath extends RequiredPath> = FieldStore<
  TSchema,
  TFieldPath
>['input']

export function FormDatePicker<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
  TMultiple extends boolean = false,
>(props: TFormDatePickerProps<TSchema, TFieldPath, TMultiple>) {
  const mergedFormat = () => props.format || 'DD/MM/YYYY'
  const id = `datepicker-${createUniqueId()}`

  return (
    <Field of={props.of} path={props.path}>
      {(field) => (
        <Show
          when={props.multiple}
          fallback={
            <div class={props.class}>
              <div class="grid w-full gap-2">
                <label
                  for={id}
                  class="text-sm font-medium select-none data-disabled:opacity-50 data-invalid:text-destructive"
                  data-disabled={props.disabled ? '' : undefined}
                  data-invalid={field.errors}
                >
                  {props.label}
                </label>

                <Calendar
                  mode="single"
                  value={field.input ? new Date(field.input as string) : undefined}
                  onValueChange={(value) => {
                    const dateStr = value?.toISOString() ?? ''
                    field.onInput(dateStr as FieldInputType<TSchema, TFieldPath>)
                  }}
                >
                  {(calendar) => (
                    <Popover>
                      <PopoverTrigger<typeof Button>
                        as={(triggerProps) => (
                          <Button
                            variant="outline"
                            id={id}
                            class="justify-between font-normal text-xs text-left data-disabled:opacity-50 data-invalid:border-destructive"
                            data-disabled={props.disabled ? '' : undefined}
                            data-invalid={field.errors}
                            {...triggerProps}
                          >
                            <span class="icon-[lucide--calendar] text-muted-foreground text-base"></span>
                            <div class="grow">
                              <Show
                                when={calendar.value}
                                fallback={
                                  <span class="text-muted-foreground">
                                    {props.placeholder || mergedFormat()}
                                  </span>
                                }
                              >
                                {dayjs(calendar.value).format(mergedFormat())}
                              </Show>
                            </div>
                          </Button>
                        )}
                      />
                      <PopoverPortal>
                        <PopoverContent class="w-auto p-0">
                          <div class="flex flex-col gap-4 rounded-md p-3 shadow-sm">
                            <div class="relative flex w-full items-center justify-between">
                              <CalendarNav action="prev-month" aria-label="Go to previous month" />
                              <CalendarLabel>
                                {dayjs(calendar.month).format('MMMM')}{' '}
                                {calendar.month.getFullYear()}
                              </CalendarLabel>
                              <CalendarNav action="next-month" aria-label="Go to next month" />
                            </div>
                            <CalendarTable>
                              <thead>
                                <tr class="flex">
                                  <Index each={calendar.weekdays}>
                                    {(weekday) => (
                                      <CalendarHeadCell abbr={dayjs(weekday()).format('dddd')}>
                                        {dayjs(weekday()).format('ddd')}
                                      </CalendarHeadCell>
                                    )}
                                  </Index>
                                </tr>
                              </thead>
                              <tbody>
                                <Index each={calendar.weeks}>
                                  {(week) => (
                                    <tr class="mt-2 flex w-full">
                                      <Index each={week()}>
                                        {(day) => (
                                          <CalendarCell>
                                            <CalendarCellTrigger
                                              day={day()}
                                              class="dark:data-today:focus-visible:ring-ring/50"
                                            >
                                              {day().getDate()}
                                            </CalendarCellTrigger>
                                          </CalendarCell>
                                        )}
                                      </Index>
                                    </tr>
                                  )}
                                </Index>
                              </tbody>
                            </CalendarTable>
                          </div>
                        </PopoverContent>
                      </PopoverPortal>
                    </Popover>
                  )}
                </Calendar>

                <Show when={props.description}>
                  <p class="text-muted-foreground text-xs">{props.description}</p>
                </Show>
                <Show when={field.errors}>
                  <div class="text-destructive text-xs">{field.errors?.[0]}</div>
                </Show>
              </div>
            </div>
          }
        >
          <div class={props.class}>
            <div class="grid w-full gap-2">
              <label
                for={id}
                class="text-sm font-medium select-none data-disabled:opacity-50 data-invalid:text-destructive"
                data-disabled={props.disabled ? '' : undefined}
                data-invalid={field.errors}
              >
                {props.label}
              </label>

              <Calendar
                mode="range"
                numberOfMonths={2}
                value={{
                  from: (field.input as string[])?.[0]
                    ? new Date((field.input as string[])[0])
                    : null,
                  to: (field.input as string[])?.[1]
                    ? new Date((field.input as string[])[1])
                    : null,
                }}
                onValueChange={(value) => {
                  const from = value.from?.toISOString() ?? ''
                  const to = value.to?.toISOString() ?? ''
                  field.onInput([from, to] as FieldInputType<TSchema, TFieldPath>)
                }}
              >
                {(calendar) => (
                  <Popover>
                    <PopoverTrigger<typeof Button>
                      as={(triggerProps) => (
                        <Button
                          variant="outline"
                          id={id}
                          class="justify-between font-normal text-xs text-left data-disabled:opacity-50 data-invalid:border-destructive"
                          data-disabled={props.disabled ? '' : undefined}
                          data-invalid={field.errors}
                          {...triggerProps}
                        >
                          <span class="icon-[lucide--calendar] text-muted-foreground text-base"></span>
                          <span class="grow overflow-x-hidden">
                            <Show
                              when={calendar.value.from && calendar.value.to}
                              fallback={
                                <span class="text-muted-foreground">
                                  {props.placeholder || mergedFormat()}
                                </span>
                              }
                            >
                              {dayjs(calendar.value.from!).format(mergedFormat())} -{' '}
                              {dayjs(calendar.value.to!).format(mergedFormat())}
                            </Show>
                          </span>
                        </Button>
                      )}
                    />
                    <PopoverPortal>
                      <PopoverContent class="w-auto p-0">
                        <div class="rounded-md p-3 shadow-sm">
                          <div class="relative w-full">
                            <CalendarNav
                              action="prev-month"
                              class="absolute top-0.5 md:top-0 left-1 size-6 md:size-7"
                              aria-label="Go to previous month"
                            />
                            <CalendarNav
                              action="next-month"
                              class="absolute top-0.5 md:top-0 right-1 size-6 md:size-7"
                              aria-label="Go to next month"
                            />
                          </div>
                          <div class="space-y-4 md:flex md:space-y-0 md:space-x-4">
                            <Index each={calendar.months}>
                              {(month, index) => (
                                <div class="flex flex-col gap-2 md:gap-4">
                                  <div class="flex h-7 items-center justify-center">
                                    <CalendarLabel index={index}>
                                      {dayjs(month().month).format('MMMM')}{' '}
                                      {month().month.getFullYear()}
                                    </CalendarLabel>
                                  </div>
                                  <CalendarTable index={index}>
                                    <thead>
                                      <tr class="flex">
                                        <Index each={calendar.weekdays}>
                                          {(weekday) => (
                                            <CalendarHeadCell
                                              abbr={dayjs(weekday()).format('dddd')}
                                            >
                                              {dayjs(weekday()).format('ddd')}
                                            </CalendarHeadCell>
                                          )}
                                        </Index>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <Index each={month().weeks}>
                                        {(week) => (
                                          <tr class="mt-2 flex w-full">
                                            <Index each={week()}>
                                              {(day) => (
                                                <CalendarCell>
                                                  <CalendarCellTrigger
                                                    day={day()}
                                                    month={month().month}
                                                    class="h-6 md:h-8 dark:data-today:focus-visible:ring-ring/50"
                                                  >
                                                    {day().getDate()}
                                                  </CalendarCellTrigger>
                                                </CalendarCell>
                                              )}
                                            </Index>
                                          </tr>
                                        )}
                                      </Index>
                                    </tbody>
                                  </CalendarTable>
                                </div>
                              )}
                            </Index>
                          </div>
                        </div>
                      </PopoverContent>
                    </PopoverPortal>
                  </Popover>
                )}
              </Calendar>

              <Show when={props.description}>
                <p class="text-muted-foreground text-xs">{props.description}</p>
              </Show>
              <Show when={field.errors}>
                <div class="text-destructive text-xs">{field.errors?.[0]}</div>
              </Show>
            </div>
          </div>
        </Show>
      )}
    </Field>
  )
}
