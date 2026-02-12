"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isConnectionError =
    error.message?.toLowerCase().includes("connection") ||
    error.message?.toLowerCase().includes("econnrefused") ||
    error.message?.toLowerCase().includes("connect econnrefused") ||
    error.message?.toLowerCase().includes("database");
  const isInternalError =
    error.message?.toLowerCase().includes("internal") ||
    error.message?.toLowerCase().includes("500");

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-6 w-6" />
            <CardTitle>Something went wrong</CardTitle>
          </div>
          <CardDescription>
            {isConnectionError ? (
              <>
                Database connection failed. To fix this:
                <ol className="list-decimal list-inside mt-2 space-y-1 text-left">
                  <li>Create <code className="bg-muted px-1 rounded">frontend/.env.local</code></li>
                  <li>Add <code className="bg-muted px-1 rounded">DATABASE_URL=postgresql://user:password@host:5432/dbname</code></li>
                  <li>Use a local PostgreSQL or a cloud DB (Neon, Supabase, Vercel Postgres)</li>
                </ol>
              </>
            ) : isInternalError ? (
              <>
                A server error occurred. The app can run without a database—ensure <code className="bg-muted px-1 rounded">frontend/.env.local</code> is not required for this page, or add <code className="bg-muted px-1 rounded">DATABASE_URL</code> if you use one. Check the terminal for the exact error.
              </>
            ) : (
              error.message || "An unexpected error occurred."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={reset} variant="outline" className="w-full">
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
