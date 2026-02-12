"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateHeroBackground } from "@/actions/settings";
import { toast } from "sonner";
import { Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";
import type { SiteSettingsRow } from "@/types";

export function SettingsForm({ initialData }: { initialData?: SiteSettingsRow | null }) {
    const [loading, setLoading] = useState(false);
    const [bgUrl, setBgUrl] = useState(initialData?.heroBackgroundImageUrl || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateHeroBackground(bgUrl);
            toast.success("Settings updated successfully");
        } catch (error) {
            toast.error("Failed to update settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="heroBg">Hero Background Image URL</Label>
                    <div className="flex gap-2">
                        <Input
                            id="heroBg"
                            value={bgUrl}
                            onChange={(e) => setBgUrl(e.target.value)}
                            placeholder="https://example.com/banner.jpg"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Provide a direct link to an image. Recommended size: 1920x1080.
                    </p>
                </div>

                {bgUrl && (
                    <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
                        <Image
                            src={bgUrl}
                            alt="Background preview"
                            fill
                            className="object-cover"
                            onError={() => toast.error("Invalid image URL or image cannot be loaded")}
                        />
                    </div>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Settings
            </Button>
        </form>
    );
}
