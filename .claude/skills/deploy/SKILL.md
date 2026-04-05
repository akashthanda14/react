---
name: deploy
description: Deploy akashcodeofficial.com to production
disable-model-invocation: true
---

# Deploy Steps

1. Run tests: npm run test
2. Build: npm run build
3. Check build output in /dist for errors
4. Push to main branch: git push origin main
5. Vercel auto-deploys on push — check deployment at vercel.com dashboard
6. Verify live site at akashcodeofficial.com after 2-3 minutes

## Important
- Never deploy with failing tests
- Always check mobile view after deployment
- If deploy fails, check Vercel logs first