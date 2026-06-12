import React, { useState } from "react";
import {
  FaUsers,
  FaSignInAlt,
  FaHeart,
  FaCommentDots,
  FaUserEdit,
  FaSearch,
  FaFilter,
  FaUndo,
  FaEye,
  FaDownload,
  FaArrowUp,
  FaArrowDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

/* ── DUMMY DATA ── */
const statCardsData = [
  {
    title: "Total Activities",
    value: "12,458",
    trend: "+18.5%",
    isUp: true,
    icon: <FaUsers className="text-indigo-500" />,
    bg: "bg-indigo-50",
  },
  {
    title: "Logins",
    value: "5,245",
    trend: "+22.4%",
    isUp: true,
    icon: <FaSignInAlt className="text-blue-500" />,
    bg: "bg-blue-50",
  },
  {
    title: "Wishlist Actions",
    value: "3,248",
    trend: "+16.7%",
    isUp: true,
    icon: <FaHeart className="text-green-500" />,
    bg: "bg-green-50",
  },
  {
    title: "Enquiries Submitted",
    value: "1,542",
    trend: "+13.3%",
    isUp: true,
    icon: <FaCommentDots className="text-orange-500" />,
    bg: "bg-orange-50",
  },
  {
    title: "Profile Updates",
    value: "423",
    trend: "-4.3%",
    isUp: false,
    icon: <FaUserEdit className="text-pink-500" />,
    bg: "bg-pink-50",
  },
];

const activityLogsData = [
  {
    id: 1,
    name: "Kajal Thakur",
    email: "kajal.thakur@example.com",
    type: "Login",
    typeBadge: "bg-green-100 text-green-700",
    typeIcon: <FaSignInAlt />,
    details: "User logged in to the system",
    ip: "192.168.1.1",
    date: "12 Jun 2026, 10:30 AM",
  },
  {
    id: 2,
    name: "Rahul Sahu",
    email: "rahul.sahu@example.com",
    type: "Added to Wishlist",
    typeBadge: "bg-pink-100 text-pink-700",
    typeIcon: <FaHeart />,
    details: "Added KIIT University to wishlist",
    ip: "192.168.1.8",
    date: "12 Jun 2026, 10:35 AM",
  },
  {
    id: 3,
    name: "Priya Panda",
    email: "priya.panda@example.com",
    type: "Viewed College",
    typeBadge: "bg-blue-100 text-blue-700",
    typeIcon: <FaEye />,
    details: "Viewed SOA University details",
    ip: "192.168.1.5",
    date: "12 Jun 2026, 10:40 AM",
  },
  {
    id: 4,
    name: "Subham Das",
    email: "subham.das@example.com",
    type: "Submitted Enquiry",
    typeBadge: "bg-indigo-100 text-indigo-700",
    typeIcon: <FaCommentDots />,
    details: "Enquiry for B.Tech - KIIT University",
    ip: "192.168.1.3",
    date: "12 Jun 2026, 10:45 AM",
  },
  {
    id: 5,
    name: "Anjali Mishra",
    email: "anjali.mishra@example.com",
    type: "Profile Updated",
    typeBadge: "bg-orange-100 text-orange-700",
    typeIcon: <FaUserEdit />,
    details: "Updated contact number",
    ip: "192.168.1.6",
    date: "12 Jun 2026, 10:50 AM",
  },
  {
    id: 6,
    name: "Manoj Behera",
    email: "manoj.behera@example.com",
    type: "Viewed Course",
    typeBadge: "bg-teal-100 text-teal-700",
    typeIcon: <FaEye />,
    details: "Viewed MBA course details",
    ip: "192.168.1.2",
    date: "12 Jun 2026, 10:55 AM",
  },
  {
    id: 7,
    name: "Sweta Lenka",
    email: "sweta.lenka@example.com",
    type: "Removed from Wishlist",
    typeBadge: "bg-red-100 text-red-700",
    typeIcon: <FaHeart />,
    details: "Removed NIT Rourkela from wishlist",
    ip: "192.168.1.7",
    date: "12 Jun 2026, 11:00 AM",
  },
];

/* ── AVATAR COMPONENT ── */
const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const colors = [
    "bg-indigo-200 text-indigo-700",
    "bg-pink-200 text-pink-700",
    "bg-green-200 text-green-700",
    "bg-orange-200 text-orange-700",
    "bg-blue-200 text-blue-700",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${colors[idx]}`}
    >
      {initials}
    </div>
  );
};

/* ── MAIN COMPONENT ── */
const UserActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activityType, setActivityType] = useState("All Activities");
  const [userFilter, setUserFilter] = useState("All Users");

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Activity</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span>Home</span>
            <span className="text-gray-300">›</span>
            <span>Users</span>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">User Activity</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 flex items-center gap-2 shadow-sm">
            <span>05 Jun 2026 - 12 Jun 2026</span>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-sm">
            <FaDownload /> Export Report
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCardsData.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span
                className={`flex items-center gap-1 font-semibold ${
                  stat.isUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.isUp ? <FaArrowUp className="text-[10px]" /> : <FaArrowDown className="text-[10px]" />}
                {stat.trend}
              </span>
              <span className="text-gray-400">vs last 7 days</span>
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user name or email..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <select
            className="w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          >
            <option>All Activities</option>
            <option>Login</option>
            <option>Wishlist</option>
            <option>Enquiry</option>
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <select
            className="w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          >
            <option>All Users</option>
            <option>Active Users</option>
            <option>Inactive Users</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-indigo-500 transition"
          />
          <span className="text-gray-400">-</span>
          <input
            type="date"
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-sm">
            <FaFilter /> Filter
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-sm">
            <FaUndo /> Reset
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Activity Logs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 text-xs font-semibold">
              <tr>
                <th className="py-4 pl-6 pr-4">#</th>
                <th className="py-4 px-4">User</th>
                <th className="py-4 px-4">Activity Type</th>
                <th className="py-4 px-4">Details</th>
                <th className="py-4 px-4">IP Address</th>
                <th className="py-4 px-4">Date & Time</th>
                <th className="py-4 pr-6 pl-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activityLogsData.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition group">
                  <td className="py-3 pl-6 pr-4 text-gray-500 font-medium">
                    {log.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={log.name} />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {log.name}
                        </p>
                        <p className="text-gray-400 text-xs">{log.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${log.typeBadge}`}
                    >
                      {log.typeIcon}
                      {log.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{log.details}</td>
                  <td className="py-3 px-4 text-gray-500">{log.ip}</td>
                  <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                    {log.date}
                  </td>
                  <td className="py-3 pr-6 pl-4 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg transition opacity-0 group-hover:opacity-100">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1 to 10 of 12,458 entries</div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400 transition">
              <FaChevronLeft className="text-xs" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 font-semibold border border-indigo-100 transition">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600 transition">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600 transition">
              3
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600 transition">
              1246
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
