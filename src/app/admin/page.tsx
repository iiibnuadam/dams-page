"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  Eye,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Mail,
  PanelBottom,
  LayoutTemplate,
  Menu,
  GripVertical,
  Smartphone,
  Tablet,
  Monitor,
} from "lucide-react";

const SECTION_ICONS: Record<string, React.ElementType> = {
  nav: Menu,
  hero: LayoutTemplate,
  workExperience: Briefcase,
  educationAndAwards: GraduationCap,
  projects: FolderGit2,
  contact: Mail,
  footer: PanelBottom,
};
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkExperience from "@/components/WorkExperience";
import EducationAndAwards from "@/components/EducationAndAwards";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { extractLocalizedData } from "@/lib/utils";
import {
  Hero as HeroType,
  WorkExperience as WorkExperienceType,
  EducationAndAwards as EducationAndAwardsType,
  Projects as ProjectsType,
  Contact as ContactType,
  Footer as FooterType,
  Nav as NavType,
} from "@/types/portfolio";

const SECTIONS = Object.keys(SCHEMAS);

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const [data, setData] = useState<Partial<CMSSectionData>>({});
  const [loading, setLoading] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [previewLang, setPreviewLang] = useState<"en" | "id">("en");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [previewWidth, setPreviewWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth =
          ((containerRect.right - mouseMoveEvent.clientX) /
            containerRect.width) *
          100;
        if (newWidth > 20 && newWidth < 80) {
          setPreviewWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setDevicePreview = (widthPx: number) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const percentage = (widthPx / containerWidth) * 100;
      // Allow a wider range for presets to ensure we can hit mobile breakpoints on large screens
      const clamped = Math.min(Math.max(percentage, 15), 85);
      setPreviewWidth(clamped);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "PREVIEW_READY") {
        sendPreviewData();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [data, activeSection, previewLang]);

  const sendPreviewData = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "UPDATE_PREVIEW",
          section: activeSection,
          data: data,
          lang: previewLang,
        },
        "*"
      );
    }
  }, [activeSection, data, previewLang]);

  useEffect(() => {
    sendPreviewData();
  }, [sendPreviewData]);

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
      <aside
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } border-r bg-card flex flex-col fixed h-full z-10 shadow-sm transition-all duration-300`}
      >
        <div className="p-6 border-b flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            {!isSidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="font-bold tracking-tight text-lg">CMS Admin</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  Dashboard
                </p>
              </motion.div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`h-6 w-6 rounded-full absolute -right-3 top-8 border bg-background shadow-sm z-20 flex`}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-6">
          <div className={`px-4 mb-6 ${isSidebarCollapsed ? "px-2" : ""}`}>
            {!isSidebarCollapsed && (
              <p className="text-xs font-semibold text-muted-foreground mb-3 px-2 uppercase tracking-wider">
                Content Management
              </p>
            )}
            <nav className="space-y-1">
              {SECTIONS.map((section) => {
                const Icon = SECTION_ICONS[section] || LayoutDashboard;
                return (
                  <Button
                    key={section}
                    variant={activeSection === section ? "secondary" : "ghost"}
                    className={`w-full transition-all duration-200 ${
                      isSidebarCollapsed
                        ? "justify-center px-0"
                        : "justify-start"
                    } ${
                      activeSection === section
                        ? "bg-primary/10 text-primary hover:bg-primary/15 font-medium translate-x-1"
                        : "hover:bg-muted hover:translate-x-1"
                    }`}
                    onClick={() => setActiveSection(section)}
                    title={isSidebarCollapsed ? SCHEMAS[section].name : ""}
                  >
                    {isSidebarCollapsed ? (
                      <Icon className="h-5 w-5" />
                    ) : (
                      <>
                        <Icon className="mr-2 h-4 w-4" />
                        {SCHEMAS[section].name}
                      </>
                    )}
                  </Button>
                );
              })}
            </nav>
          </div>

          <Separator className="my-4 mx-6 w-auto opacity-50" />

          <div className={`px-4 ${isSidebarCollapsed ? "px-2" : ""}`}>
            {!isSidebarCollapsed && (
              <p className="text-xs font-semibold text-muted-foreground mb-3 px-2 uppercase tracking-wider">
                Settings
              </p>
            )}
            <Button
              variant={activeSection === "profile" ? "secondary" : "ghost"}
              className={`w-full transition-all duration-200 ${
                isSidebarCollapsed ? "justify-center px-0" : "justify-start"
              } ${
                activeSection === "profile"
                  ? "bg-primary/10 text-primary hover:bg-primary/15 font-medium translate-x-1"
                  : "hover:bg-muted hover:translate-x-1"
              }`}
              onClick={() => setActiveSection("profile")}
              title={isSidebarCollapsed ? "Profile" : ""}
            >
              <User
                className={`${isSidebarCollapsed ? "h-5 w-5" : "mr-2 h-4 w-4"}`}
              />
              {!isSidebarCollapsed && "Profile"}
            </Button>
          </div>
        </ScrollArea>

        <div className="p-4 border-t space-y-3 bg-muted/30 backdrop-blur-sm">
          {!isSidebarCollapsed && (
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
          )}
          <div
            className={`grid ${
              isSidebarCollapsed ? "grid-cols-1" : "grid-cols-2"
            } gap-2`}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center"
              asChild
              title="Back to Site"
            >
              <Link href="/">
                <ArrowLeft
                  className={`${
                    isSidebarCollapsed ? "h-4 w-4" : "mr-2 h-3 w-3"
                  }`}
                />
                {!isSidebarCollapsed && "Site"}
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="w-full justify-center"
              onClick={() => signOut()}
              title="Sign Out"
            >
              <LogOut
                className={`${isSidebarCollapsed ? "h-4 w-4" : "mr-2 h-3 w-3"}`}
              />
              {!isSidebarCollapsed && "Sign Out"}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 p-4 md:p-8 overflow-y-auto h-screen transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="w-full space-y-8 pb-10">
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
              {isProfile ? (
                <Card className="shadow-md border-muted-foreground/10 overflow-hidden bg-card/50 backdrop-blur-sm">
                  <CardHeader className="bg-muted/30 border-b px-8 py-6">
                    <CardTitle className="text-xl">
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details and password.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ProfileForm />
                  </CardContent>
                </Card>
              ) : (
                <div
                  ref={containerRef}
                  className="flex flex-col xl:flex-row gap-0 h-[calc(100vh-180px)]"
                >
                  {/* Editor Panel (Desktop) */}
                  <div
                    style={{ width: `calc(${100 - previewWidth}% - 10px)` }}
                    className="h-full overflow-y-auto pr-4 hidden xl:block"
                  >
                    <Card className="shadow-md border-muted-foreground/10 overflow-hidden bg-card/50 backdrop-blur-sm h-fit min-h-full">
                      <CardHeader className="bg-muted/30 border-b px-8 py-6">
                        <CardTitle className="text-xl">
                          Content Editor
                        </CardTitle>
                        <CardDescription>
                          Make changes to the content fields below.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-8">
                        {loading && !data ? (
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
                  </div>

                  {/* Mobile Editor */}
                  <div className="xl:hidden w-full mb-8">
                    <Card className="shadow-md border-muted-foreground/10 overflow-hidden bg-card/50 backdrop-blur-sm h-fit">
                      <CardHeader className="bg-muted/30 border-b px-8 py-6">
                        <CardTitle className="text-xl">
                          Content Editor
                        </CardTitle>
                        <CardDescription>
                          Make changes to the content fields below.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-8">
                        {loading && !data ? (
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
                  </div>

                  {/* Drag Handle */}
                  <div
                    className="w-5 hover:bg-primary/10 cursor-col-resize hidden xl:flex items-center justify-center transition-colors group z-50 select-none"
                    onMouseDown={startResizing}
                  >
                    <GripVertical
                      className={`h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors ${
                        isResizing ? "text-primary" : ""
                      }`}
                    />
                  </div>

                  {/* Preview Panel (Desktop) */}
                  <div
                    style={{ width: `${previewWidth}%` }}
                    className="h-full pl-4 hidden xl:block"
                  >
                    <div className="space-y-4 h-full flex flex-col">
                      <Card className="h-full border-primary/20 shadow-lg shadow-primary/5 overflow-hidden flex flex-col">
                        <CardHeader className="pb-3 border-b bg-muted/30 flex-shrink-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4 text-primary" />
                              <CardTitle className="text-base">
                                Live Preview
                              </CardTitle>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-background rounded-md border p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => setDevicePreview(375)}
                                  title="Mobile (375px)"
                                >
                                  <Smartphone className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => setDevicePreview(768)}
                                  title="Tablet (768px)"
                                >
                                  <Tablet className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => setDevicePreview(1280)}
                                  title="Desktop (1280px)"
                                >
                                  <Monitor className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-1 bg-background rounded-md border p-1">
                                <Button
                                  variant={
                                    previewLang === "en" ? "secondary" : "ghost"
                                  }
                                  size="sm"
                                  className="h-7 px-2 text-xs"
                                  onClick={() => setPreviewLang("en")}
                                >
                                  🇬🇧 EN
                                </Button>
                                <Button
                                  variant={
                                    previewLang === "id" ? "secondary" : "ghost"
                                  }
                                  size="sm"
                                  className="h-7 px-2 text-xs"
                                  onClick={() => setPreviewLang("id")}
                                >
                                  🇮🇩 ID
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0 bg-background flex-1 overflow-hidden relative">
                          <iframe
                            ref={iframeRef}
                            src="/admin/preview"
                            className="w-full h-full border-0"
                            title="Live Preview"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Mobile Preview */}
                  <div className="xl:hidden w-full">
                    <div className="space-y-4">
                      <Card className="h-fit border-primary/20 shadow-lg shadow-primary/5 overflow-hidden">
                        <CardHeader className="pb-3 border-b bg-muted/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4 text-primary" />
                              <CardTitle className="text-base">
                                Live Preview
                              </CardTitle>
                            </div>
                            <div className="flex items-center gap-1 bg-background rounded-md border p-1">
                              <Button
                                variant={
                                  previewLang === "en" ? "secondary" : "ghost"
                                }
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={() => setPreviewLang("en")}
                              >
                                🇬🇧 EN
                              </Button>
                              <Button
                                variant={
                                  previewLang === "id" ? "secondary" : "ghost"
                                }
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={() => setPreviewLang("id")}
                              >
                                🇮🇩 ID
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0 bg-background min-h-[300px] max-h-[calc(100vh-200px)] overflow-hidden relative">
                          <iframe
                            src="/admin/preview"
                            className="w-full h-full border-0"
                            title="Live Preview"
                            onLoad={(e) => {
                              const iframe = e.currentTarget;
                              iframe.contentWindow?.postMessage(
                                {
                                  type: "UPDATE_PREVIEW",
                                  section: activeSection,
                                  data: data,
                                  lang: previewLang,
                                },
                                "*"
                              );
                            }}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
