# SenSys Lab — New Computer Migration Checklist

## 1. Clone the repository
```powershell
git clone https://github.com/deepakks9436/sensys-lab.git
cd sensys-lab
npm install
```

## 2. Restore local environment variables
Create a file named `.env.local` using `.env.example` as the template.

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SENSYS_APPLICATION_WEBHOOK_URL`

Do not commit `.env.local`.

## 3. Run locally
```powershell
npm run dev
```

Open `http://localhost:3000`.

## 4. Verify production build
```powershell
npm run build
```

## 5. Git workflow for future changes
```powershell
git status
git add .
git commit -m "Describe the change"
git push
```

## 6. External services that must remain accessible
- GitHub: `deepakks9436/sensys-lab`
- Vercel: SenSys production deployment
- Supabase: `sensys-hub`
- Resend: `sensys.ca`
- CanSpace / DNS: `sensys.ca`
- Google Search Console: `sensys.ca`

## 7. Security
Keep private secrets and webhook URLs outside GitHub. Store them in a password manager or another secure private location.
