import NewForm from "@/components/modals/NewForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
  return (
    <div className="container pt-4">
      <StatsSection />
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewForm />
        {[1, 2, 3, 4].map((el) => (
          <FormCardSkeleton key={el} />
        ))}
      </div>
    </div>
  );
}

function StatsSection() {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Total visits" value="50" />
      <StatsCard title="Total submissions" value="40" />
      <StatsCard title="Submission rate" value="33.333%" />
      <StatsCard title="Bounce rate" value="50%" />
    </div>
  );
}

export function StatsCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}

export default Dashboard;
