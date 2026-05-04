import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, DollarSign, Menu, LogOut } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Booking {
  id: string;
  customerName: string;
  phone: string;
  functionType: string;
  date: string;
  plan: string;
  total: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export default function OwnerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // This is a placeholder - update with your actual Supabase table structure
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings");
        return;
      }

      if (data) {
        setBookings(data);
        const revenue = data.reduce((sum, booking) => sum + (booking.total || 0), 0);
        setTotalRevenue(revenue);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = filterStatus === "all"
    ? bookings
    : bookings.filter(b => b.status === filterStatus);

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      label: "Pending Bookings",
      value: bookings.filter(b => b.status === "pending").length,
      icon: Menu,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      label: "Confirmed",
      value: bookings.filter(b => b.status === "confirmed").length,
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) {
        toast.error("Failed to update status");
        return;
      }

      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus as any } : b));
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred");
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <section className="container py-16 md:py-24">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="container py-16 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <SectionTitle
            eyebrow="Owner"
            title="Booking Dashboard"
            subtitle="Manage all bookings and track revenue"
          />
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 rounded-full"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-6 ${stat.bgColor}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color} opacity-60`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Filter and Bookings List */}
        <div className="glass-card rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif">Recent Bookings</h2>
            <div className="flex gap-2">
              {["all", "pending", "confirmed", "completed", "cancelled"].map(status => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className="rounded-full"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Function</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium">{booking.customerName}</td>
                      <td className="py-3 px-4 text-sm">{booking.functionType}</td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-semibold text-primary">
                        ₹{booking.total?.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === "pending"
                              ? "bg-orange-100 text-orange-800"
                              : booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                          className="text-sm px-2 py-1 border rounded-md bg-background cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
