"use client";

import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AVAILABLE_SECTIONS = [
  { id: "workExperience", label: "Work Experience" },
  { id: "educationAndAwards", label: "Education & Awards" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

interface SectionReorderProps {
  initialOrder?: string[];
  onSave: (order: string[]) => void;
  loading?: boolean;
}

export default function SectionReorder({
  initialOrder,
  onSave,
  loading,
}: SectionReorderProps) {
  const [items, setItems] = useState(AVAILABLE_SECTIONS);

  useEffect(() => {
    if (initialOrder && initialOrder.length > 0) {
      const ordered = initialOrder
        .map((id) => AVAILABLE_SECTIONS.find((s) => s.id === id))
        .filter((s): s is (typeof AVAILABLE_SECTIONS)[0] => !!s);

      // Add any missing sections to the end
      const missing = AVAILABLE_SECTIONS.filter(
        (s) => !initialOrder.includes(s.id)
      );
      setItems([...ordered, ...missing]);
    }
  }, [initialOrder]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Section Order</h3>
        <p className="text-sm text-muted-foreground">
          Drag and drop to reorder the sections on the landing page.
        </p>
      </div>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="space-y-2"
      >
        {items.map((item) => (
          <Reorder.Item key={item.id} value={item}>
            <Card className="p-4 flex items-center gap-4 cursor-grab active:cursor-grabbing">
              <GripVertical className="text-muted-foreground" />
              <span>{item.label}</span>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <Button onClick={() => onSave(items.map((i) => i.id))} disabled={loading}>
        {loading ? "Saving..." : "Save Order"}
      </Button>
    </div>
  );
}
