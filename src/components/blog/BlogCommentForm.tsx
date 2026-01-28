"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast, Toaster } from "sonner"

interface BlogCommentFormProps {
    postSlug?: string
}

export function BlogCommentForm({ postSlug }: BlogCommentFormProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [comment, setComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    comment,
                    postSlug,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            // Reset form
            setName("")
            setEmail("")
            setComment("")

            // Show success toast with refresh notice
            toast.success("Komentar berhasil dikirim!", {
                description: "Halaman akan di-refresh dalam 2 detik...",
                duration: 2500,
            });

            // Auto refresh page after 2 seconds for SEO-safe comments display
            console.log("Scheduling page refresh...");
            setTimeout(() => {
                console.log("Refreshing page now...");
                window.location.href = window.location.href;
            }, 2500);

        } catch (error) {
            console.error("Error submitting comment:", error);
            toast.error("Gagal mengirim komentar", {
                description: "Silakan coba lagi dalam beberapa saat.",
                duration: 5000,
            });
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Toaster
                position="top-right"
                richColors
                closeButton
            />
            <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm mb-10">
                <h4 className="text-lg font-semibold mb-4">Tinggalkan Balasan</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nama Lengkap"
                            required
                            className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600"
                        />
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Anda"
                            required
                            className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600"
                        />
                    </div>
                    <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tulis komentar Anda..."
                        rows={4}
                        required
                        className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600"
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90 text-white"
                    >
                        {isSubmitting ? "Mengirim..." : "Kirim Komentar"}
                    </Button>
                </form>
            </div>
        </>
    )
}

export default BlogCommentForm
