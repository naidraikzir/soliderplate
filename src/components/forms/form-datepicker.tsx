import {
  Field,
  type FieldStore,
  type FormStore,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/solid'
import dayjs from 'dayjs'
import { createSignal, createUniqueId, Index, type JSX, Show } from 'solid-js'
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
  TRange extends boolean,
> = {
  of: FormStore<TSchema>
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>
  format?: string
  class?: string
  label?: JSX.Element
  placeholder?: string
  range?: TRange
  disabled?: boolean
}

type TFieldInput<TSchema extends Schema, TFieldPath extends RequiredPath> = FieldStore<
  TSchema,
  TFieldPath
>['input']

export function FormDatePicker<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
  TRange extends boolean = false,
>(props: TFormDatePickerProps<TSchema, TFieldPath, TRange>) {
  const mergedFormat = () => props.format || 'DD/MM/YYYY'
  const id = `datepicker-${createUniqueId()}`
  const [errors, setErrors] = createSignal<string[]>()

  const [isOpen, setIsOpen] = createSignal(false)
  const [range, setRange] = createSignal<[Date | null, Date | null]>([null, null])
  const [previousRange, setPreviousRange] = createSignal<[Date | null, Date | null]>([null, null])
  const from = () => range()[0]
  const to = () => range()[1]

  function handleRangeChange(
    newRange: { from: Date | null; to: Date | null },
    callback: () => void,
  ) {
    setRange([newRange.from, newRange.to])
    if (newRange.from && newRange.to) {
      setPreviousRange([newRange.from, newRange.to])
      setIsOpen(false)
    }
    callback()
  }

  return (
    <div class={props.class}>
      <div class="grid w-full gap-2">
        <label
          for={id}
          class="text-sm font-medium select-none data-disabled:opacity-50 data-invalid:text-destructive"
          data-disabled={props.disabled ? '' : undefined}
          data-invalid={errors()}
        >
          {props.label}
        </label>

        <Field of={props.of} path={props.path}>
          {(field) => {
            setErrors(field.errors ?? undefined)

            return (
              <Show
                when={props.range}
                fallback={
                  <Calendar
                    mode="single"
                    value={field.input ? new Date(field.input as string) : null}
                    onValueChange={(value) => {
                      field.onInput(
                        (value?.toISOString() ?? '') as TFieldInput<TSchema, TFieldPath>,
                      )
                      setIsOpen(false)
                    }}
                  >
                    {(calendar) => (
                      <Popover open={isOpen()} onOpenChange={setIsOpen}>
                        <Trigger
                          id={id}
                          disabled={props.disabled}
                          invalid={errors()}
                          placeholder={props.placeholder || mergedFormat()}
                          placeholderShown={!!calendar.value}
                          value={dayjs(calendar.value).format(mergedFormat())}
                        />
                        <PopoverPortal>
                          <PopoverContent class="w-auto p-0">
                            <div class="flex flex-col gap-4 rounded-md p-3 shadow-sm">
                              <div class="relative flex w-full items-center justify-between">
                                <CalendarNav
                                  action="prev-month"
                                  aria-label="Go to previous month"
                                />
                                <CalendarLabel>
                                  {dayjs(calendar.month).format('MMMM')}{' '}
                                  {calendar.month.getFullYear()}
                                </CalendarLabel>
                                <CalendarNav action="next-month" aria-label="Go to next month" />
                              </div>
                              <Cells
                                weekdays={calendar.weekdays}
                                weeks={calendar.weeks}
                                month={calendar.month}
                              />
                            </div>
                          </PopoverContent>
                        </PopoverPortal>
                      </Popover>
                    )}
                  </Calendar>
                }
              >
                <Calendar
                  mode="range"
                  numberOfMonths={2}
                  value={{ from: from(), to: to() }}
                  onValueChange={(value) =>
                    handleRangeChange(value, () =>
                      field.onInput({
                        from: from()?.toISOString() ?? '',
                        to: to()?.toISOString() ?? '',
                      } as TFieldInput<TSchema, TFieldPath>),
                    )
                  }
                >
                  {(calendar) => (
                    <Popover
                      open={isOpen()}
                      onOpenChange={(open) => {
                        if (!open && from() && !to()) {
                          const prev = previousRange()
                          setRange(prev)
                          field.onInput({
                            from: prev[0]?.toISOString() ?? '',
                            to: prev[1]?.toISOString() ?? '',
                          } as TFieldInput<TSchema, TFieldPath>)
                        } else {
                          setIsOpen(open)
                        }
                      }}
                    >
                      <Trigger
                        id={id}
                        disabled={props.disabled}
                        invalid={errors()}
                        placeholder={props.placeholder || mergedFormat()}
                        placeholderShown={!!(calendar.value.from && calendar.value.to)}
                        value={`${dayjs(calendar.value.from!).format(mergedFormat())} - ${dayjs(calendar.value.to!).format(mergedFormat())}`}
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
                                    <Cells
                                      index={index}
                                      weekdays={calendar.weekdays}
                                      weeks={month().weeks}
                                      month={month().month}
                                    />
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
              </Show>
            )
          }}
        </Field>

        <Show when={errors()}>
          <div
            class="text-destructive text-xs data-disabled:opacity-50"
            data-disabled={props.disabled ? '' : undefined}
          >
            {errors()?.[0]}
          </div>
        </Show>
      </div>
    </div>
  )
}

function Trigger(props: {
  id: string
  disabled?: boolean
  invalid?: string[]
  placeholder?: string
  placeholderShown: boolean
  value: string
}) {
  return (
    <PopoverTrigger<typeof Button>
      as={(triggerProps) => (
        <Button
          variant="outline"
          id={props.id}
          class="justify-between font-normal text-xs text-left data-disabled:opacity-50 data-invalid:border-destructive dark:data-invalid:border-destructive"
          data-disabled={props.disabled ? '' : undefined}
          data-invalid={props.invalid}
          {...triggerProps}
        >
          <span class="icon-[lucide--calendar] text-muted-foreground text-base"></span>
          <div class="grow mt-0.5">
            <Show
              when={props.placeholderShown}
              fallback={<span class="text-muted-foreground">{props.placeholder}</span>}
            >
              {props.value}
            </Show>
          </div>
        </Button>
      )}
    />
  )
}

function Cells(props: { index?: number; weekdays: Date[]; weeks: Date[][]; month: Date }) {
  return (
    <CalendarTable index={props.index}>
      <thead>
        <tr class="flex">
          <Index each={props.weekdays}>
            {(weekday) => (
              <CalendarHeadCell abbr={dayjs(weekday()).format('dddd')}>
                {dayjs(weekday()).format('ddd')}
              </CalendarHeadCell>
            )}
          </Index>
        </tr>
      </thead>
      <tbody>
        <Index each={props.weeks}>
          {(week) => (
            <tr class="mt-2 flex w-full">
              <Index each={week()}>
                {(day) => (
                  <CalendarCell>
                    <CalendarCellTrigger
                      day={day()}
                      month={props.month}
                      class="h-6 dark:data-today:focus-visible:ring-ring/50"
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
  )
}
