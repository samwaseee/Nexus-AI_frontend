"use client";

import { DollarSign, TrendingUp, TrendingDown, Download, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { formatCurrency, formatDate } from "@/lib/utils";

const monthlyData = [
  { month: "Jan", earned: 1200, withdrawn: 800 },
  { month: "Feb", earned: 1800, withdrawn: 1200 },
  { month: "Mar", earned: 1400, withdrawn: 1000 },
  { month: "Apr", earned: 2200, withdrawn: 1500 },
  { month: "May", earned: 1900, withdrawn: 1800 },
  { month: "Jun", earned: 2800, withdrawn: 2000 },
  { month: "Jul", earned: 3100, withdrawn: 2500 },
];

const transactions = [
  { id: "TXN-001", type: "credit", description: "Payment for Next.js project", amount: 799, date: "2025-04-05", status: "completed" },
  { id: "TXN-002", type: "withdrawal", description: "Bank transfer", amount: 1500, date: "2025-04-03", status: "completed" },
  { id: "TXN-003", type: "credit", description: "UI/UX Design project milestone", amount: 350, date: "2025-04-01", status: "completed" },
  { id: "TXN-004", type: "credit", description: "AWS setup consultation", amount: 450, date: "2025-03-28", status: "completed" },
  { id: "TXN-005", type: "withdrawal", description: "Bank transfer", amount: 1000, date: "2025-03-20", status: "completed" },
  { id: "TXN-006", type: "credit", description: "ML model delivery", amount: 2499, date: "2025-03-15", status: "pending" },
];

export default function FinancesPage() {
  const totalEarned = monthlyData.reduce((sum, m) => sum + m.earned, 0);
  const totalWithdrawn = monthlyData.reduce((sum, m) => sum + m.withdrawn, 0);
  const balance = totalEarned - totalWithdrawn;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finances</h1>
          <p className="text-muted-foreground">Track your earnings, withdrawals, and transactions.</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Available Balance</span>
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary">{formatCurrency(balance)}</div>
            <Button size="sm" className="mt-3 w-full">Withdraw Funds</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Earned</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold">{formatCurrency(totalEarned)}</div>
            <p className="text-xs text-muted-foreground mt-1">All time earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Withdrawn</span>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">{formatCurrency(totalWithdrawn)}</div>
            <p className="text-xs text-muted-foreground mt-1">All time withdrawals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Monthly Earnings</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Line type="monotone" dataKey="earned" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Earned" />
                <Line type="monotone" dataKey="withdrawn" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} name="Withdrawn" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Earned vs Withdrawn</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Bar dataKey="earned" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Earned" />
                <Bar dataKey="withdrawn" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Withdrawn" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Recent Transactions</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    txn.type === "credit" ? "bg-green-500/10" : "bg-orange-500/10"
                  }`}>
                    {txn.type === "credit"
                      ? <ArrowUpRight className="h-4 w-4 text-green-600" />
                      : <ArrowDownRight className="h-4 w-4 text-orange-600" />
                    }
                  </div>
                  <div>
                    <div className="text-sm font-medium">{txn.description}</div>
                    <div className="text-xs text-muted-foreground">{txn.id} · {formatDate(txn.date)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={txn.status === "completed" ? "default" : "secondary"} className="text-xs">
                    {txn.status}
                  </Badge>
                  <span className={`font-bold text-sm ${txn.type === "credit" ? "text-green-600" : "text-foreground"}`}>
                    {txn.type === "credit" ? "+" : "-"}{formatCurrency(txn.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}