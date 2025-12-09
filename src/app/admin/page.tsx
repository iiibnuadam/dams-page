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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  LogOut,
  Save,
  Loader2,
  User,
  ArrowLeft,
  LayoutDashboard,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = Object.keys(SCHEMAS);

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const [data, setData] = useState<Partial<CMSSectionData>>({});
  const [loading, setLoading] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

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

  const handleSaveClick = () => {
    setIsSaveDialogOpen(true);
  };

  const executeSave = async () => {
    setIsSaveDialogOpen(false);
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
      <div className="min-h-screen flex items-center justify-center bg-muted/10">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
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
    <div className="min-h-screen bg-muted/10 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col fixed h-full z-10 shadow-sm">
        <div className="p-6 border-b flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-lg">CMS Admin</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              Dashboard
            </p>
          </div>
        </div>

        <ScrollArea className="flex-1 py-6">
          <div className="px-4 mb-6">
            <p className="text-xs font-semibold text-muted-foreground mb-3 px-2 uppercase tracking-wider">
              Content Management
            </p>
            <nav className="space-y-1">
              {SECTIONS.map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? "secondary" : "ghost"}
                  className={`w-full justify-start transition-all duration-200 ${
                    activeSection === section
                      ? "bg-primary/10 text-primary hover:bg-primary/15 font-medium translate-x-1"
                      : "hover:bg-muted hover:translate-x-1"
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  {SCHEMAS[section].name}
                </Button>
              ))}
            </nav>
          </div>

          <Separator className="my-4 mx-6 w-auto opacity-50" />

          <div className="px-4">
            <p className="text-xs font-semibold text-muted-foreground mb-3 px-2 uppercase tracking-wider">
              Settings
            </p>
            <Button
              variant={activeSection === "profile" ? "secondary" : "ghost"}
              className={`w-full justify-start transition-all duration-200 ${
                activeSection === "profile"
                  ? "bg-primary/10 text-primary hover:bg-primary/15 font-medium translate-x-1"
                  : "hover:bg-muted hover:translate-x-1"
              }`}
              onClick={() => setActiveSection("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>
        </ScrollArea>

        <div className="p-4 border-t space-y-3 bg-muted/30 backdrop-blur-sm">
          <div className="px-3 py-2 rounded-lg bg-background border shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">Logged in as</p>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                {session.user?.name?.[0]?.toUpperCase()}
              </div>
              <p className="text-sm font-medium truncate flex-1">
                {session.user?.name}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-3 w-3" /> Site
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="w-full justify-center"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-3 w-3" /> Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto space-y-8 pb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-end"
          >
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                {currentSchema.name}
              </h2>
              <p className="text-muted-foreground mt-2 text-lg">
                {isProfile
                  ? "Manage your account settings and preferences."
                  : "Manage and update content for this section."}
              </p>
            </div>
            {!isProfile && (
              <div className="flex items-center gap-4">
                <Dialog
                  open={isSaveDialogOpen}
                  onOpenChange={setIsSaveDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={handleSaveClick}
                      disabled={loading}
                      size="lg"
                      className="shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-5 w-5" />
                      )}
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save Changes?</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to save changes to the{" "}
                        <span className="font-semibold text-foreground">
                          {currentSchema.name}
                        </span>{" "}
                        section? This action will update the live website.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsSaveDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={executeSave} disabled={loading}>
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                        )}
                        Confirm Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </motion.div>

          <Separator className="bg-border/60" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-md border-muted-foreground/10 overflow-hidden bg-card/50 backdrop-blur-sm">
                <CardHeader className="bg-muted/30 border-b px-8 py-6">
                  <CardTitle className="text-xl">
                    {isProfile ? "Profile Information" : "Content Editor"}
                  </CardTitle>
                  <CardDescription>
                    {isProfile
                      ? "Update your personal details and password."
                      : "Make changes to the content fields below."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {isProfile ? (
                    <ProfileForm />
                  ) : loading && !data ? (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                      <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary/50" />
                      <p>Loading content...</p>
                    </div>
                  ) : (
                    <FormBuilder
                      schema={SCHEMAS[activeSection].fields}
                      data={data as Record<string, unknown>}
                      onChange={(val) =>
                        setData(val as Partial<CMSSectionData>)
                      }
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
