import { Order, ORDER_STATUS_CONFIG, OrderStatus } from '@/types/order';
import { Clock, Phone, MapPin, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

const OrderCard = ({ order, onStatusChange }: OrderCardProps) => {
  const statusConfig = ORDER_STATUS_CONFIG[order.status];
  const timeAgo = getTimeAgo(order.createdAt);

  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-foreground">
              {order.orderNumber}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold text-primary-foreground ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
            <Clock className="w-3 h-3" />
            <span>{timeAgo}</span>
          </div>
        </div>
        <span className="text-xl font-bold text-primary">€{order.total.toFixed(2)}</span>
      </div>

      {/* Items */}
      <div className="bg-muted/50 rounded-lg p-3 mb-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center py-1">
            <span className="text-foreground">
              {item.quantity}x {item.pizzaName}
              <span className="text-muted-foreground text-sm ml-1">({item.size})</span>
            </span>
            <span className="text-muted-foreground">€{(item.quantity * item.unitPrice).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Customer Info */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-foreground">
          <span className="font-semibold">{order.customerName}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4" />
          <span>{order.customerPhone}</span>
        </div>
        {order.customerAddress && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{order.customerAddress}</span>
          </div>
        )}
        {order.notes && (
          <div className="flex items-start gap-2 text-accent">
            <MessageSquare className="w-4 h-4 mt-0.5" />
            <span className="italic">{order.notes}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-3 border-t border-border">
        <Select
          value={order.status}
          onValueChange={(value) => onStatusChange(order.id, value as OrderStatus)}
        >
          <SelectTrigger className="flex-1 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(ORDER_STATUS_CONFIG).map(([status, config]) => (
              <SelectItem key={status} value={status}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${config.color}`} />
                  {config.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Ahora mismo';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `Hace ${diffHours}h`;
  return `Hace ${Math.floor(diffHours / 24)} días`;
}

export default OrderCard;
