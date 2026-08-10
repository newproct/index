# Kurulum Adımları

1. github.com üzerinde yeni bir repo oluştur (örn. `index-bot`), boş bırak.
2. Bu klasördeki tüm dosyaları o repoya yükle (GitHub web arayüzünden "Add file > Upload files" ile sürükle-bırak yapabilirsin).
3. Vercel'e gir → "Add New Project" → az önce oluşturduğun repoyu seç → Import.
4. Deploy etmeden önce "Environment Variables" kısmına şunu ekle:
   - Key: `SERPAPI_KEY`
   - Value: (SerpApi hesabından aldığın API anahtarı)
5. Deploy'a bas. Birkaç saniye içinde sana bir link verecek (örn. `index-bot.vercel.app`).
6. O linke gidip site adını yazıp "Sorgula"ya basman yeterli.

Not: API anahtarını asla kod dosyalarının içine yazma — sadece Vercel'in "Environment Variables" ayarına gir.
