"use client"

import { useState } from "react"
import {
  Bell,
  Calendar,
  Heart,
  MessageSquare,
  Search,
  Settings,
  Shield,
  Users,
  Activity,
  MapPin,
  Clock,
  Phone,
  AlertTriangle,
  CheckCircle,
  User,
  FileText,
  Send,
  Filter,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

export default function ThalAIDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState(null)
  const [messageText, setMessageText] = useState("")
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    bloodType: "",
    distance: "",
  })
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New donor match found nearby", time: "5 min ago", read: false },
    { id: 2, message: "Transfusion reminder: Tomorrow at 10 AM", time: "2 hours ago", read: false },
    { id: 3, message: "Dr. Mehta sent you a message", time: "1 day ago", read: true },
  ])

  const handleEmergencyContact = () => {
    setShowEmergencyModal(true)
  }

  const handleCallEmergency = (type) => {
    toast({
      title: "Emergency Contact",
      description: `Calling ${type}... Please wait.`,
    })
    setShowEmergencyModal(false)
  }

  const handleSendMessage = (donorName) => {
    if (!messageText.trim()) return

    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${donorName}`,
    })
    setMessageText("")
    setShowMessageModal(false)
    setSelectedDonor(null)
  }

  const handleCallDonor = (donorName) => {
    toast({
      title: "Calling Donor",
      description: `Initiating call to ${donorName}...`,
    })
  }

  const handleScheduleTransfusion = (formData) => {
    toast({
      title: "Transfusion Scheduled",
      description: "Your transfusion has been scheduled successfully.",
    })
    setShowScheduleModal(false)
  }

  const handleReschedule = (date) => {
    toast({
      title: "Rescheduling",
      description: `Rescheduling transfusion for ${date}...`,
    })
  }

  const handleCancel = (date) => {
    toast({
      title: "Cancellation",
      description: `Cancelling transfusion for ${date}...`,
    })
  }

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Donor search updated with new filters.",
    })
    setShowAdvancedSearch(false)
  }

  const markNotificationRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ThalAI</span>
          </div>
        </div>

        <nav className="px-4 space-y-2">
          <Button
            variant={activeTab === "dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("dashboard")}
          >
            <Activity className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === "donors" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("donors")}
          >
            <Users className="w-4 h-4 mr-2" />
            Find Donors
          </Button>
          <Button
            variant={activeTab === "transfusions" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("transfusions")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Transfusions
          </Button>
          <Button
            variant={activeTab === "messages" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("messages")}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </Button>
          <Button
            variant={activeTab === "records" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("records")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Medical Records
          </Button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={() => setShowSettingsModal(true)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Priya</h1>
              <p className="text-gray-600">Your next transfusion is in 3 days</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleEmergencyContact}>
                <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                Emergency
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {notifications.filter((n) => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Notifications</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border rounded-lg cursor-pointer ${
                          notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                        }`}
                        onClick={() => markNotificationRead(notification.id)}
                      >
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <Avatar className="cursor-pointer">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>PK</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Donors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+3 from last week</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Transfusion</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3 Days</div>
                    <p className="text-xs text-muted-foreground">Dec 15, 2024</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Hemoglobin Level</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.2 g/dL</div>
                    <p className="text-xs text-muted-foreground">Last updated today</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Support Network</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Active connections</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity & Donor Matches */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Donors</CardTitle>
                    <CardDescription>Compatible donors within 10km</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Rajesh Kumar", distance: "2.3 km", compatibility: "100%", lastDonation: "2 weeks ago" },
                      { name: "Anita Sharma", distance: "4.1 km", compatibility: "95%", lastDonation: "1 month ago" },
                      { name: "Vikram Singh", distance: "6.8 km", compatibility: "90%", lastDonation: "3 weeks ago" },
                    ].map((donor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {donor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{donor.name}</p>
                            <p className="text-sm text-gray-600">
                              {donor.distance} • {donor.lastDonation}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{donor.compatibility}</Badge>
                          <Button
                            size="sm"
                            className="ml-2"
                            onClick={() => {
                              setSelectedDonor(donor)
                              setShowMessageModal(true)
                            }}
                          >
                            Contact
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>Latest communications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        from: "Dr. Mehta",
                        message: "Your latest test results look good. Continue with current treatment.",
                        time: "2 hours ago",
                        type: "doctor",
                      },
                      {
                        from: "Rajesh Kumar",
                        message: "I'm available for donation next week. Let me know!",
                        time: "5 hours ago",
                        type: "donor",
                      },
                      {
                        from: "Support Team",
                        message: "Reminder: Your transfusion is scheduled for Dec 15",
                        time: "1 day ago",
                        type: "system",
                      },
                    ].map((msg, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {msg.from
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{msg.from}</p>
                            <Badge variant="outline" className="text-xs">
                              {msg.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Health Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Tracking</CardTitle>
                  <CardDescription>Your recent health metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Hemoglobin</span>
                        <span className="text-sm text-gray-600">8.2 g/dL</span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Target: 12 g/dL</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Iron Levels</span>
                        <span className="text-sm text-gray-600">Normal</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Within range</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Treatment Adherence</span>
                        <span className="text-sm text-gray-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Excellent compliance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "donors" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Find Compatible Donors</h2>
                <Button onClick={() => setShowAdvancedSearch(true)}>
                  <Search className="w-4 h-4 mr-2" />
                  Advanced Search
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                      placeholder="Location"
                      value={searchFilters.location}
                      onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                    />
                    <Select
                      value={searchFilters.bloodType}
                      onValueChange={(value) => setSearchFilters({ ...searchFilters, bloodType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Blood Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Distance (km)"
                      type="number"
                      value={searchFilters.distance}
                      onChange={(e) => setSearchFilters({ ...searchFilters, distance: e.target.value })}
                    />
                    <Button onClick={handleApplyFilters}>
                      <Filter className="w-4 h-4 mr-2" />
                      Apply Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Rajesh Kumar",
                    bloodType: "B+",
                    distance: "2.3 km",
                    compatibility: "100%",
                    verified: true,
                    donations: 15,
                  },
                  {
                    name: "Anita Sharma",
                    bloodType: "B+",
                    distance: "4.1 km",
                    compatibility: "95%",
                    verified: true,
                    donations: 8,
                  },
                  {
                    name: "Vikram Singh",
                    bloodType: "B+",
                    distance: "6.8 km",
                    compatibility: "90%",
                    verified: false,
                    donations: 12,
                  },
                  {
                    name: "Priya Patel",
                    bloodType: "B+",
                    distance: "8.2 km",
                    compatibility: "100%",
                    verified: true,
                    donations: 20,
                  },
                  {
                    name: "Amit Gupta",
                    bloodType: "B+",
                    distance: "9.1 km",
                    compatibility: "85%",
                    verified: true,
                    donations: 5,
                  },
                  {
                    name: "Sunita Rao",
                    bloodType: "B+",
                    distance: "9.8 km",
                    compatibility: "95%",
                    verified: true,
                    donations: 18,
                  },
                ].map((donor, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {donor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{donor.name}</CardTitle>
                            <CardDescription>
                              {donor.bloodType} • {donor.distance}
                            </CardDescription>
                          </div>
                        </div>
                        {donor.verified && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Compatibility</span>
                          <Badge variant="secondary">{donor.compatibility}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Donations</span>
                          <span className="text-sm font-medium">{donor.donations}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setSelectedDonor(donor)
                              setShowMessageModal(true)
                            }}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => handleCallDonor(donor.name)}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "transfusions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Transfusion Schedule</h2>
                <Button onClick={() => setShowScheduleModal(true)}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule New
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Transfusions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        date: "Dec 15, 2024",
                        time: "10:00 AM",
                        hospital: "Apollo Hospital",
                        doctor: "Dr. Mehta",
                        status: "confirmed",
                      },
                      {
                        date: "Jan 12, 2025",
                        time: "2:00 PM",
                        hospital: "Max Healthcare",
                        doctor: "Dr. Singh",
                        status: "pending",
                      },
                      {
                        date: "Feb 9, 2025",
                        time: "11:00 AM",
                        hospital: "Apollo Hospital",
                        doctor: "Dr. Mehta",
                        status: "scheduled",
                      },
                    ].map((transfusion, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{transfusion.date}</h3>
                          <Badge variant={transfusion.status === "confirmed" ? "default" : "secondary"}>
                            {transfusion.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {transfusion.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {transfusion.hospital}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {transfusion.doctor}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" onClick={() => handleReschedule(transfusion.date)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleCancel(transfusion.date)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transfusion History</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { date: "Nov 18, 2024", units: "2 units", reaction: "None", hospital: "Apollo Hospital" },
                      { date: "Oct 21, 2024", units: "2 units", reaction: "Mild fever", hospital: "Max Healthcare" },
                      { date: "Sep 23, 2024", units: "2 units", reaction: "None", hospital: "Apollo Hospital" },
                    ].map((history, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{history.date}</h3>
                          <Badge variant="outline">{history.units}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {history.hospital}
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Reaction: {history.reaction}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Messages</h2>
                <Button onClick={() => setShowMessageModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Message
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Conversations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { name: "Dr. Mehta", lastMessage: "Your test results look good", time: "2h", unread: 0 },
                      { name: "Rajesh Kumar", lastMessage: "Available for donation", time: "5h", unread: 2 },
                      { name: "Support Team", lastMessage: "Transfusion reminder", time: "1d", unread: 0 },
                      { name: "Anita Sharma", lastMessage: "Thank you for connecting", time: "2d", unread: 1 },
                    ].map((conversation, index) => (
                      <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {conversation.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{conversation.name}</p>
                              <p className="text-xs text-gray-600">{conversation.lastMessage}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">{conversation.time}</p>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="text-xs mt-1">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Chat with Dr. Mehta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 h-96 overflow-y-auto mb-4">
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                          <p className="text-sm">
                            Your latest test results look good. Continue with current treatment.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                          <p className="text-sm">
                            Thank you, Doctor. Should I continue with the same medication dosage?
                          </p>
                          <p className="text-xs text-blue-100 mt-1">1 hour ago</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                          <p className="text-sm">
                            Yes, maintain the current dosage. We'll review again after your next transfusion.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">30 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage("Dr. Mehta")}
                      />
                      <Button onClick={() => handleSendMessage("Dr. Mehta")}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "records" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Medical Records</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Record
                </Button>
              </div>

              <Tabs defaultValue="lab-results" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="lab-results" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { date: "Dec 10, 2024", test: "Complete Blood Count", hb: "8.2 g/dL", status: "Normal" },
                      { date: "Nov 25, 2024", test: "Iron Studies", ferritin: "450 ng/mL", status: "Elevated" },
                      { date: "Nov 10, 2024", test: "Liver Function", alt: "35 U/L", status: "Normal" },
                      { date: "Oct 28, 2024", test: "Complete Blood Count", hb: "7.8 g/dL", status: "Low" },
                    ].map((result, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{result.test}</CardTitle>
                            <Badge
                              variant={
                                result.status === "Normal"
                                  ? "secondary"
                                  : result.status === "Low"
                                    ? "destructive"
                                    : "default"
                              }
                            >
                              {result.status}
                            </Badge>
                          </div>
                          <CardDescription>{result.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {result.hb && (
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Hemoglobin</span>
                                <span className="text-sm font-medium">{result.hb}</span>
                              </div>
                            )}
                            {result.ferritin && (
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Ferritin</span>
                                <span className="text-sm font-medium">{result.ferritin}</span>
                              </div>
                            )}
                            {result.alt && (
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">ALT</span>
                                <span className="text-sm font-medium">{result.alt}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="prescriptions" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        medication: "Deferasirox",
                        dosage: "500mg daily",
                        prescribed: "Dr. Mehta",
                        date: "Dec 1, 2024",
                      },
                      { medication: "Folic Acid", dosage: "5mg daily", prescribed: "Dr. Mehta", date: "Nov 15, 2024" },
                      {
                        medication: "Vitamin D3",
                        dosage: "1000 IU daily",
                        prescribed: "Dr. Singh",
                        date: "Oct 20, 2024",
                      },
                    ].map((prescription, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-lg">{prescription.medication}</CardTitle>
                          <CardDescription>Prescribed by {prescription.prescribed}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Dosage</span>
                              <span className="text-sm font-medium">{prescription.dosage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Date</span>
                              <span className="text-sm font-medium">{prescription.date}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Annual Thalassemia Assessment",
                        doctor: "Dr. Mehta",
                        date: "Nov 30, 2024",
                        type: "PDF",
                      },
                      { title: "Cardiac Function Report", doctor: "Dr. Cardio", date: "Oct 15, 2024", type: "PDF" },
                      { title: "Liver MRI Report", doctor: "Dr. Radiology", date: "Sep 20, 2024", type: "PDF" },
                    ].map((report, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-blue-500" />
                            <div>
                              <h3 className="font-medium">{report.title}</h3>
                              <p className="text-sm text-gray-600">
                                {report.doctor} • {report.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{report.type}</Badge>
                            <Button size="sm" variant="outline">
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Treatment Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { date: "Dec 10, 2024", event: "Blood transfusion completed", location: "Apollo Hospital" },
                          { date: "Nov 25, 2024", event: "Iron chelation therapy adjusted", doctor: "Dr. Mehta" },
                          { date: "Nov 12, 2024", event: "Blood transfusion completed", location: "Apollo Hospital" },
                          { date: "Oct 28, 2024", event: "Routine check-up", doctor: "Dr. Mehta" },
                        ].map((event, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 border-l-2 border-blue-200">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <p className="font-medium">{event.event}</p>
                              <p className="text-sm text-gray-600">
                                {event.date} • {event.location || event.doctor}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>

      {/* Emergency Modal */}
      <Dialog open={showEmergencyModal} onOpenChange={setShowEmergencyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Emergency Contact</DialogTitle>
            <DialogDescription>Choose your emergency contact option</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => handleCallEmergency("Emergency Services (108)")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Emergency Services (108)
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleCallEmergency("Dr. Mehta")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Dr. Mehta
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleCallEmergency("Apollo Hospital")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Apollo Hospital
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleCallEmergency("Family Emergency Contact")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Family Emergency Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Modal */}
      <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              {selectedDonor ? `Send a message to ${selectedDonor.name}` : "Send a new message"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {!selectedDonor && (
              <div>
                <Label htmlFor="recipient">Recipient</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-mehta">Dr. Mehta</SelectItem>
                    <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                    <SelectItem value="anita">Anita Sharma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleSendMessage(selectedDonor?.name || "recipient")}
                disabled={!messageText.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" onClick={() => setShowMessageModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Transfusion Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule New Transfusion</DialogTitle>
            <DialogDescription>Book your next blood transfusion appointment</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
            <div>
              <Label htmlFor="hospital">Hospital</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select hospital" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apollo">Apollo Hospital</SelectItem>
                  <SelectItem value="max">Max Healthcare</SelectItem>
                  <SelectItem value="fortis">Fortis Hospital</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="doctor">Doctor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mehta">Dr. Mehta</SelectItem>
                  <SelectItem value="singh">Dr. Singh</SelectItem>
                  <SelectItem value="sharma">Dr. Sharma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea id="notes" placeholder="Any special requirements or notes..." />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleScheduleTransfusion()}>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Advanced Search Modal */}
      <Dialog open={showAdvancedSearch} onOpenChange={setShowAdvancedSearch}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Advanced Donor Search</DialogTitle>
            <DialogDescription>Find donors with specific criteria</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Enter city" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Enter state" />
              </div>
            </div>
            <div>
              <Label htmlFor="blood-type">Blood Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="max-distance">Maximum Distance (km)</Label>
              <Input id="max-distance" type="number" placeholder="50" />
            </div>
            <div>
              <Label htmlFor="min-donations">Minimum Donations</Label>
              <Input id="min-donations" type="number" placeholder="5" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="verified-only" />
              <Label htmlFor="verified-only">Verified donors only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="available-now" />
              <Label htmlFor="available-now">Available for immediate donation</Label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleApplyFilters}>
                <Search className="w-4 h-4 mr-2" />
                Search Donors
              </Button>
              <Button variant="outline" onClick={() => setShowAdvancedSearch(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Manage your account and preferences</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Priya Kumari" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="priya@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+91 9876543210" />
              </div>
              <div>
                <Label htmlFor="blood-type">Blood Type</Label>
                <Select defaultValue="B+">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Save Changes</Button>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Transfusion Reminders</Label>
                    <p className="text-sm text-gray-600">Get notified about upcoming transfusions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Donor Matches</Label>
                    <p className="text-sm text-gray-600">Notifications when new donors are found</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Emergency Alerts</Label>
                    <p className="text-sm text-gray-600">Critical health and emergency notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Messages</Label>
                    <p className="text-sm text-gray-600">New message notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button>Save Preferences</Button>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Share Location</Label>
                    <p className="text-sm text-gray-600">Allow location sharing for donor matching</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-gray-600">Make profile visible to verified donors</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Analytics</Label>
                    <p className="text-sm text-gray-600">Help improve platform with anonymous data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button>Update Privacy Settings</Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
