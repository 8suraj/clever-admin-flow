
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@/components/ui/chart";
import { Users, ArrowUp, ArrowDown, CreditCard, Activity } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Dashboard = () => {
  const data = [
    {
      name: "Jan",
      total: 2500,
    },
    {
      name: "Feb",
      total: 3500,
    },
    {
      name: "Mar",
      total: 3000,
    },
    {
      name: "Apr",
      total: 4500,
    },
    {
      name: "May",
      total: 4000,
    },
    {
      name: "Jun",
      total: 5000,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 20.1%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 12.5%
              </span>
              from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center mr-1">
                <ArrowDown className="h-3 w-3 mr-1" /> 4.1%
              </span>
              from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 10%
              </span>
              from average
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Monthly revenue overview for the current year.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AreaChart
              data={data}
              index="name"
              categories={["total"]}
              colors={["#5046e5"]}
              className="h-72"
            />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              Latest customer transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {["JD", "SM", "RW", "MW", "LB"][i - 1]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">
                      {["John Doe", "Sarah Miller", "Robert Williams", "Michael White", "Lisa Brown"][i - 1]}
                    </p>
                    <p className="text-sm text-gray-500">
                      {["john@example.com", "sarah@example.com", "robert@example.com", "michael@example.com", "lisa@example.com"][i - 1]}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    ${[350, 192, 215, 489, 129][i - 1]}.00
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
