import { kv } from '@vercel/kv';

const ORDER_PREFIX = 'used_order:';

export async function isOrderUsed(orderId) {
  const key = ORDER_PREFIX + orderId;
  return await kv.get(key);
}

export async function markOrderAsUsed(orderId) {
  const key = ORDER_PREFIX + orderId;
  // Store for 30 days (safety)
  await kv.set(key, true, { ex: 60 * 60 * 24 * 30 });
}
