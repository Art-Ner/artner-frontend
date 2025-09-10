import { describe, it, expect } from 'vitest'

import { ShowDetailResponse, VenueCard, MatchPost } from '@/lib/schemas'

describe('lib/schemas', () => {
	it('ShowDetailResponse: 필수 구조 검증', () => {
		const sample = {
			show: { id: 's1', title: 'T', dateRange: 'D', venueName: 'V' },
			seatsPreview: { total: 10, remain: 5 },
			discounts: { rules: [] }
		}
		const parsed = ShowDetailResponse.parse(sample)
		expect(parsed.show?.id).toBe('s1')
	})

	it('VenueCard: priceRange 튜플/availableDates 배열', () => {
		const v = VenueCard.parse({ id: 'v1', name: '홀', region: '서울', seatCount: 100, stageType: '블랙박스', priceRange: [1,2], availableDates: ['2025-10-10'] })
		expect(v.priceRange[0]).toBe(1)
	})

	it('MatchPost: applyState enum', () => {
		const m = MatchPost.parse({ id: 'p', title: '팀', roles: [{ role: '보컬', count: 1 }], owner: { name: 'K', verifiedHistory: true }, applyState: 'none' })
		expect(m.applyState).toBe('none')
	})
})
