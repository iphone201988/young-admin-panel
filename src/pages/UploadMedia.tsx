import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useUploadMediaMutation } from "@/redux/api";

const UploadMedia = () => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sourceLink, setSourceLink] = useState("");
  const [uploadMedia, { data, isLoading }] = useUploadMediaMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (data?.success) {
      toast.success(data?.message || "Media uploaded successfully");
    }
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!imageFile) {
      toast.error("Image is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("imageUrl", imageFile);
      if (sourceLink.trim()) formData.append("sourceLink", sourceLink.trim());

      await uploadMedia(formData).unwrap();

      setTitle("");
      setImageFile(null);
      setSourceLink("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to upload media");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Upload Media</h3>
        <p className="text-sm text-muted-foreground">Provide a title, choose an image, and optionally a source link.</p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Upload Image <span className="text-red-500">*</span></label>
          <input
            id="upload-image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="w-full px-4 py-2 border rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-primary file:text-primary-foreground file:cursor-pointer"
          />
          {imageFile && (
            <p className="text-xs text-muted-foreground">Selected: {imageFile.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Source Link (optional)</label>
          <input
            type="url"
            value={sourceLink}
            onChange={(e) => setSourceLink(e.target.value)}
            placeholder="https://example.com/source"
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? "Uploading..." : "Upload Media"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadMedia;


