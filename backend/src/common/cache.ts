type CacheKey = string;
type CacheEntry<T> = {
	value: T;
	expiresAt: number;
};

const cache: Record<CacheKey, CacheEntry<unknown>> = {};

export function getCache<T>(key: CacheKey): T | null {
	const entry = cache[key];
	if (!entry || Date.now() > entry.expiresAt) {
		delete cache[key];
		return null;
	}
	return entry.value as T;
}

export function setCache<T>(key: CacheKey, value: T, ttlMs: number) {
	cache[key] = {
		value,
		expiresAt: Date.now() + ttlMs,
	};
}
