'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Grid2x2Plus } from 'lucide-react'

import { ButtonLoading } from '@/components/ui/button'
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
import { ITask, ItemTaskFormType, TaskLabelEnum } from '@/types/tasks'
import { ItemTaskSchema } from '@/schemas/task.schema'
import { labelsData } from '@/data/labels'
import useAuth from '@/hooks/use-auth'

const defaultValues = {
  title: '',
  description: '',
  label: 'Personal',
}

const TaskboardUpdateTaskSidebar = () => {
  const {
    taskState,
    itemUpdateTaskSidebarIsOpen,
    setItemUpdateTaskSidebarIsOpen,
    handleUpdateTask,
    handleSelectTask,
  } = useTaskContext()
  const { user } = useAuth()

  const form = useForm<ItemTaskFormType>({
    resolver: zodResolver(ItemTaskSchema),
    defaultValues,
  })

  const { selectedTask } = taskState
  const { isSubmitting, isDirty } = form.formState
  const isDisabled = isSubmitting || !isDirty

  useEffect(() => {
    if (selectedTask) {
      form.reset({
        title: selectedTask?.title,
        description: selectedTask?.description,
        label: selectedTask?.label,
      })
    }
  }, [selectedTask, form])

  function onSubmit(data: ItemTaskFormType) {
    if (selectedTask) {
      const newTask: ITask = {
        ...data,
        id: selectedTask.id,
        columnId: selectedTask.columnId,
        status: selectedTask.status,
        label: data.label as TaskLabelEnum,
        userId: user?._id || '',
        user,
      }
      handleUpdateTask(newTask)
    }

    handleSidebarClose()
  }

  const handleSidebarClose = () => {
    form.reset(defaultValues)
    handleSelectTask(undefined)
    setItemUpdateTaskSidebarIsOpen(false)
  }

  return (
    <Sheet
      open={itemUpdateTaskSidebarIsOpen}
      onOpenChange={() => handleSidebarClose()}
    >
      <SheetContent className="p-0" side="right">
        <ScrollArea className="h-full p-4">
          <SheetHeader>
            <SheetTitle>Update Task</SheetTitle>
            <SheetDescription>
              Modify the details of the {selectedTask?.title} task.
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
                render={({ field }) => (
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {labelsData.map((label) => (
                          <SelectItem key={label.id} value={label.name}>
                            {label.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Event description"
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

export default TaskboardUpdateTaskSidebar
