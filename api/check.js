export default async function handler(req, res) {
  const domain = (req.query.domain || "").trim().replace(/^https?:\/\//, "").replace(/\/$/, "");

  if (!domain) {
    return res.status(400).json({ error: "Site adı gerekli (örn: example.com)" });
  }

  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Sunucuda API anahtarı ayarlanmamış (SERPAPI_KEY)." });
  }

  try {
    // 1) Index sayısı tahmini: site:domain araması
    const indexUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
      "site:" + domain
    )}&google_domain=google.com.tr&hl=tr&gl=tr&api_key=${apiKey}`;
    const indexResp = await fetch(indexUrl);
    const indexData = await indexResp.json();
    const indexCount = indexData?.search_information?.total_results ?? null;

    // 2) Sıralama: domain adının kendisini arayıp organik sonuçlarda kaçıncı sırada çıktığını bul
    const rankUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
      domain
    )}&google_domain=google.com.tr&hl=tr&gl=tr&api_key=${apiKey}`;
    const rankResp = await fetch(rankUrl);
    const rankData = await rankResp.json();
    const organic = rankData?.organic_results || [];

    let position = null;
    for (const item of organic) {
      if (item.link && item.link.includes(domain)) {
        position = item.position;
        break;
      }
    }

    return res.status(200).json({
      domain,
      indexCount,
      position,
      checkedCount: organic.length,
    });
  } catch (err) {
    return res.status(500).json({ error: "Sorgu sırasında hata oluştu: " + err.message });
  }
}
