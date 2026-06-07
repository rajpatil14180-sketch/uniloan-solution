"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Download,
  LogOut,
  Users,
  Filter,
  RefreshCw,
  Shield,
} from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/types";

const STATUS_OPTIONS: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "closed",
];

const TYPE_OPTIONS = ["all", "eligibility", "contact", "partner", "service", "referral"];

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  qualified: "bg-purple-100 text-purple-700",
  converted: "bg-green-100 text-green-700",
  closed: "bg-grey-200 text-grey-600",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("query", query);
      if (typeFilter !== "all") params.set("type", typeFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);

      const res = await fetch(`/api/leads?${params}`, {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } finally {
      setLoading(false);
    }
  }, [password, query, typeFilter, statusFilter]);

  useEffect(() => {
    if (authenticated) fetchLeads();
  }, [authenticated, fetchLeads]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticated(true);
    sessionStorage.setItem("admin_auth", password);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_auth");
    if (saved) {
      setPassword(saved);
      setAuthenticated(true);
    }
  }, []);

  const handleStatusUpdate = async (id: string, status: LeadStatus) => {
    const res = await fetch("/api/leads", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) fetchLeads();
  };

  const handleExport = async () => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (typeFilter !== "all") params.set("type", typeFilter);
    if (statusFilter !== "all") params.set("status", statusFilter);

    const res = await fetch(`/api/leads/export?${params}`, {
      headers: { Authorization: `Bearer ${password}` },
    });
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `uniloan-leads-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const getLeadName = (lead: Lead) => {
    if (lead.type === "partner") return lead.contactName;
    if ("name" in lead) return lead.name;
    return "—";
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md glass-card rounded-3xl p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900">Admin Dashboard</h1>
            <p className="text-grey-500 text-sm mt-2">Uniloan Solution</p>
          </div>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-grey-200 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    eligibility: leads.filter((l) => l.type === "eligibility").length,
    partners: leads.filter((l) => l.type === "partner").length,
  };

  return (
    <div className="min-h-screen bg-grey-50">
      <header className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-gold-400" />
          <h1 className="font-bold text-lg">Uniloan Admin</h1>
        </div>
        <button
          onClick={() => {
            setAuthenticated(false);
            sessionStorage.removeItem("admin_auth");
          }}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: stats.total, icon: Users },
            { label: "New Leads", value: stats.new, icon: RefreshCw },
            { label: "Eligibility", value: stats.eligibility, icon: Filter },
            { label: "Partners", value: stats.partners, icon: Users },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-grey-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-grey-500 text-sm">{s.label}</p>
                  <p className="text-2xl font-bold text-navy-900 mt-1">{s.value}</p>
                </div>
                <s.icon className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-grey-200 p-4 mb-6 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400" />
            <input
              placeholder="Search leads..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchLeads()}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-grey-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-grey-200 text-sm"
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-grey-200 text-sm"
          >
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={fetchLeads}
            className="px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-500 cursor-pointer"
          >
            {loading ? "Loading..." : "Search"}
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-xl border border-grey-200 text-sm font-medium flex items-center gap-2 hover:bg-grey-50 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-grey-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-grey-50 border-b border-grey-200">
                  <th className="text-left px-4 py-3 font-semibold text-navy-900">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-navy-900">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-navy-900">Phone</th>
                  <th className="text-left px-4 py-3 font-semibold text-navy-900">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-navy-900">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-navy-900">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-navy-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-grey-400">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-grey-100 hover:bg-grey-50 cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-4 py-3 font-medium text-navy-900">
                        {getLeadName(lead)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium capitalize">
                          {lead.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-grey-600">{lead.phone}</td>
                      <td className="px-4 py-3 text-grey-600">{lead.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[lead.status]}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-grey-500 text-xs">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusUpdate(lead.id, e.target.value as LeadStatus)
                          }
                          className="text-xs px-2 py-1 rounded-lg border border-grey-200"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedLead && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedLead(null)}
          >
            <div
              className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-navy-900 mb-4">Lead Details</h3>
              <pre className="text-sm text-grey-600 whitespace-pre-wrap bg-grey-50 rounded-xl p-4">
                {JSON.stringify(selectedLead, null, 2)}
              </pre>
              <button
                onClick={() => setSelectedLead(null)}
                className="mt-4 w-full py-2.5 rounded-xl bg-navy-900 text-white text-sm font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
