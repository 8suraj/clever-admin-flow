
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Search, Plus, Edit, RefreshCw, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";

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
  onCreateClick: () => void;
  onUpdateClick: (id: string) => void;
  showPriceButtons?: boolean;
}

const ITEMS_PER_PAGE = 3; // Number of items per page

const SubscriptionTable = ({ 
  data, 
  title, 
  onCreateClick, 
  onUpdateClick, 
  showPriceButtons = false 
}: SubscriptionTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DataItem;
    direction: "ascending" | "descending";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSort = (key: keyof DataItem) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleStatusToggle = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    toast.success(`Status changed to ${newStatus}`);
    // In a real app, this would update the data via API
  };

  const handleAddPrice = (id: string) => {
    toast.info(`Add price for item ${id}`);
    // In a real app, this would navigate to the add price page
  };

  const handleUpdatePrice = (id: string) => {
    toast.info(`Update price for item ${id}`);
    // In a real app, this would navigate to the update price page
  };

  const renderPaginationLinks = () => {
    const links = [];
    
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => setCurrentPage(i)} 
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return links;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center border rounded-md px-3 max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <Input 
            placeholder={`Search ${title}...`} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <Button onClick={onCreateClick}>
          <Plus className="h-4 w-4 mr-2" />
          Create {title.slice(0, -1)}
        </Button>
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
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
                  <TableCell>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-1">
                        <Switch 
                          checked={item.status === "Active"} 
                          onCheckedChange={() => handleStatusToggle(item.id, item.status)}
                        />
                        <span className="text-xs text-muted-foreground">
                          {item.status === "Active" ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => onUpdateClick(item.id)}>
                          <Edit className="h-3 w-3 mr-1" />
                          Update
                        </Button>
                        
                        {showPriceButtons && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => handleAddPrice(item.id)}>
                              <DollarSign className="h-3 w-3 mr-1" />
                              Add Price
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleUpdatePrice(item.id)}>
                              <DollarSign className="h-3 w-3 mr-1" />
                              Update Price
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {renderPaginationLinks()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
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
  const navigate = useNavigate();
  
  // Handlers for create buttons
  const handleCreateFeature = () => {
    navigate("/subscriptions/features/create");
  };

  const handleUpdateFeature = (id: string) => {
    navigate(`/subscriptions/features/update/${id}`);
  };

  const handleCreateProduct = () => {
    navigate("/subscriptions/products/create");
  };

  const handleUpdateProduct = (id: string) => {
    navigate(`/subscriptions/products/update/${id}`);
  };

  const handleCreateCategory = () => {
    navigate("/subscriptions/categories/create");
  };

  const handleUpdateCategory = (id: string) => {
    navigate(`/subscriptions/categories/update/${id}`);
  };

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
          <SubscriptionTable 
            data={featuresData} 
            title="Features" 
            onCreateClick={handleCreateFeature}
            onUpdateClick={handleUpdateFeature}
          />
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <SubscriptionTable 
            data={productsData} 
            title="Products" 
            onCreateClick={handleCreateProduct}
            onUpdateClick={handleUpdateProduct}
            showPriceButtons={true}
          />
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <SubscriptionTable 
            data={categoriesData} 
            title="Categories" 
            onCreateClick={handleCreateCategory}
            onUpdateClick={handleUpdateCategory}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Subscriptions;
