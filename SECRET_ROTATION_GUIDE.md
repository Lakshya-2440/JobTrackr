# Secret Rotation Guide

Your secrets were exposed in chat and screenshots. Follow these steps to rotate them immediately.

## New JWT Secrets (Already Generated)
- **JWT_SECRET**: `0af9cbf1b97821cd5437c48328575091177eda46841d45d3dc839a0536454141d66e8279b1c9d1b462453f5d0924dabe376818a57c88460b9706040f495f0dff`
- **JWT_REFRESH_SECRET**: `25ae357580001038feaab56b2ef05555747b4baf45ee0584aa2a25b474092df6220408b54395e2d5dff3a419fc82f4819f0e0e54ad2584c7e0530fb659f6320a`

## Step 1: Rotate Neon Database Password (5 min)
1. Go to https://console.neon.tech
2. Select your project → Branches → main
3. Click "Connection Details"
4. Find role "neondb_owner"
5. Click the role → "Reset password"
6. **COPY the new pooled connection string** → this is your new DATABASE_URL
7. **COPY the new direct connection string** → this is your new DIRECT_URL

## Step 2: Update Render Environment Variables (5 min)
1. Go to https://dashboard.render.com
2. Open service "jobtrackr-api"
3. Go to "Environment"
4. Update these variables:
   - **DATABASE_URL**: (paste new pooled URL from Neon)
   - **DIRECT_URL**: (paste new direct URL from Neon)
   - **JWT_SECRET**: `0af9cbf1b97821cd5437c48328575091177eda46841d45d3dc839a0536454141d66e8279b1c9d1b462453f5d0924dabe376818a57c88460b9706040f495f0dff`
   - **JWT_REFRESH_SECRET**: `25ae357580001038feaab56b2ef05555747b4baf45ee0584aa2a25b474092df6220408b54395e2d5dff3a419fc82f4819f0e0e54ad2584c7e0530fb659f6320a`
5. Click "Save"
6. Render will auto-redeploy with new secrets

## Step 3: Rotate Cloudinary Secret (5 min)
1. Go to https://cloudinary.com/console
2. Click "Account" → "API Keys"
3. Click "Generate new API Key"
4. **COPY the new API Secret**
5. Go back to Render → "jobtrackr-api" → "Environment"
6. Update **CLOUDINARY_API_SECRET** with the new value
7. Click "Save"

## Step 4: Update Local .env File
1. Open `.env` in your project
2. Replace the placeholder with new Cloudinary secret:
   ```
   CLOUDINARY_API_SECRET=(YOUR_NEW_SECRET_FROM_STEP_3)
   ```
3. Database URLs in local .env are optional (only used for local dev if NODE_ENV=development)

## Verification
After all steps complete, verify the backend still works:
```bash
curl https://jobtrackr-api-8ei7.onrender.com/api/health
```
Should return: `{"ok":true}`

## Timeline
- Exposed secrets in: chat/screenshots dated 2026-04-06
- Action taken: 2026-04-06 ~19:30 UTC
- All rotations must complete within 24 hours
