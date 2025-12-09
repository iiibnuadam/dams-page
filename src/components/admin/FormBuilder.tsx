"use client";

import { Field } from "@/lib/content-schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Plus, Pencil } from "lucide-react";

type FormData = Record<string, unknown>;

interface FormBuilderProps {
  schema: Field[];
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function FormBuilder({
  schema,
  data,
  onChange,
}: FormBuilderProps) {
  const handleChange = (fieldName: string, value: unknown) => {
    onChange({ ...data, [fieldName]: value });
  };

  // Check if this is the top-level language split
  const isLanguageSplit =
    schema.length === 2 && schema[0].name === "en" && schema[1].name === "id";

  if (isLanguageSplit) {
    return (
      <Tabs defaultValue="en" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="id">Indonesian</TabsTrigger>
        </TabsList>
        <TabsContent value="en" className="mt-4 space-y-4">
          {schema[0].type === "object" ? (
            <FormBuilder
              schema={schema[0].fields || []}
              data={(data?.en as FormData) || {}}
              onChange={(val) => handleChange("en", val)}
            />
          ) : (
            <FormBuilder
              schema={[schema[0]]}
              data={data || {}}
              onChange={onChange}
            />
          )}
        </TabsContent>
        <TabsContent value="id" className="mt-4 space-y-4">
          {schema[1].type === "object" ? (
            <FormBuilder
              schema={schema[1].fields || []}
              data={(data?.id as FormData) || {}}
              onChange={(val) => handleChange("id", val)}
            />
          ) : (
            <FormBuilder
              schema={[schema[1]]}
              data={data || {}}
              onChange={onChange}
            />
          )}
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <div className="space-y-6">
      {schema.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label>{field.label}</Label>

          {field.type === "text" && (
            <Input
              type="text"
              value={(data?.[field.name] as string) || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}

          {field.type === "textarea" && (
            <Textarea
              value={(data?.[field.name] as string) || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              rows={4}
            />
          )}

          {field.type === "select" && field.options && (
            <select
              value={(data?.[field.name] as string) || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>
                Select an option
              </option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {field.type === "list" && (
            <ListInput
              value={(data?.[field.name] as string[]) || []}
              onChange={(val) => handleChange(field.name, val)}
            />
          )}

          {field.type === "object" && field.fields && (
            <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
              <FormBuilder
                schema={field.fields}
                data={(data?.[field.name] as FormData) || {}}
                onChange={(val) => handleChange(field.name, val)}
              />
            </div>
          )}

          {field.type === "array" && field.itemFields && (
            <ArrayInput
              itemFields={field.itemFields}
              value={(data?.[field.name] as FormData[]) || []}
              onChange={(val) => handleChange(field.name, val)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ListInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const add = () => onChange([...value, ""]);
  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));
  const update = (idx: number, val: string) => {
    const newValue = [...value];
    newValue[idx] = val;
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      {value.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => update(idx, e.target.value)}
            className="flex-1"
          />
          <Button variant="destructive" size="icon" onClick={() => remove(idx)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Item
      </Button>
    </div>
  );
}

function ArrayInput({
  itemFields,
  value,
  onChange,
}: {
  itemFields: Field[];
  value: FormData[];
  onChange: (val: FormData[]) => void;
}) {
  const add = () => onChange([...value, {}]);
  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));
  const update = (idx: number, val: FormData) => {
    const newValue = [...value];
    newValue[idx] = val;
    onChange(newValue);
  };

  // Helper to get a display title for the item
  const getItemTitle = (item: FormData, idx: number) => {
    // Check for localized content (en/id structure)
    const en = item?.en as Record<string, unknown> | undefined;
    const id = item?.id as Record<string, unknown> | undefined;

    // Try to find title/name/etc in English first, then Indonesian
    const title = (en?.title || id?.title) as string | undefined;
    const name = (en?.name || id?.name) as string | undefined;
    const position = (en?.position || id?.position) as string | undefined;
    const company = (en?.company || id?.company) as string | undefined;
    const institution = (en?.institution || id?.institution) as
      | string
      | undefined;
    const role = (en?.role || id?.role) as string | undefined;
    const organization = (en?.organization || id?.organization) as
      | string
      | undefined;
    const platform = item?.platform as string | undefined;

    if (title) return title;
    if (name) return name;
    if (platform) return platform.charAt(0).toUpperCase() + platform.slice(1);
    if (position && company) return `${position} at ${company}`;
    if (position) return position;
    if (institution) return institution;
    if (role && organization) return `${role} at ${organization}`;
    if (role) return role;

    // Fallback to existing logic for non-localized or different structures
    const directTitle = item?.title as { en?: string; id?: string } | undefined;
    const directName = item?.name as { en?: string; id?: string } | undefined;

    if (directTitle?.en) return directTitle.en;
    if (directTitle?.id) return directTitle.id;
    if (directName?.en) return directName.en;

    return `Item ${idx + 1}`;
  };

  return (
    <div className="space-y-4">
      {value.map((item, idx) => (
        <Card key={idx} className="flex items-center justify-between p-4">
          <div className="font-medium truncate flex-1 mr-4">
            {getItemTitle(item, idx)}
          </div>
          <div className="flex gap-2 shrink-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-2" /> Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Item {idx + 1}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <FormBuilder
                    schema={itemFields}
                    data={item}
                    onChange={(val) => update(idx, val)}
                  />
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => remove(idx)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
      <Button variant="outline" onClick={add} className="w-full border-dashed">
        <Plus className="h-4 w-4 mr-2" /> Add Entry
      </Button>
    </div>
  );
}
