
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define the form schema
const formSchema = z.object({
  productId: z.string({
    required_error: "Please select a product.",
  }),
  features: z.array(z.string()).min(1, "Please select at least one feature."),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for products and features - in a real app, this would come from an API
const products = [
  { id: "1", name: "Basic Plan" },
  { id: "2", name: "Pro Plan" },
  { id: "3", name: "Enterprise Plan" },
];

const features = [
  { id: "1", name: "File Storage" },
  { id: "2", name: "User Management" },
  { id: "3", name: "Analytics Dashboard" },
  { id: "4", name: "API Access" },
  { id: "5", name: "Custom Branding" },
];

const CreateFeatureMap = () => {
  const navigate = useNavigate();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      features: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would make an API call to create the feature map
    console.log("Feature map form data:", data);
    toast.success("Feature map created successfully!");
    
    // Navigate back to the subscriptions page
    navigate("/subscriptions");
  };

  const handleAddFeature = (featureId: string) => {
    if (!selectedFeatures.includes(featureId)) {
      const newSelectedFeatures = [...selectedFeatures, featureId];
      setSelectedFeatures(newSelectedFeatures);
      form.setValue("features", newSelectedFeatures);
    }
  };

  const handleRemoveFeature = (featureId: string) => {
    const newSelectedFeatures = selectedFeatures.filter(id => id !== featureId);
    setSelectedFeatures(newSelectedFeatures);
    form.setValue("features", newSelectedFeatures);
  };

  // Get feature names for display
  const getFeatureName = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    return feature ? feature.name : "Unknown Feature";
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Feature Map</h1>
        <p className="text-muted-foreground">Associate features with a product</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Feature Map Details</CardTitle>
          <CardDescription>Select a product and assign features to it.</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="features"
                render={() => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <Select onValueChange={handleAddFeature}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select features" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {features.map((feature) => (
                          <SelectItem key={feature.id} value={feature.id}>
                            {feature.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="mt-4">
                      {selectedFeatures.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedFeatures.map(featureId => (
                            <Badge key={featureId} className="flex items-center gap-1 px-3 py-1">
                              {getFeatureName(featureId)}
                              <button 
                                type="button"
                                onClick={() => handleRemoveFeature(featureId)}
                                className="ml-1 rounded-full p-0.5 hover:bg-primary-foreground"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove</span>
                              </button>
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          No features selected
                        </div>
                      )}
                    </div>
                    <FormMessage />
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
                <Button type="submit">Create Feature Map</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateFeatureMap;
