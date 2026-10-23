import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, RefreshCw, Printer, Download, CheckCircle2, AlertCircle, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Order, MenuItem } from '../types';
import { loginStaff, getOrders, updateOrderStatus, toggleItemAvailability } from '../api';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  menu: MenuItem[];
  onRefreshMenu: () => void;
  onPrintTicket: (order: Order) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  menu,
  onRefreshMenu,
  onPrintTicket
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('kb_admin_token'));
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [branchFilter, setBranchFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      loadOrders();
    }
  }, [token, branchFilter, dateFilter]);

  if (!isOpen) return null;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await loginStaff(username.trim(), password.trim());
      if (res.success && res.token) {
        setToken(res.token);
        localStorage.setItem('kb_admin_token', res.token);
      } else {
        setLoginError(res.error || 'Invalid credentials');
      }
    } catch {
      setLoginError('Authentication server error');
    } finally {
      setIsLoggingIn(false);
    }
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem('kb_admin_token');
    setUsername('');
    setPassword('');
    setOrders([]);
  }

  async function loadOrders() {
    if (!token) return;
    setOrdersLoading(true);
    setActionError(null);
    try {
      const res = await getOrders(token, {
        branch: branchFilter || undefined,
        date: dateFilter || undefined
      });
      if (res.success && res.orders) {
        setOrders(res.orders);
      } else {
        if (res.error?.includes('Unauthorized') || res.error?.includes('token')) {
          handleLogout();
        }
        setActionError(res.error || 'Could not fetch orders');
      }
    } catch {
      setActionError('Failed to load orders from server');
    } finally {
      setOrdersLoading(false);
    }
  }

  function getNextStatus(current: string): string {
    if (current === 'Received') return 'Preparing';
    if (current === 'Preparing') return 'Out for Delivery';
    if (current === 'Out for Delivery') return 'Delivered';
    return 'Delivered';
  }

  async function handleAdvanceStatus(order: Order) {
    if (!token) return;
    const next = getNextStatus(order.status);
    if (next === order.status) return;

    setUpdatingOrderId(order.id);
    setActionError(null);
    setActionSuccess(null);

    try {
      const res = await updateOrderStatus(token, order.id, next);
      if (res.success && res.order) {
        setOrders(prev => prev.map(o => o.id === order.id ? res.order! : o));
        setActionSuccess(`Order ${order.orderId} updated to ${next}`);
        setTimeout(() => setActionSuccess(null), 3000);
      } else {
        setActionError(res.error || 'Could not advance order');
      }
    } catch {
      setActionError('Network error updating status');
    } finally {
      setUpdatingOrderId(null);
    }
  }

  async function handleToggleStock(itemId: string) {
    if (!token) return;
    setActionError(null);
    try {
      const res = await toggleItemAvailability(token, itemId);
      if (res.success) {
        onRefreshMenu();
      } else {
        setActionError(res.error || 'Could not update item stock');
      }
    } catch {
      setActionError('Network error updating catalog');
    }
  }

  function handleExportCsv() {
    if (orders.length === 0) return;

    const headers = ['Order ID,Branch,Status,Customer Name,Phone,Address,Items,Total,Created At'];
    const rows = orders.map(o => {
      const itemsStr = o.items.map(i => `${i.qty}x ${i.name || i.id}`).join(' | ');
      return `"${o.orderId}","${o.branch}","${o.status}","${o.customer.name.replace(/"/g, '""')}","${o.customer.phone}","${o.customer.address.replace(/"/g, '""')}","${itemsStr.replace(/"/g, '""')}",${o.total},"${o.created_at}"`;
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `karachi-bites-orders-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241810]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FFFDF8] rounded-3xl max-w-4xl w-full border border-[#EFE2CD] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EFE2CD] flex items-center justify-between bg-[#FFF8EA] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#C86314] text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#241810]">
                Karachi Bites — Staff Administration Portal
              </h2>
              <p className="text-xs text-[#766457]">
                Secure branch dispatch, order state advancement, and menu availability
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-[#241810] rounded-xl hover:bg-[#FAF6ED] transition-colors cursor-pointer"
            aria-label="Close Admin Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!token ? (
            /* Login Gate */
            <div className="max-w-sm mx-auto py-8 space-y-5">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-[#FFF8EA] border border-[#EFE2CD] text-[#C86314] flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#241810]">Staff Authentication</h3>
                <p className="text-xs text-[#766457]">
                  Enter verified kitchen credentials to access branch queues
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 bg-red-50 border-2 border-red-500 rounded-2xl text-xs text-red-700 flex items-start gap-2.5 font-medium shadow-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#241810] mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter staff username"
                    required
                    className="w-full text-sm bg-[#FAF6ED] border border-[#EFE2CD] rounded-xl px-3 py-2 text-[#241810] placeholder-[#8B776A] focus:outline-none focus:ring-2 focus:ring-[#C86314]/25 focus:border-[#C86314]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#241810] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter staff password"
                      required
                      className="w-full text-sm bg-[#FAF6ED] border border-[#EFE2CD] rounded-xl px-3 py-2 pr-10 text-[#241810] placeholder-[#8B776A] focus:outline-none focus:ring-2 focus:ring-[#C86314]/25 focus:border-[#C86314]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#241810] p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-[#C86314] hover:bg-[#B8550D] text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer min-h-[42px]"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Sign In to Staff Portal'
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Protected Dashboard */
            <div className="space-y-6">
              {/* Navigation Tabs and Logout */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EFE2CD]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                      activeTab === 'orders'
                        ? 'bg-[#C86314] text-white shadow-xs'
                        : 'bg-[#FAF6ED] text-[#766457] border border-[#EFE2CD] hover:text-[#241810]'
                    }`}
                  >
                    Branch Orders Queue ({orders.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                      activeTab === 'menu'
                        ? 'bg-[#C86314] text-white shadow-xs'
                        : 'bg-[#FAF6ED] text-[#766457] border border-[#EFE2CD] hover:text-[#241810]'
                    }`}
                  >
                    Menu Availability Stock ({menu.length})
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={loadOrders}
                    className="p-2 text-[#766457] hover:text-[#241810] bg-[#FAF6ED] border border-[#EFE2CD] rounded-xl text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                    title="Reload Orders"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${ordersLoading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  <button
                    onClick={handleExportCsv}
                    className="p-2 text-[#766457] hover:text-[#241810] bg-[#FAF6ED] border border-[#EFE2CD] rounded-xl text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                    title="Export CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="text-xs text-[#C86314] hover:underline px-2 cursor-pointer font-bold"
                  >
                    Log Out
                  </button>
                </div>
              </div>

              {/* Feedback banners */}
              {actionError && (
                <div className="p-3.5 bg-red-50 border-2 border-red-500 rounded-2xl text-xs text-red-700 flex items-start gap-2.5 font-medium shadow-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{actionError}</span>
                </div>
              )}

              {actionSuccess && (
                <div className="p-3.5 bg-emerald-50 border-2 border-emerald-500 rounded-2xl text-xs text-emerald-800 flex items-start gap-2.5 font-medium shadow-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <span>{actionSuccess}</span>
                </div>
              )}

              {activeTab === 'orders' ? (
                <>
                  {/* Filter Toolbar */}
                  <div className="bg-[#FAF6ED] p-4 rounded-2xl border border-[#EFE2CD] flex flex-wrap items-center gap-3">
                    {/* Branch Filter */}
                    <div className="flex-1 min-w-[150px]">
                      <label className="block text-[11px] font-bold text-[#766457] mb-1">
                        Filter by Branch
                      </label>
                      <select
                        value={branchFilter}
                        onChange={(e) => setBranchFilter(e.target.value)}
                        className="w-full text-xs bg-white border border-[#EFE2CD] rounded-xl px-3 py-2 text-[#241810] focus:outline-none focus:ring-1 focus:ring-[#C86314]"
                      >
                        <option value="">All Branches</option>
                        <option value="Clifton">Clifton</option>
                        <option value="Gulshan-e-Iqbal">Gulshan-e-Iqbal</option>
                        <option value="North Nazimabad">North Nazimabad</option>
                      </select>
                    </div>

                    {/* Date Filter */}
                    <div className="flex-1 min-w-[150px]">
                      <label className="block text-[11px] font-bold text-[#766457] mb-1">
                        Filter by Date (YYYY-MM-DD)
                      </label>
                      <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full text-xs bg-white border border-[#EFE2CD] rounded-xl px-3 py-2 text-[#241810] focus:outline-none focus:ring-1 focus:ring-[#C86314]"
                      />
                    </div>

                    {(branchFilter || dateFilter) && (
                      <div className="pt-4">
                        <button
                          onClick={() => {
                            setBranchFilter('');
                            setDateFilter('');
                          }}
                          className="text-xs text-[#C86314] hover:underline cursor-pointer font-bold"
                        >
                          Clear Filters
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Orders List */}
                  {ordersLoading ? (
                    <div className="py-12 text-center text-[#766457] text-xs flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#C86314]" />
                      Loading branch queue...
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="py-12 text-center text-[#766457] text-xs">
                      No orders found matching the filter criteria.
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {orders.map((order) => {
                        const nextStatus = getNextStatus(order.status);
                        const isDelivered = order.status === 'Delivered';
                        const isUpdating = updatingOrderId === order.id;

                        let statusColor = 'bg-[#C86314]/10 text-[#C86314] border-[#C86314]/30';
                        if (order.status === 'Preparing') statusColor = 'bg-[#F7C44E]/30 text-[#8D6B1F] border-[#E8B237]';
                        if (order.status === 'Out for Delivery') statusColor = 'bg-[#F7C44E]/40 text-[#8D6B1F] border-[#E8B237]';
                        if (order.status === 'Delivered') statusColor = 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/30';

                        return (
                          <div
                            key={order.id}
                            className="bg-white border border-[#EFE2CD] rounded-2xl p-4.5 space-y-3.5 shadow-2xs hover:border-[#C86314]/40 transition-all"
                          >
                            {/* Order Header */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE2CD] pb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-sm text-[#241810]">{order.orderId}</span>
                                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                                  {order.status}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-[#766457]">
                                <span>{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                <span>·</span>
                                <strong className="text-[#241810]">{order.branch}</strong>
                              </div>
                            </div>

                            {/* Customer and Delivery info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-[#766457]">Customer: </span>
                                <strong className="text-[#241810]">{order.customer.name}</strong> ({order.customer.phone})
                              </div>
                              <div className="truncate">
                                <span className="text-[#766457]">Address: </span>
                                <span className="text-[#241810] font-medium">{order.customer.address}</span>
                              </div>
                            </div>

                            {/* Item List */}
                            <div className="p-3 bg-[#FAF6ED] rounded-xl text-xs space-y-1.5 border border-[#EFE2CD]">
                              {order.items.map((it, idx) => (
                                <div key={idx} className="flex justify-between text-[#241810]">
                                  <span className="font-medium">{it.qty}× {it.name || `Item #${it.id}`}</span>
                                  <span className="tabular-nums font-bold">Rs. {(it.price || 0) * it.qty}</span>
                                </div>
                              ))}
                              {order.notes && (
                                <p className="text-[11px] text-[#766457] italic pt-1 border-t border-[#EFE2CD]">
                                  Note: "{order.notes}"
                                </p>
                              )}
                              <div className="flex justify-between font-black pt-2 border-t border-[#EFE2CD] text-xs text-[#241810]">
                                <span>Total (inc. Rs. {order.deliveryFee || 150} delivery):</span>
                                <span className="text-[#C86314] tabular-nums font-bold">Rs. {order.total}</span>
                              </div>
                            </div>

                            {/* Actions Footer */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                              <button
                                onClick={() => onPrintTicket(order)}
                                className="inline-flex items-center gap-1.5 text-xs text-[#766457] hover:text-[#241810] border border-[#EFE2CD] px-3 py-1.5 rounded-lg bg-white hover:bg-[#FAF6ED] cursor-pointer font-medium transition-colors"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                Kitchen Ticket
                              </button>

                              {isDelivered ? (
                                <span className="text-xs font-bold text-[#2E7D32] flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" />
                                  Order Completed
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleAdvanceStatus(order)}
                                  disabled={isUpdating}
                                  className="bg-[#C86314] hover:bg-[#B8550D] text-white px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer disabled:opacity-50 min-h-[38px]"
                                >
                                  {isUpdating ? (
                                    <>
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                      Updating...
                                    </>
                                  ) : (
                                    <>
                                      Advance to "{nextStatus}"
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                /* Menu Availability Management */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#241810]">Catalog Item Availability</h3>
                      <p className="text-xs text-[#766457]">Toggle items out-of-stock when kitchen runs out of ingredients</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {menu.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 bg-white rounded-2xl border border-[#EFE2CD] flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div>
                          <div className="font-bold text-xs text-[#241810]">
                            #{item.id} · {item.name}
                          </div>
                          <div className="text-[11px] text-[#766457]">
                            {item.category} · Rs. {item.price}
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleStock(String(item.id))}
                          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                            item.available !== false
                              ? 'bg-[#2E7D32]/10 text-[#2E7D32] hover:bg-[#2E7D32]/20 border border-[#2E7D32]/30'
                              : 'bg-red-50 text-[#C86314] hover:bg-red-100 border border-red-200'
                          }`}
                        >
                          {item.available !== false ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
