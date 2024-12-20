import Layout from "@/layouts/Layout";
import statisticsService from "@/services/statistics.service";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    statisticsService
      .getStatistics()
      .then((res) => {
        setStatistics(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout title="Dashboard" loading={isLoading}>
      <div className="pt-10">
        <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-purple-600 text-white p-4 rounded-md shadow-md w-full">
            <h2 className="text-xl font-bold">Total Revenue</h2>
            <p className="text-lg font-medium">
              <CountUp end={statistics.revenue} prefix="$" />
            </p>
          </div>
          <div className="bg-purple-600 text-white p-4 rounded-md shadow-md w-full">
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-lg font-medium">
              <CountUp end={statistics.users} />
            </p>
          </div>
          <div className="bg-purple-600 text-white p-4 rounded-md shadow-md w-full">
            <h2 className="text-xl font-bold">Total Products</h2>
            <p className="text-lg font-medium">
              <CountUp end={statistics.products} />
            </p>
          </div>
          <div className="bg-purple-600 text-white p-4 rounded-md shadow-md w-full">
            <h2 className="text-xl font-bold">Total Orders</h2>
            <p className="text-lg font-medium">
              {" "}
              <CountUp end={statistics.orders} />
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
