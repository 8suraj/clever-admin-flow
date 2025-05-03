
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

interface DataItem {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
}

interface SubscriptionTableProps {
  data: DataItem[];
  title: string;
}

const SubscriptionTable = ({ data, title }: SubscriptionTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DataItem;
    direction: "ascending" | "descending";
  } | null>(null);

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sort data based on sort configuration
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) {
      return direction === "ascending" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: keyof DataItem) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center border rounded-md px-3 max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <Input 
          placeholder={`Search ${title}...`} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableCaption>List of {title}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50" 
                onClick={() => handleSort("name")}
              >
                Name {sortConfig?.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50" 
                onClick={() => handleSort("description")}
              >
                Description {sortConfig?.key === "description" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50" 
                onClick={() => handleSort("status")}
              >
                Status {sortConfig?.key === "status" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50" 
                onClick={() => handleSort("createdAt")}
              >
                Created At {sortConfig?.key === "createdAt" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === "Active" ? "bg-green-100 text-green-800" : 
                      item.status === "Inactive" ? "bg-gray-100 text-gray-800" : 
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Sample data for each tab
const featuresData: DataItem[] = [
  { id: '1', name: 'Premium Dashboard', description: 'Advanced analytics dashboard', status: 'Active', createdAt: '2023-01-15' },
  { id: '2', name: 'Data Export', description: 'Export data in various formats', status: 'Active', createdAt: '2023-02-10' },
  { id: '3', name: 'API Access', description: 'Direct API integration', status: 'Pending', createdAt: '2023-03-05' },
  { id: '4', name: 'Custom Reports', description: 'Create personalized reports', status: 'Active', createdAt: '2023-01-25' },
  { id: '5', name: 'User Management', description: 'Advanced user permission controls', status: 'Inactive', createdAt: '2023-02-15' },
];

const productsData: DataItem[] = [
  { id: '1', name: 'Basic Plan', description: 'Entry level subscription', status: 'Active', createdAt: '2023-01-10' },
  { id: '2', name: 'Professional Plan', description: 'Business level access', status: 'Active', createdAt: '2023-01-12' },
  { id: '3', name: 'Enterprise Plan', description: 'Full featured solution', status: 'Active', createdAt: '2023-02-05' },
  { id: '4', name: 'Team Plan', description: 'Collaborative features', status: 'Inactive', createdAt: '2023-03-15' },
  { id: '5', name: 'Custom Plan', description: 'Tailored solutions', status: 'Pending', createdAt: '2023-04-01' },
];

const categoriesData: DataItem[] = [
  { id: '1', name: 'Analytics', description: 'Data visualization tools', status: 'Active', createdAt: '2023-01-05' },
  { id: '2', name: 'Collaboration', description: 'Team working features', status: 'Active', createdAt: '2023-01-18' },
  { id: '3', name: 'Storage', description: 'Data storage solutions', status: 'Active', createdAt: '2023-02-12' },
  { id: '4', name: 'Security', description: 'Enhanced security features', status: 'Pending', createdAt: '2023-03-01' },
  { id: '5', name: 'Integration', description: 'Third-party app connections', status: 'Inactive', createdAt: '2023-04-05' },
];

const Subscriptions = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Subscriptions</h1>
        <p className="text-muted-foreground">Manage subscription features, products, and categories</p>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="space-y-4">
          <SubscriptionTable data={featuresData} title="Features" />
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <SubscriptionTable data={productsData} title="Products" />
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <SubscriptionTable data={categoriesData} title="Categories" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Subscriptions;
