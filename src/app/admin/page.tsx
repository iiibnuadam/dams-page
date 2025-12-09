"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CMSSectionData } from "@/types/cms";
import { SCHEMAS } from "@/lib/content-schemas";
import FormBuilder from "@/components/admin/FormBuilder";
import ProfileForm from "@/components/admin/ProfileForm";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Save, Loader2, User } from "lucide-react";
import { toast } from "sonner";

const SECTIONS = Object.keys(SCHEMAS);

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const [data, setData] = useState<Partial<CMSSectionData>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session && activeSection !== "profile") {
      fetchData(activeSection);
    }
  }, [activeSection, session]);

  const fetchData = async (section: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cms/${section}`);
      if (res.ok) {
        const json = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, __v, ...rest } = json;
        setData(rest);
      } else {
        setData({});
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cms/${activeSection}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Saved successfully!");
      } else {
        toast.error("Failed to save.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const isProfile = activeSection === "profile";
  const currentSchema = isProfile
    ? { name: "Profile Settings" }
    : SCHEMAS[activeSection];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/40 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold tracking-tight">CMS Admin</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Welcome, {session.user?.name}
          </p>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="px-4 space-y-1">
            {SECTIONS.map((section) => (
              <Button
                key={section}
                variant={activeSection === section ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection(section)}
              >
                {SCHEMAS[section].name}
              </Button>
            ))}
            <Separator className="my-2" />
            <Button
              variant={activeSection === "profile" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {currentSchema.name}
              </h2>
              <p className="text-muted-foreground">
                {isProfile
                  ? "Manage your account settings."
                  : "Manage content for this section."}
              </p>
            </div>
            {!isProfile && (
              <div className="flex items-center gap-4">
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>

          <Separator />

          <Card>
            <CardContent className="p-6">
              {isProfile ? (
                <ProfileForm />
              ) : loading && !data ? (
                <div className="flex justify-center py-10 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <FormBuilder
                  schema={SCHEMAS[activeSection].fields}
                  data={data as Record<string, unknown>}
                  onChange={(val) => setData(val as Partial<CMSSectionData>)}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
