import { describe, it, expect } from 'vitest'

import { cn, cacheHeader, noStore, traceId } from '@/lib/utils'

describe('lib/utils', () => {
	it('cn: twMerge로 클래스 병합', () => {
		const result = cn('p-2', 'p-4', false && 'p-8', 'text-sm', ['text-base'])
		expect(result).toContain('p-4')
		expect(result).not.toContain('p-2')
		expect(result).toContain('text-base')
		expect(result).not.toContain('text-sm')
	})

	it('cacheHeader: TTL 헤더 생성', () => {
		expect(cacheHeader(120)).toEqual({ 'Cache-Control': 'public, s-maxage=120, max-age=120' })
	})

	it('noStore: no-store 헤더', () => {
		expect(noStore()).toEqual({ 'Cache-Control': 'no-store' })
	})

	it('traceId: base36 문자열', () => {
		const id = traceId()
		expect(typeof id).toBe('string')
		expect(id.length).toBeGreaterThan(0)
		expect(/^[a-z0-9]+$/.test(id)).toBe(true)
	})
})
