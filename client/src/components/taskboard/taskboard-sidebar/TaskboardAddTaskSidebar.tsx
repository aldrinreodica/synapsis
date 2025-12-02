'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Grid2x2Plus } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useTaskContext } from '@/hooks/use-task'
import { ButtonLoading } from '@/components/ui/button'
import { labelsData } from '@/data/labels'
import { ItemTaskFormType } from '@/types/tasks'
import { ItemTaskSchema } from '@/schemas/task.schema'
import useAuth from '@/hooks/use-auth'

const defaultValues = {
  title: '',
  description: '',
  label: 'Personal',
}

const TaskboardAddTaskSidebar = () => {
  const {
    taskState,
    itemAddTaskSidebarIsOpen,
    setItemAddTaskSidebarIsOpen,
    handleAddTask,
    handleSelectTask,
  } = useTaskContext()
  const { user } = useAuth()

  const form = useForm<ItemTaskFormType>({
    resolver: zodResolver(ItemTaskSchema),
    defaultValues,
  })

  const { selectedColumn } = taskState
  const { isSubmitting, isDirty } = form.formState
  const isDisabled = isSubmitting || !isDirty

  function onSubmit(data: any) {
    if (selectedColumn) {
      handleAddTask(data, selectedColumn.id, user?._id)
    }

    handleSidebarClose()
  }

  const handleSidebarClose = () => {
    form.reset(defaultValues)
    handleSelectTask(undefined)
    setItemAddTaskSidebarIsOpen(false)
  }

  const labelOptions = useMemo(
    () =>
      labelsData.map((label) => (
        <SelectItem key={label.id} value={label.name}>
          {label.name}
        </SelectItem>
      )),
    []
  )

  return (
    <Sheet
      open={itemAddTaskSidebarIsOpen}
      onOpenChange={() => handleSidebarClose()}
    >
      <SheetContent className="p-0" side="right">
        <ScrollArea className="h-full p-4">
          <SheetHeader>
            <SheetTitle>Add New Task</SheetTitle>
            <SheetDescription>
              Add a new task to the {selectedColumn?.title} column.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-y-3 mt-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.name}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>{labelOptions}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Task description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ButtonLoading
                isLoading={isSubmitting}
                disabled={isDisabled}
                className="w-full"
                icon={Grid2x2Plus}
              >
                Save
              </ButtonLoading>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default TaskboardAddTaskSidebar
