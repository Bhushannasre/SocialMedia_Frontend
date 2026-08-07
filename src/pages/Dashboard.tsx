import { CheckCircleIcon, ClockIcon, Share2Icon, TrendingUpIcon } from "lucide-react";
import { useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({
    scheduled: 0,
    published: 0,
    failed: 0,
    total: 0,
    connectedAccounts: 0,
  });
  const [activities, setActivities] = useState<any[]>([]);

  const statCards = [
    {
      label: "Scheduled Posts",
      value: stats.scheduled,
      icon: ClockIcon,
      trend: "+2 today",
    },
    {
      label: "Published Posts",
      value: stats.published,
      icon: CheckCircleIcon,
      trend: "+5 today",
    },
    {
      label: "Connected Accounts",
      value: stats.connectedAccounts,
      icon: Share2Icon,
      trend: "Active",
    },
  ];

  return (
    <div className="space-y-8">
      {/* welcome bar */}
      <div>
        <h2 className="text-2xl text-slate-900">Good Morning!</h2>
        <p className="text-slate-600 text-sm mt-0.5">
          Here's what's happening with your social media today.
        </p>
      </div>

      {/* stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white hover:bg-red-50 relative border border-slate-200 rounded-2xl p-5 hover:border-red-200 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 rounded-xl bg-red-50 flex items-center justify-center">
                <card.icon className="size-5 text-red-500" />
              </div>
              <div className="text-xs absolute right-4 top-4 text-red-500 flex items-center gap-1">
                <TrendingUpIcon className="size-3" />
                {card.trend}
              </div>
            </div>
            <div className="text-3xl font-medium text-slate-800 tabular-nums">{card.value}</div>
            <div className="text-sm text-slate-500 mt-1">{card.label}</div>
          </div>
        ))}
      </div>
      {/* Activity feed */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
         <h2 className="text-slate-900">Recent Activity</h2>
            <span className="text-sm text-slate-400 ">{activities.length} events</span>

        </div>
        {activities.length === 0 ? (    
            <div><div>
                
        ):(
            <div></div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;