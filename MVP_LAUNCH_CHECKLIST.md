# 🚀 MVP Launch Checklist

## Product
- [ ] **Complete Core Loop**: User can Sign Up → Onboard → Get Roadmap → Track Progress.
- [ ] **Seeded Content**: Database has at least 4 complete tracks with real data.
- [ ] **Mobile Responsiveness**: Navbar, Roadmap, and Learning pages work on generic mobile widths.
- [ ] **Empty States**: Dashboard handles "No Roadmap" state gracefully.
- [ ] **Working CTAs**: All "Get Started" buttons link to `/onboarding`.

## Security
- [ ] **Auth Protection**: `/admin` and `/dashboard` redirect unauthenticated users.
- [ ] **Data Isolation**: Users can ONLY fetch/edit their own roadmaps (API endpoint verification).
- [ ] **Input Validation**: API routes check for missing fields and invalid types.
- [ ] **Environment Variables**: secrets are not hardcoded in client bundles.
- [ ] **Admin Roles**: Only `ADMIN` role can write to content tables.

## Performance
- [ ] **Database Indexing**: Foreign keys (`userId`, `trackId`) are indexed in Prisma schema.
- [ ] **Image Optimization**: Local assets use `next/image` with width/height.
- [ ] **Server Components**: Marketing pages (Home, Pricing) rendered on server.
- [ ] **Loading States**: UI shows skeletons/spinners while fetching roadmap data.
- [ ] **Build Check**: `npm run build` passes without type errors.

## Reliability
- [ ] **Error Handling**: Custom `not-found.tsx` and `error.tsx` exist.
- [ ] **Database Connection**: Connection pooling is configured (Prisma default).
- [ ] **Broken Links**: Navbar/Footer links point to valid routes.
- [ ] **Graceful Failures**: API errors return 4xx/5xx JSON, not crashes.
- [ ] **Timeouts**: Async operations have reasonable reliability (no infinite hangs).

## Analytics
- [ ] **Tracking Script**: Google Analytics or equivalent is present in `layout.tsx`.
- [ ] **Signup Event**: User creation is tracked (via DB `createdAt`).
- [ ] **Roadmap Event**: Roadmap creation is tracked (via DB).
- [ ] **Active Usage**: User model tracks `lastActivityDate`.
- [ ] **SEO Tags**: Metadata (Title/Description) is set for key pages.

## Support
- [ ] **Contact Channel**: Email or Twitter link visible in Footer.
- [ ] **Terms & Privacy**: Basic placeholder pages exist.
- [ ] **FAQ**: Pricing/Landing page answers common questions.
- [ ] **Account Deletion**: Manual process defined (email support).
- [ ] **Refund Policy**: Stated clearly on pricing page.
