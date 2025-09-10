import { z } from 'zod';

export const RoleCode = z.enum([
  'DIRECTOR',
  'ACTOR',
  'CHOREOGRAPHER',
  'COMPOSER',
  'PRODUCER',
  'STAFF',
]);

export const GenreCode = z.enum([
  'BASS',
  'GUITAR',
  'DRUM',
  'SINGER',
]);

export const Seat = z.object({
  id: z.string(),
  label: z.string(),
  price: z.number(),
  available: z.boolean(),
});
export const SeatsPreview = z.object({
  total: z.number(),
  remain: z.number(),
  mapUrl: z.string().optional(),
  sample: z.array(Seat).optional(),
});

export const DiscountRule = z.object({
  id: z.string(),
  label: z.string(),
  percent: z.number().optional(),
  amount: z.number().optional(),
});
export const Discounts = z.object({
  bestLabel: z.string().optional(),
  rules: z.array(DiscountRule),
});

export const ShowMeta = z.object({
  id: z.string(),
  title: z.string(),
  dateRange: z.string(),
  venueName: z.string(),
  posterUrl: z.string().optional(),
  runtime: z.number().optional(),
});

export const ShowDetailResponse = z.object({
  show: ShowMeta.nullable(),
  seatsPreview: SeatsPreview.nullable(),
  discounts: Discounts,
});

export const VenueCard = z.object({
  id: z.string(),
  name: z.string(),
  region: z.string(),
  seatCount: z.number(),
  stageType: z.string(),
  priceRange: z.tuple([z.number(), z.number()]),
  availableDates: z.array(z.string()),
});

export const RoleNeed = z.object({ role: RoleCode, count: z.number() });
export const MatchPost = z.object({
  id: z.string(),
  title: z.string(),
  roles: z.array(RoleNeed),
  owner: z.object({ name: z.string(), verifiedHistory: z.boolean() }),
  applyState: z.enum(['none', 'applied', 'accepted', 'rejected']),
});
