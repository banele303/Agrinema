"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { 
  Edit, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Clock,
  Package,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react"
import { Order } from "@/types/product"

interface OrderManagementProps {
  orders: Order[]
  onUpdateOrder: (orderId: string, updates: Partial<Order>) => Promise<void>
  onDeleteOrder: (orderId: string) => Promise<void>
}

export default function OrderManagement({ orders, onUpdateOrder, onDeleteOrder }: OrderManagementProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    status: "",
    notes: "",
    deliveryDate: ""
  })

  const statusConfig = {
    pending: { 
      bgColor: "bg-orange-50 dark:bg-orange-900/20", 
      textColor: "text-orange-700 dark:text-orange-300",
      icon: Clock 
    },
    confirmed: { 
      bgColor: "bg-blue-50 dark:bg-blue-900/20", 
      textColor: "text-blue-700 dark:text-blue-300",
      icon: CheckCircle 
    },
    preparing: { 
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20", 
      textColor: "text-yellow-700 dark:text-yellow-300",
      icon: RefreshCw 
    },
    ready: { 
      bgColor: "bg-purple-50 dark:bg-purple-900/20", 
      textColor: "text-purple-700 dark:text-purple-300",
      icon: Package 
    },
    completed: { 
      bgColor: "bg-green-50 dark:bg-green-900/20", 
      textColor: "text-green-700 dark:text-green-300",
      icon: CheckCircle 
    },
    cancelled: { 
      bgColor: "bg-red-50 dark:bg-red-900/20", 
      textColor: "text-red-700 dark:text-red-300",
      icon: XCircle 
    }
  }

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order)
    setEditForm({
      status: order.status,
      notes: order.notes || "",
      deliveryDate: order.deliveryDate ? new Date(order.deliveryDate).toISOString().split('T')[0] : ""
    })
    setIsEditModalOpen(true)
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsViewModalOpen(true)
  }

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await onUpdateOrder(orderId, { 
        status: newStatus as Order['status']
      })
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const handleSaveEdit = async () => {
    if (!selectedOrder) return

    try {
      const updates: Partial<Order> = {
        status: editForm.status as Order['status'],
        notes: editForm.notes
      }

      if (editForm.deliveryDate) {
        updates.deliveryDate = new Date(editForm.deliveryDate).toISOString()
      }

      await onUpdateOrder(selectedOrder.id, updates)
      setIsEditModalOpen(false)
      setSelectedOrder(null)
    } catch (error) {
      console.error('Error saving order:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order Management</h3>
          <p className="text-gray-600 dark:text-gray-400">Manage customer orders and track their progress</p>
        </div>
        <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800">
          {orders.length} Orders
        </Badge>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No orders found</h4>
              <p className="text-gray-500 dark:text-gray-400">Orders will appear here when customers place them.</p>
            </CardContent>
          </Card>
        ) : (
          orders.map((order, index) => {
            const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
            const StatusIcon = statusInfo?.icon || AlertCircle

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                              {order.customerName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white">{order.customerName}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Order #{order.id}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              R{order.totalAmount.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Qty: {order.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{order.location?.name || 'Unknown Location'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>{order.customerPhone}</span>
                          </div>
                          {order.customerEmail && (
                            <div className="flex items-center space-x-1">
                              <Mail className="h-4 w-4" />
                              <span>{order.customerEmail}</span>
                            </div>
                          )}
                        </div>

                        {order.notes && (
                          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              <strong>Notes:</strong> {order.notes}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 lg:min-w-[200px]">
                        <div className={`flex items-center space-x-2 p-3 rounded-xl ${statusInfo?.bgColor}`}>
                          <StatusIcon className={`h-5 w-5 ${statusInfo?.textColor}`} />
                          <span className={`font-medium ${statusInfo?.textColor} capitalize`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewOrder(order)}
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditOrder(order)}
                            className="flex-1"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Order</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete order #{order.id}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => onDeleteOrder(order.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {Object.entries(statusConfig).map(([status, config]) => {
                            if (status === order.status) return null
                            const QuickIcon = config.icon
                            return (
                              <Button
                                key={status}
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateStatus(order.id, status)}
                                className="p-2 h-8"
                                title={`Mark as ${status}`}
                              >
                                <QuickIcon className="h-3 w-3" />
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        )}
      </div>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Complete information for order #{selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Customer</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedOrder.customerPhone}</p>
                </div>
                {selectedOrder.customerEmail && (
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedOrder.customerEmail}</p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedOrder.location?.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Order Date</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(selectedOrder.orderDate).toLocaleDateString()}
                  </p>
                </div>
                {selectedOrder.deliveryDate && (
                  <div>
                    <Label className="text-sm font-medium">Delivery Date</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(selectedOrder.deliveryDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium">Quantity</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedOrder.quantity}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Amount</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">R{selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              {selectedOrder.notes && (
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>
              Update order status and details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={editForm.status} onValueChange={(value) => setEditForm({...editForm, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={editForm.deliveryDate}
                onChange={(e) => setEditForm({...editForm, deliveryDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={editForm.notes}
                onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                placeholder="Add notes about this order..."
                rows={3}
              />
            </div>
            <div className="flex space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} className="flex-1">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
