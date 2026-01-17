"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Briefcase,
    MapPin,
    FileText,
    Clock,
} from "lucide-react"
import api from "@/lib/axios"
import { toast } from "react-hot-toast"

type AddJobProps = {
    onSuccess?: () => void
    initialData?: any
    mode?: "add" | "edit" | "view"
}

export default function AddJob({ onSuccess, initialData, mode = "add" }: AddJobProps) {
    const isView = mode === "view"
    const isEdit = mode === "edit"

    const [formData, setFormData] = useState({
        job_title: initialData?.title || "",
        type: initialData?.type || "Full-time",
        location: initialData?.location || "",
        description: initialData?.description || "",
    })

    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (initialData) {
            setFormData({
                job_title: initialData.title || "",
                type: initialData.type || "Full-time",
                location: initialData.location || "",
                description: initialData.description || "",
            })
        }
    }, [initialData])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSelectChange = (value: string) => {
        setFormData({ ...formData, type: value })
    }

    const handleSubmit = async () => {
        if (!formData.job_title || !formData.type || !formData.description) {
            toast.error("Please fill in all required fields")
            return
        }

        try {
            setSubmitting(true)

            let response;
            if (isEdit) {
                response = await api.put(`/api/jobs/update/${initialData.id}`, formData)
            } else {
                response = await api.post("/api/jobs/add", formData)
            }

            if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
                toast.success(response.data.message || (isEdit ? "Job updated" : "Job posted"))
                onSuccess?.()
            } else {
                toast.error(response.data.message || "Operation failed")
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="w-full px-1">
            <div className="pb-4 mb-6 border-b">
                <h2 className="text-2xl font-semibold">
                    {isView ? "Job Details" : isEdit ? "Update Job" : "Create New Job"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    {isView ? "Information about this job opening" : "Fill in the details below to manage the job listing"}
                </p>
            </div>

            <div className="space-y-6 pb-4">
                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Job Title
                    </Label>
                    <Input
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleChange}
                        readOnly={isView}
                        placeholder="e.g. Senior Software Engineer"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Job Type
                        </Label>
                        <Select
                            value={formData.type}
                            onValueChange={handleSelectChange}
                            disabled={isView}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Full-time">Full-time</SelectItem>
                                <SelectItem value="Part-time">Part-time</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="Internship">Internship</SelectItem>
                                <SelectItem value="Freelance">Freelance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Location
                        </Label>
                        <Input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            readOnly={isView}
                            placeholder="e.g. Remote, Nairobi, etc."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Description
                    </Label>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        readOnly={isView}
                        className="min-h-[200px]"
                        placeholder="Describe the roles, responsibilities, and requirements..."
                    />
                </div>

                <div className="pt-4 border-t flex justify-end gap-3">
                    {!isView ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setFormData({
                                        job_title: initialData?.title || "",
                                        type: initialData?.type || "Full-time",
                                        location: initialData?.location || "",
                                        description: initialData?.description || "",
                                    })
                                }}
                                disabled={submitting}
                            >
                                Reset
                            </Button>

                            <Button
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {submitting ? "Processing..." : isEdit ? "Update Job" : "Create Job"}
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" onClick={onSuccess}>Close</Button>
                    )}
                </div>
            </div>
        </div>
    )
}
