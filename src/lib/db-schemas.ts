import { z } from 'zod';

import { GenreCode, RoleCode } from './schemas';

// Common enums
export const UserRole = z.enum(['USER', 'ADMIN']);

// 2) 사용자/프로필
export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  oauth_provider: z.string().nullable(),
  profile_image_url: z.string().nullable(),
  username: z.string(),
  role: UserRole,
  created_at: z.string(),
  updated_at: z.string(),
});

export const ArtistProfileSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  headline: z.string().nullable(),
  bio: z.string().nullable(),
  url_primary: z.string().nullable(),
  url_secondary: z.string().nullable(),
  url_tertiary: z.string().nullable(),
});

export const VenueAdminProfileSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  business_reg_number: z.string().nullable(),
});

// 아티스트 속성 N:M
export const ArtistGenreSchema = z.object({
  user_id: z.number(),
  genre_code: GenreCode,
});

export const ArtistRoleSchema = z.object({
  user_id: z.number(),
  role_code: RoleCode,
});

// 3) 포트폴리오/이력
export const FilmographySchema = z.object({
  id: z.number(),
  user_id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  released_at: z.string(),
  media_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ConcertHistorySchema = z.object({
  id: z.number(),
  user_id: z.number(),
  work_title: z.string(),
  role_code: RoleCode.nullable(),
  started_on: z.string().nullable(),
  ended_on: z.string().nullable(),
  proof_url: z.string().nullable(),
});

// 4) 팀빌딩(아이디어 → 모집 → 지원/수락)
export const ProjectStatus = z.enum(['RECRUITING', 'RECRUITED', 'CLOSED']);
export const ProjectsSchema = z.object({
  id: z.number(),
  owner_id: z.number(),
  title: z.string(),
  concept: z.string().nullable(),
  target_region: z.string().nullable(),
  target_genre: GenreCode.nullable(),
  expected_scale: z.string().nullable(),
  status: ProjectStatus,
  created_at: z.string(),
  updated_at: z.string(),
});

export const ProjectMembersSchema = z.object({
  id: z.number(),
  project_id: z.number(),
  user_id: z.number(),
  joined_at: z.string(),
});

// 5) 메시지/협업 제안
export const ConversationType = z.enum(['DIRECT', 'PROJECT', 'VENUE']);
export const ProposalStatus = z.enum(['NONE', 'ACCEPTED', 'REJECTED']);
export const ConversationsSchema = z.object({
  id: z.number(),
  type: ConversationType,
  user_low_id: z.number(),
  user_high_id: z.number(),
  project_id: z.number().nullable(),
  venue_id: z.number().nullable(),
  proposal_status: ProposalStatus,
  proposal_initiator_id: z.number().nullable(),
  created_at: z.string(),
});

export const MessagesSchema = z.object({
  id: z.number(),
  conversation_id: z.number(),
  sender_id: z.number(),
  body: z.string().nullable(),
  created_at: z.string(),
});

// 6) 공연장/대관
export const VenuesSchema = z.object({
  id: z.number(),
  admin_user_id: z.number().nullable(),
  name: z.string(),
  region: z.string().nullable(),
  address: z.string().nullable(),
  image_url: z.string().nullable(),
  seat_capacity: z.number().nullable(),
  base_rental_fee: z.number().nullable(),
  description: z.string().nullable(),
  kopis_venue_id: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const VenueAvailabilitySchema = z.object({
  id: z.number(),
  venue_id: z.number(),
  start_dt: z.string(),
  end_dt: z.string(),
  note: z.string().nullable(),
});

export const BookingStatus = z.enum([
  'REQUESTED',
  'APPROVED',
  'REJECTED',
  'CANCELLED',
]);
export const BookingsSchema = z.object({
  id: z.number(),
  requested_by: z.number(),
  venue_id: z.number(),
  project_id: z.number(),
  start_dt: z.string(),
  end_dt: z.string(),
  status: BookingStatus,
  decided_at: z.string().nullable(),
  created_at: z.string(),
});

// 7) 공연
export const PerformancesSchema = z.object({
  id: z.number(),
  project_id: z.number(),
  venue_id: z.number(),
  title: z.string(),
  genre_code: GenreCode.nullable(),
  running_minutes: z.number().nullable(),
  poster_url: z.string().nullable(),
  start_dt: z.string(),
  end_dt: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

// 예매
export const TicketStatus = z.enum([
  'RESERVED',
  'PAID',
  'CANCELLED',
  'REFUNDED',
]);
export const TicketsSchema = z.object({
  id: z.number(),
  performance_id: z.number(),
  buyer_id: z.number(),
  price: z.number(),
  status: TicketStatus,
  purchased_at: z.string(),
});

// 8) 사회적 신뢰/소통
export const BookmarkTargetType = z.enum([
  'PROJECT',
  'VENUE',
  'PERFORMANCE',
  'USER',
]);
export const BookmarksSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  target_type: BookmarkTargetType,
  target_id: z.number(),
  created_at: z.string(),
});

export const NotificationsSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  kind: z.string(),
  title: z.string().nullable(),
  body: z.string().nullable(),
  is_read: z.boolean(),
  created_at: z.string(),
});

export const VenueReviewsSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  venue_id: z.number(),
  rate: z.number(),
  content: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UserReviewsSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  target_user_id: z.number(),
  content: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Type aliases
export type User = z.infer<typeof UserSchema>;
export type ArtistProfile = z.infer<typeof ArtistProfileSchema>;
export type VenueAdminProfile = z.infer<typeof VenueAdminProfileSchema>;
export type ArtistGenre = z.infer<typeof ArtistGenreSchema>;
export type ArtistRole = z.infer<typeof ArtistRoleSchema>;
export type Filmography = z.infer<typeof FilmographySchema>;
export type ConcertHistory = z.infer<typeof ConcertHistorySchema>;
export type Project = z.infer<typeof ProjectsSchema>;
export type ProjectMember = z.infer<typeof ProjectMembersSchema>;
export type Conversation = z.infer<typeof ConversationsSchema>;
export type Message = z.infer<typeof MessagesSchema>;
export type Venue = z.infer<typeof VenuesSchema>;
export type VenueAvailability = z.infer<typeof VenueAvailabilitySchema>;
export type Booking = z.infer<typeof BookingsSchema>;
export type Performance = z.infer<typeof PerformancesSchema>;
export type Ticket = z.infer<typeof TicketsSchema>;
export type Bookmark = z.infer<typeof BookmarksSchema>;
export type Notification = z.infer<typeof NotificationsSchema>;
export type VenueReview = z.infer<typeof VenueReviewsSchema>;
export type UserReview = z.infer<typeof UserReviewsSchema>;
