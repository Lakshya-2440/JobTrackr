# IMMEDIATE ACTION CHECKLIST - Complete in 15 minutes

Your backend is LIVE and operational at: https://jobtrackr-api-8ei7.onrender.com/api

## ⚠️ SECURITY ACTION REQUIRED - DO THIS NOW

Your database and API secrets were exposed in chat. Complete these steps before any real data is added:

---

## STEP 1: Reset Neon Database Password (5 min)

1. Open: https://console.neon.tech
2. Click your project name
3. Go to "Branches" → "main"  
4. Click "Connection Details" button
5. Under "Connection string" section, find the role  dropdown
6. Look for "neondb_owner" role
7. Click on it and select "Reset password"
8. **COPY the entire NEW pooled connection string** (starts with postgresql://)
   - This becomes your new **DATABASE_URL**
9. **COPY the entire NEW direct connection string** (also starts with postgresql://)
   - This becomes your new **DIRECT_URL**
10. Save both strings in a temporary text file

---

## STEP 2: Update Render Environment Variables (5 min)

1. Open: https://dashboard.render.com
2. Click on service "jobtrackr-api"
3. Go to "Environment" tab
4. Find and click each variable to edit:

   | Variable | New Value |
   |----------|-----------|
   | DATABASE_URL | (paste NEW pooled URL from Neon Step 1) |
   | DIRECT_URL | (paste NEW direct URL from Neon Step 1) |
   | JWT_SECRET | `0af9cbf1b97821cd5437c48328575091177eda46841d45d3dc839a0536454141d66e8279b1c9d1b462453f5d0924dabe376818a57c88460b9706040f495f0dff` |
   | JWT_REFRESH_SECRET | `25ae357580001038feaab56b2ef05555747b4baf45ee0584aa2a25b474092df6220408b54395e2d5dff3a419fc82f4819f0e0e54ad2584c7e0530fb659f6320a` |

5. Click "Save" button
6. Wait for service to auto-redeploy (watch the "Latest Deploy" section)
7. When status shows "Live", you're done with this step

---

## STEP 3: Rotate Cloudinary API Secret (5 min)

1. Open: https://cloudinary.com/console
2. Click "Settings" → scroll to "API Key"
3. Click "Generate new API Key" button
4. **COPY the new API Secret** (long string)
5. Go back to Render dashboard → jobtrackr-api → Environment
6. Update **CLOUDINARY_API_SECRET** with the new secret
7. Click "Save"

---

## STEP 4: Update Your Local .env File

1. Open `.env` in your project root
2. Find this line:
   ```
   CLOUDINARY_API_SECRET=(YOUR_NEW_SECRET_FROM_CLOUDINARY)
   ```
3. Replace `(YOUR_NEW_SECRET_FROM_CLOUDINARY)` with the secret from Step 3
4. **DO NOT COMMIT THIS FILE** (it's in .gitignore for security)

---

## VERIFICATION

After all steps, verify everything still works:

```bash
curl https://jobtrackr-api-8ei7.onrender.com/api/health
```

Should return: `{"ok":true}`

---

## COMPLETION

When all 4 steps are done:
- ✅ Database password rotated
- ✅ Render secrets updated
- ✅ Cloudinary secret rotated
- ✅ Local .env updated
- ✅ Service redeployed and verified

Your backend is now fully secured and ready for production.
