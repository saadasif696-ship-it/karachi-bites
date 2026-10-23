import { MenuItem, Order, Branch, CustomerInfo } from './types';
import { supabase } from './supabaseClient';

export async function getMenu(): Promise<MenuItem[]> {
  // 1. Attempt to fetch menu directly from Supabase database ('menu' or 'menu_items' table)
  try {
    const { data, error } = await supabase
      .from('menu')
      .select('*')
      .order('id', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((item: Record<string, unknown>) => ({
        id: Number(item.id),
        name: String(item.name || ''),
        category: String(item.category || 'Specialties'),
        price: Number(item.price || 0),
        tags: String(item.tags || 'mild'),
        available: item.available !== false,
        description: String(item.description || ''),
        image: (item.image as string) || (item.image_url as string),
        portion: item.portion as string | undefined,
        spiceLevel: (item.spice_level as string) || (item.spiceLevel as string | undefined)
      }));
    }

    // Fallback attempt for alternative table name 'menu_items'
    const { data: altData, error: altError } = await supabase
      .from('menu_items')
      .select('*')
      .order('id', { ascending: true });

    if (!altError && altData && altData.length > 0) {
      return altData.map((item: Record<string, unknown>) => ({
        id: Number(item.id),
        name: String(item.name || ''),
        category: String(item.category || 'Specialties'),
        price: Number(item.price || 0),
        tags: String(item.tags || 'mild'),
        available: item.available !== false,
        description: String(item.description || ''),
        image: (item.image as string) || (item.image_url as string),
        portion: item.portion as string | undefined,
        spiceLevel: (item.spice_level as string) || (item.spiceLevel as string | undefined)
      }));
    }
  } catch (supabaseErr) {
    console.warn('Direct Supabase fetch fallback initiated:', supabaseErr);
  }

  // 2. Fetch from Express backend /api/menu (guarantees seamless operation if table is pending creation)
  const res = await fetch('/api/menu');
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch menu (HTTP ${res.status})`);
  }
  return res.json();
}

export async function getBranches(): Promise<Branch[]> {
  const res = await fetch('/api/branches');
  if (!res.ok) {
    return [
      { id: 'clifton', name: 'Clifton', area: 'South Karachi', address: 'Block 4, Clifton, near Boat Basin, Karachi', phone: '021-35876543', deliveryEstimate: '30-40 min' },
      { id: 'gulshan', name: 'Gulshan-e-Iqbal', area: 'East Karachi', address: 'Block 13-B, Main University Road, Gulshan-e-Iqbal, Karachi', phone: '021-34987654', deliveryEstimate: '35-45 min' },
      { id: 'nazimabad', name: 'North Nazimabad', area: 'Central Karachi', address: 'Block H, Hydri Market, North Nazimabad, Karachi', phone: '021-36654321', deliveryEstimate: '40-50 min' }
    ];
  }
  return res.json();
}

export async function createOrder(payload: {
  customer: CustomerInfo;
  branch?: string;
  branchId?: string;
  items: { id: number | string; qty: number; name?: string; price?: number }[];
  notes?: string;
  googleUser?: { email: string; name: string; picture: string };
}): Promise<{ success: boolean; order?: { orderId: string; total: number; status: string }; error?: string; orderId?: string; total?: number; status?: string }> {
  const branchName = payload.branch || payload.branchId || 'Clifton';
  const branchClean = branchName.toLowerCase() === 'clifton' ? 'Clifton' :
    branchName.toLowerCase() === 'gulshan' ? 'Gulshan-e-Iqbal' :
    branchName.toLowerCase() === 'nazimabad' ? 'North Nazimabad' : branchName;

  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: payload.customer,
      branch: branchClean,
      items: payload.items.map(i => ({ id: Number(i.id), qty: Number(i.qty) })),
      notes: payload.notes || payload.customer.notes
    })
  });
  const data = await res.json();
  if (!res.ok) {
    return { success: false, error: data.error || `Order failed (HTTP ${res.status})` };
  }
  return {
    success: true,
    order: {
      orderId: data.orderId,
      total: data.total,
      status: data.status
    },
    orderId: data.orderId,
    total: data.total,
    status: data.status
  };
}

export async function getOrder(orderId: string, phone?: string): Promise<{ success: boolean; order?: Order; error?: string }> {
  const url = phone ? `/api/orders/${encodeURIComponent(orderId)}?phone=${encodeURIComponent(phone)}` : `/api/orders/${encodeURIComponent(orderId)}`;
  const res = await fetch(url, {
    headers: phone ? { 'x-customer-phone': phone } : {}
  });
  const data = await res.json();
  if (!res.ok) {
    return { success: false, error: data.error || `Order lookup failed (HTTP ${res.status})` };
  }
  return { success: true, order: data };
}

export async function loginAdmin(username: string, password: string): Promise<{ token: string }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Invalid credentials');
  }
  return data;
}

export async function loginStaff(username: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const res = await loginAdmin(username, password);
    return { success: true, token: res.token };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid credentials';
    return { success: false, error: msg };
  }
}

export async function getAdminOrders(token: string, branch?: string, date?: string): Promise<Order[]> {
  const params = new URLSearchParams();
  if (branch) params.set('branch', branch);
  if (date) params.set('date', date);

  const res = await fetch(`/api/admin/orders?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch admin orders');
  }
  return data;
}

export async function getOrders(token: string, filters?: { branch?: string; date?: string }): Promise<{ success: boolean; orders?: Order[]; error?: string }> {
  try {
    const orders = await getAdminOrders(token, filters?.branch, filters?.date);
    return { success: true, orders };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to load orders';
    return { success: false, error: msg };
  }
}

export async function updateOrderStatus(token: string, orderId: string, status: string): Promise<{ success: boolean; order?: Order; error?: string }> {
  const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderId)}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  if (!res.ok) {
    return { success: false, error: data.error || 'Failed to update order status' };
  }
  return { success: true, order: data };
}

export async function toggleMenuAvailability(token: string, itemId: number | string, available?: boolean): Promise<MenuItem> {
  const res = await fetch(`/api/admin/menu/${itemId}/availability`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ available })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update menu item');
  }
  return data;
}

export async function toggleItemAvailability(token: string, itemId: number | string): Promise<{ success: boolean; item?: MenuItem; error?: string }> {
  try {
    const item = await toggleMenuAvailability(token, itemId);
    return { success: true, item };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update availability';
    return { success: false, error: msg };
  }
}
