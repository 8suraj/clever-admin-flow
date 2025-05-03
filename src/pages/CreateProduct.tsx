
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, Trash, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

// Define metadata item schema
const metadataItemSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
});

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  description: z.string().min(5, "Description must be at least 5 characters."),
  active: z.boolean().default(true),
  metadata: z.array(metadataItemSchema).optional(),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;
type MetadataItem = z.infer<typeof metadataItemSchema>;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [metadataItems, setMetadataItems] = useState<MetadataItem[]>([{ key: "", value: "" }]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      active: true,
      metadata: [{ key: "", value: "" }],
    },
  });

  const onSubmit = (data: FormValues) => {
    // Add metadata to the form data
    const formData = {
      ...data,
      metadata: metadataItems,
    };
    
    // In a real app, this would make an API call to create the product
    console.log("Product form data:", formData);
    toast.success("Product created successfully!");
    
    // Navigate back to the products list
    navigate("/subscriptions");
  };

  const addMetadataItem = () => {
    setMetadataItems([...metadataItems, { key: "", value: "" }]);
  };

  const removeMetadataItem = (index: number) => {
    const updatedItems = [...metadataItems];
    updatedItems.splice(index, 1);
    setMetadataItems(updatedItems);
  };

  const updateMetadataItem = (index: number, field: keyof MetadataItem, value: string) => {
    const updatedItems = [...metadataItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setMetadataItems(updatedItems);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Product</h1>
        <p className="text-muted-foreground">Add a new subscription product</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Enter the details for the new product.</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter product description" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel className="block mb-2">Metadata</FormLabel>
                <div className="space-y-3">
                  {metadataItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Input
                        placeholder="Key"
                        value={item.key}
                        onChange={(e) => updateMetadataItem(index, "key", e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Value"
                        value={item.value}
                        onChange={(e) => updateMetadataItem(index, "value", e.target.value)}
                        className="flex-1"
                      />
                      {metadataItems.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMetadataItem(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={addMetadataItem}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Metadata
                </Button>
              </div>
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <div className="flex items-center gap-4">
                      <div className="border rounded-md p-4 flex-1">
                        <div className="flex flex-col items-center gap-2">
                          <label 
                            htmlFor="image-upload" 
                            className="cursor-pointer flex flex-col items-center gap-2"
                          >
                            {imagePreview ? (
                              <div className="w-full h-40 rounded-md overflow-hidden">
                                <img 
                                  src={imagePreview} 
                                  alt="Product Preview" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-full h-40 border-2 border-dashed rounded-md flex items-center justify-center bg-muted">
                                <div className="flex flex-col items-center gap-2">
                                  <Upload className="h-10 w-10 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    Click to upload an image
                                  </p>
                                </div>
                              </div>
                            )}
                          </label>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                            {...field}
                            value={undefined} // Clear value to allow reselecting the same file
                          />
                          {imagePreview && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setImagePreview(null);
                                form.setValue("image", null);
                              }}
                            >
                              Remove Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Activate or deactivate this product
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/subscriptions")}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Product</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProduct;
