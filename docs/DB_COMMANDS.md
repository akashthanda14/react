# 🚀 Quick Database Commands Reference

## Development (Docker)

```bash
npm run db:migrate        # Create & apply migration
npm run db:seed           # Seed main data
npm run db:seed:lastminute # Seed Last Minute 100
npm run db:studio         # Open Prisma Studio (dev)
npm run db:push           # Push schema without migration
npm run db:reset          # Reset database (⚠️ destructive)
```

## Production

```bash
npm run prod:sync         # 🌟 Full sync (schema + data)
npm run prod:migrate      # Deploy migrations only
npm run prod:seed         # Seed data only
npm run prod:studio       # Open Prisma Studio (prod)
```

## Environment Variables

Your `.env` should have:
```env
DOCKER_DATABASE_URL="postgresql://..."  # Dev database
DATABASE_URL="postgresql://..."         # Production database
```

## Common Workflows

**New feature with schema changes:**
```bash
npm run db:migrate        # Create migration in dev
npm run prod:migrate      # Deploy to production
```

**New seed data:**
```bash
npm run prod:seed         # Seed production
```

**Complete sync:**
```bash
npm run prod:sync         # Everything at once
```

---
📚 Full docs: `docs/DATABASE_SYNC.md`
