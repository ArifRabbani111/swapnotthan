"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    UnderlineIcon,
    Link2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="border rounded-md overflow-hidden bg-background ring-offset-background focus-within:ring-1 focus-within:ring-ring">
            <div className="flex flex-wrap gap-1 p-1 bg-muted/50 border-b">
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn(editor.isActive("bold") && "bg-muted")}
                >
                    <Bold size={16} />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn(editor.isActive("italic") && "bg-muted")}
                >
                    <Italic size={16} />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={cn(editor.isActive("underline") && "bg-muted")}
                >
                    <UnderlineIcon size={16} />
                </Button>
                <div className="w-px h-6 bg-border mx-1 my-1" />
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={cn(editor.isActive("bulletList") && "bg-muted")}
                >
                    <List size={16} />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={cn(editor.isActive("orderedList") && "bg-muted")}
                >
                    <ListOrdered size={16} />
                </Button>
                <div className="w-px h-6 bg-border mx-1 my-1" />
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={cn(editor.isActive("blockquote") && "bg-muted")}
                >
                    <Quote size={16} />
                </Button>
            </div>
            <EditorContent
                editor={editor}
                className="prose prose-sm max-w-none p-4 min-h-[150px] focus:outline-none"
            />
        </div>
    );
}
