"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

export function MetricsCharts() {
  // Mock data for charts
  const accuracyData = [
    { name: "Respiratory", accuracy: 94 },
    { name: "Cardiovascular", accuracy: 91 },
    { name: "Neurological", accuracy: 88 },
    { name: "Gastrointestinal", accuracy: 92 },
    { name: "Musculoskeletal", accuracy: 89 },
  ]

  const sourceData = [
    { name: "ClinicalTrials.gov", value: 65 },
    { name: "WHO ICTRP", value: 20 },
    { name: "EU Clinical Trials", value: 10 },
    { name: "Other", value: 5 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const performanceData = [
    { month: "Jan", precision: 85, recall: 78 },
    { month: "Feb", precision: 87, recall: 80 },
    { month: "Mar", precision: 89, recall: 82 },
    { month: "Apr", precision: 90, recall: 85 },
    { month: "May", precision: 92, recall: 87 },
    { month: "Jun", precision: 94, recall: 89 },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="accuracy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accuracy">Mapping Accuracy</TabsTrigger>
          <TabsTrigger value="sources">Source Contribution</TabsTrigger>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="accuracy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Biomarker Mapping Accuracy by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={accuracyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="accuracy" name="Accuracy %" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Trial Data Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Precision and Recall Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="precision" name="Precision" stroke="#0ea5e9" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="recall" name="Recall" stroke="#f97316" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
