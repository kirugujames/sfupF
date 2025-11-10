"use client"
import { AppSidebar, DocumentItem, NavItem } from "@/components/app-sidebar"
import { DataTable } from "@/components/my-data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { documents, navMain, navSecondary, user } from "../../dashboard/nav-items"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
type EventFormData = {
  event_type: string;
  title: string;
  sub_title: string;
  event_date: string;
  from_time: string;
  to_time: string;
  location: string;
  description: string;
  image: FileList;
};
export default function Page() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ]

  const data = [
    { id: 1, name: "Becky", email: "becky@example.com" },
    { id: 2, name: "James", email: "james@example.com" },
    { id: 3, name: "Mary", email: "mary@example.com" },
    { id: 4, name: "David", email: "david@example.com" },
    { id: 5, name: "Ann", email: "ann@example.com" },
    { id: 6, name: "George", email: "george@example.com" },
  ]

  const handleView = (row: any) => alert(`Viewing ${row.name}`)
  const handleEdit = (row: any) => alert(`Editing ${row.name}`)
  const handleDelete = (row: any) => alert(`Deleting ${row.name}`)
  const { register, handleSubmit, control, reset } = useForm<EventFormData>();

  const onSubmit = (data: EventFormData) => {
    if (data.image && data.image.length > 0) {
      const file = data.image[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        const finalData = { ...data, image: base64Image };
        console.log(finalData);
      };
      reader.readAsDataURL(file);
    } else {
      console.log(data);
    }
  };
  const datas = [
    {
      title: "Total Events",
      value: 2000
    },
    {
      title: "Total Booked Events",
      value: 2000
    },
    {
      title: "Total Approved Events",
      value: 2000
    }
    , {
      title: "Total Past Events",
      value: 2000
    }
  ]
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        navItems={navMain}
        documents={documents}
        user={user}
        navSecondary={navSecondary}
      />
      <SidebarInset>
        <SiteHeader title="Events" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards data={datas} />
              <div className="px-4 lg:px-6">
                <div className="flex justify-between">
                  <div className="flex w-full flex-col gap-6">
                    <Tabs defaultValue="allEvents" className="w-full bg-black-600">
                      <TabsList>
                        <TabsTrigger value="allEvents">All Events</TabsTrigger>
                        <TabsTrigger value="newEvent">New Event</TabsTrigger>
                        <TabsTrigger value="bookedEvents">Booked Events</TabsTrigger>
                      </TabsList>
                      <TabsContent value="allEvents" className="w-full">
                        <DataTable
                          title="Users"
                          columns={columns}
                          data={data}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      </TabsContent>
                      <TabsContent value="bookedEvents">
                        <DataTable
                          title="Users"
                          columns={columns}
                          data={data}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      </TabsContent>
                      <TabsContent value="newEvent">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  p-4 bg-white rounded-lg shadow">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/2">
                              <Label className="mb-2">Event Type</Label>
                              <Input className="" {...register("event_type", { required: true })} placeholder="Event Type" />
                            </div>

                            <div className="md:w-1/2">
                              <Label className="mb-2">Title</Label>
                              <Input className="" {...register("title", { required: true })} placeholder="Event Title" />
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/2">
                              <Label className="mb-2">Sub Title</Label>
                              <Input className="" {...register("sub_title")} placeholder="Event Subtitle" />
                            </div>
                            <div className="md:w-1/2 flex flex-col gap-3">
                              <Label htmlFor="date" className="px-1">
                                Date of birth
                              </Label>
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    id="date"
                                    className="w-full justify-between font-normal"
                                  >
                                    {date ? date.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                      setDate(date);
                                      setOpen(false);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                          <div className="flex md:flex-row flex-col gap-4">
                            <div className="md:w-1/2">
                              <Label className="mb-2">From Time</Label>
                              <Input className="" type="time" {...register("from_time", { required: true })} />
                            </div>
                            <div className="md:w-1/2">
                              <Label className="mb-2">To Time</Label>
                              <Input className="" type="time" {...register("to_time", { required: true })} />
                            </div>
                          </div>
                          <div className="flex md:flex-row flex-col gap-4">
                            <div className="md:w-1/2">
                              <Label className="mb-2">Location</Label>
                              <Input className="" {...register("location")} placeholder="Event Location" />
                            </div>
                            <div className="md:w-1/2">
                              <Label className="mb-2">Image</Label>
                              <Input className="" type="file" {...register("image")} accept="image/*" />
                            </div>
                          </div>
                          <div className="md:w-1/2">
                            <Label className="mb-2">Description</Label>
                            <Textarea {...register("description")} placeholder="Event Description" rows={4} />
                          </div>
                          <Button className="md:w-[200px] w-1/2">Button</Button>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
