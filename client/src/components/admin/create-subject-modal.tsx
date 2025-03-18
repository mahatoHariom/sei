import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Subject } from "@/types/subjects";

interface CreateSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Subject>) => void;
}

export const CreateSubjectModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateSubjectModalProps) => {
  const [formData, setFormData] = useState<Partial<Subject>>({
    name: "",
    description: "",
    difficulty: "Beginner",
    duration: "8 weeks",
    imageUrl: "",
    courseType: "Certificate",
    tags: [],
    badge: "",
    students: 0,
  });

  // Available tags for selection
  const availableTags = [
    "Technology",
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Data Science",
    "AI",
    "Web Development",
    "Mobile Development",
  ];

  // Available difficulty levels
  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  // Available course types
  const courseTypes = [
    "Certificate",
    "Diploma",
    "Degree",
    "Workshop",
    "Bootcamp",
  ];

  // Available badge options
  const badgeOptions = ["New", "Featured", "Popular", "Hot", "Special"];

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle number field changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) || 0 });
  };

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    const currentTags = formData.tags || [];
    if (currentTags.includes(tag)) {
      setFormData({
        ...formData,
        tags: currentTags.filter((t) => t !== tag),
      });
    } else {
      setFormData({
        ...formData,
        tags: [...currentTags, tag],
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      description: "",
      difficulty: "Beginner",
      duration: "8 weeks",
      imageUrl: "",
      courseType: "Certificate",
      tags: [],
      badge: "",
      students: 0,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Course Name*</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Course Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    handleSelectChange("difficulty", value)
                  }
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="e.g. 8 weeks"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="courseType">Course Type</Label>
                <Select
                  value={formData.courseType}
                  onValueChange={(value) =>
                    handleSelectChange("courseType", value)
                  }
                >
                  <SelectTrigger id="courseType">
                    <SelectValue placeholder="Select course type" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="badge">Course Badge</Label>
                <Select
                  value={formData.badge || "none"}
                  onValueChange={(value) =>
                    handleSelectChange("badge", value === "none" ? "" : value)
                  }
                >
                  <SelectTrigger id="badge">
                    <SelectValue placeholder="Select badge (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {badgeOptions.map((badge) => (
                      <SelectItem key={badge} value={badge}>
                        {badge}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="imageUrl">Course Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={(formData.tags || []).includes(tag)}
                      onCheckedChange={(checked) => handleTagToggle(tag)}
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="students">Initial Student Count</Label>
              <Input
                id="students"
                name="students"
                type="number"
                placeholder="0"
                value={formData.students}
                onChange={handleNumberChange}
                min={0}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
