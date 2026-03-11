import type { FieldStore } from '@formisch/solid'
import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-solid'
import {
  createEffect,
  createSignal,
  createUniqueId,
  Index,
  type JSX,
  mergeProps,
  Show,
} from 'solid-js'

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

type TBaseProps = {
  format?: string
  class?: string
  label?: JSX.Element
  placeholder?: string
  errors?: FieldStore['errors'] | null
  disabled?: boolean
}

type TSingleValue = Date | null

interface ISingleProps extends TBaseProps {
  range?: false
  value?: TSingleValue
  onChange: (value: TSingleValue) => void
}

type TRangeValue = [TSingleValue, TSingleValue]

interface IRangeProps extends TBaseProps {
  range: true
  value: TRangeValue
  onChange: (value: TRangeValue) => void
}

export type TFormDatePickerProps = ISingleProps | IRangeProps

export function FormDatePicker(props: TFormDatePickerProps) {
  const merged = mergeProps({ format: 'DD/MM/YYYY' }, props)
  const id = `datepicker-${createUniqueId()}`

  return (
    <div class={props.class}>
      <div class="grid w-full gap-2">
        <label
          for={id}
          class="text-sm font-medium select-none data-disabled:opacity-50 data-invalid:text-destructive"
          data-disabled={props.disabled ? '' : undefined}
          data-invalid={props.errors}
        >
          {props.label}
        </label>

        <Show
          when={props.range === true}
          fallback={<SingleDatePicker {...(merged as ISingleProps)} id={id} />}
        >
          <RangeDatePicker {...(merged as IRangeProps)} id={id} />
        </Show>

        <Show when={props.errors}>
          <div class="text-destructive text-xs">{props.errors?.[0]}</div>
        </Show>
      </div>
    </div>
  )
}

function SingleDatePicker(props: ISingleProps & { id: string }) {
  const [open, setOpen] = createSignal(false)

  return (
    <Calendar
      mode="single"
      value={props.value}
      onValueChange={(value) => {
        setOpen(false)
        props.onChange(value)
      }}
    >
      {(calendar) => (
        <Popover open={open()} onOpenChange={setOpen}>
          <PopoverTrigger<typeof Button>
            as={(triggerProps) => (
              <Button
                variant="outline"
                id={props.id}
                class="justify-between font-normal text-xs text-left data-disabled:opacity-50 data-invalid:border-destructive"
                data-disabled={props.disabled ? '' : undefined}
                data-invalid={props.errors}
                {...triggerProps}
              >
                <CalendarIcon class="text-muted-foreground" />
                <div class="grow">
                  <Show
                    when={calendar.value}
                    fallback={
                      <span class="text-muted-foreground">{props.placeholder || props.format}</span>
                    }
                  >
                    {dayjs(calendar.value).format(props.format)}
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
                    {dayjs(calendar.month).format('MMMM')} {calendar.month.getFullYear()}
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
  )
}

function RangeDatePicker(props: IRangeProps & { id: string }) {
  const [internalValue, setInternalValue] = createSignal(props.value)
  const from = () => internalValue()[0]
  const to = () => internalValue()[1]

  createEffect(() => {
    setInternalValue(props.value)
  })

  function handleValueChange(newRange: { from: TSingleValue; to: TSingleValue }) {
    setInternalValue([newRange.from, newRange.to])

    if (newRange.from && newRange.to) {
      props.onChange([newRange.from, newRange.to])
    }
  }

  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      value={{ from: from(), to: to() }}
      onValueChange={handleValueChange}
    >
      {(calendar) => (
        <Popover>
          <PopoverTrigger<typeof Button>
            as={(triggerProps) => (
              <Button
                variant="outline"
                id={props.id}
                class="justify-between font-normal text-xs text-left data-disabled:opacity-50 data-invalid:border-destructive"
                data-disabled={props.disabled ? '' : undefined}
                data-invalid={props.errors}
                {...triggerProps}
              >
                <CalendarIcon class="text-muted-foreground" />
                <span class="grow overflow-x-hidden">
                  <Show
                    when={calendar.value.from && calendar.value.to}
                    fallback={
                      <span class="text-muted-foreground">{props.placeholder || props.format}</span>
                    }
                  >
                    {dayjs(calendar.value.from!).format(props.format)} -{' '}
                    {dayjs(calendar.value.to!).format(props.format)}
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
                            {dayjs(month().month).format('MMMM')} {month().month.getFullYear()}
                          </CalendarLabel>
                        </div>
                        <CalendarTable index={index}>
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
  )
}
