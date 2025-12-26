import { existsSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const PROD_CAPTURE_DIR = '/Users/matsubah/Documents/c_不要/capture';

const pages = [
  { name: 'chumon', path: '/chumon', prodName: 'chumon' },
  { name: 'ckodate', path: '/ckodate', prodName: 'ckodate' },
  { name: 'cmansion', path: '/cmansion', prodName: 'cmansion' },
  { name: 'reform_renovation', path: '/reform_renovation', prodName: 'reform_renovation' },
  { name: 'voices_shop', path: '/voices-shop', prodName: 'voices_shop' },
  { name: 'voices_online', path: '/voices-online', prodName: 'voices_online' },
  { name: 'article', path: '/article', prodName: 'article' },
  { name: 'online', path: '/online', prodName: 'online' },
  { name: 'webinar', path: '/webinar', prodName: 'webinar' },
  { name: 'reserve', path: '/reserve', prodName: 'reserve' },
  { name: 'thanks', path: '/thanks', prodName: 'thanks' },
  { name: 'campaign_syanaisyoukai', path: '/campaign/syanaisyoukai', prodName: 'campaign_syanaisyoukai' },
  { name: 'campaign_friend_adviser', path: '/campaign/friend_adviser', prodName: 'campaign_friend_adviser' },
  { name: 'top', path: '/', prodName: 'top' },
  { name: 'lp_seminar002', path: '/lp/seminar002', prodName: 'lp_seminar002' },
  { name: 'lp_seminar005', path: '/lp/seminar005', prodName: 'lp_seminar005' },
  { name: 'lp_chumon011', path: '/lp/chumon011', prodName: 'lp_chumon011' },
  { name: 'lp_chumon012', path: '/lp/chumon012', prodName: 'lp_chumon012' },
  { name: 'lp_online001', path: '/lp/online001', prodName: 'lp_online001' },
  { name: 'lp_market001', path: '/lp/market001', prodName: 'lp_market001' },
  { name: 'lp_linesoudan', path: '/lp/linesoudan', prodName: 'lp_linesoudan' },
  { name: 'lp_linesoudan001', path: '/lp/linesoudan001', prodName: 'lp_linesoudan001' },
  { name: 'lp_linesoudan002', path: '/lp/linesoudan002', prodName: 'lp_linesoudan002' },
  { name: 'lp_alliance_interspace', path: '/lp/alliance_interspace', prodName: 'lp_alliance_interspace' },
  { name: 'about', path: '/about', prodName: 'about' },
  { name: 'skodate', path: '/skodate', prodName: 'skodate' },
  { name: 'book', path: '/book', prodName: 'book' }
];

const viewports = [
  { name: 'PC', width: 1280, height: 1024 },
  { name: 'SP', width: 375, height: 812 }
];

async function generateVisualComparisonReport() {
  console.log('\n📊 ビジュアル比較レポート生成中...\n');
  
  let matchCount = 0;
  let diffCount = 0;
  
  const pagesSections = [];
  const tocItems = [];
  
  for (const page of pages) {
    tocItems.push(`<li><a href="#${page.name}">${page.name} (${page.path})</a></li>`);
    
    let pageStatus = 'PASS';
    const deviceSections = [];
    
    for (const viewport of viewports) {
      const eeFile = `ee_${page.name}_${viewport.name}.png`;
      const prodFile = `${PROD_CAPTURE_DIR}/production_${page.prodName}_${viewport.name}.png`;
      
      if (!existsSync(eeFile) || !existsSync(prodFile)) {
        pageStatus = 'MISSING';
        continue;
      }
      
      // ファイルサイズ比較
      const eeStats = await execAsync(`stat -f%z ${eeFile}`);
      const prodStats = await execAsync(`stat -f%z ${prodFile}`);
      const eeSizeKB = Math.round(parseInt(eeStats.stdout.trim()) / 1024);
      const prodSizeKB = Math.round(parseInt(prodStats.stdout.trim()) / 1024);
      const sizeDiff = Math.abs(eeSizeKB - prodSizeKB);
      const sizeDiffPercent = prodSizeKB > 0 ? ((sizeDiff / prodSizeKB) * 100).toFixed(1) : 0;
      
      if (sizeDiffPercent >= 5) {
        pageStatus = 'DIFF';
        diffCount++;
      } else {
        matchCount++;
      }
      
      deviceSections.push(`
    <div class="device-section">
      <div class="device-title">${viewport.name === 'PC' ? '💻 PC版 (1280px)' : '📱 SP版 (375px)'}</div>
      <div class="comparison">
        <div class="image-container">
          <div class="image-label ee">EE環境 (${eeSizeKB} KB)</div>
          <img src="ee_${page.name}_${viewport.name}.png" alt="EE ${viewport.name}">
        </div>
        <div class="image-container">
          <div class="image-label prod">本番環境 (${prodSizeKB} KB)</div>
          <img src="file://${PROD_CAPTURE_DIR}/production_${page.prodName}_${viewport.name}.png" alt="Production ${viewport.name}">
        </div>
      </div>
      <div class="size-diff">差異: ${sizeDiffPercent}%</div>
    </div>
      `);
    }
    
    pagesSections.push(`
  <div class="page-section" id="${page.name}">
    <div class="page-title">${page.name}<span class="status ${pageStatus.toLowerCase()}">${pageStatus}</span></div>
    <div class="page-url">${page.path}</div>
    ${deviceSections.join('\n')}
  </div>
    `);
  }
  
  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS統合テスト - EE vs 本番 画像比較</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f5f5f5; padding: 20px; }
    .header { background: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    h1 { color: #333; margin-bottom: 10px; }
    .summary { color: #666; font-size: 14px; line-height: 1.6; }
    .summary strong { color: #22c55e; }
    .page-section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .page-title { font-size: 20px; font-weight: bold; color: #333; margin-bottom: 5px; }
    .page-url { color: #666; font-size: 14px; margin-bottom: 15px; }
    .device-section { margin-bottom: 30px; }
    .device-title { font-size: 16px; font-weight: bold; color: #555; margin-bottom: 10px; padding: 8px 12px; background: #f0f0f0; border-radius: 4px; }
    .comparison { display: flex; gap: 20px; overflow-x: auto; }
    .image-container { flex: 1; min-width: 400px; }
    .image-label { font-weight: bold; color: #333; margin-bottom: 8px; padding: 6px 10px; border-radius: 4px; }
    .image-label.ee { background: #dbeafe; color: #1e40af; }
    .image-label.prod { background: #fce7f3; color: #be185d; }
    img { width: 100%; border: 1px solid #ddd; border-radius: 4px; display: block; }
    .size-diff { margin-top: 8px; font-size: 14px; color: #666; text-align: center; }
    .status { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-left: 10px; }
    .status.pass { background: #dcfce7; color: #166534; }
    .status.diff { background: #fef3c7; color: #92400e; }
    .status.missing { background: #fee2e2; color: #991b1b; }
    .toc { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .toc h2 { font-size: 18px; margin-bottom: 15px; color: #333; }
    .toc ul { list-style: none; }
    .toc li { padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
    .toc a { color: #2563eb; text-decoration: none; }
    .toc a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="header">
    <h1>CSS統合テスト - EE vs 本番 画像比較レポート</h1>
    <div class="summary">
      実施日: ${new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}<br>
      対象: 27ページ × 2デバイス = 54画面<br>
      結果: <strong>一致 ${matchCount}件, 差異 ${diffCount}件</strong><br>
      EE環境: https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/
    </div>
  </div>

  <div class="toc">
    <h2>📑 目次</h2>
    <ul>
      ${tocItems.join('\n      ')}
    </ul>
  </div>

  ${pagesSections.join('\n')}

</body>
</html>`;
  
  await execAsync('echo \'' + html.replace(/'/g, "'\\''") + '\' > visual_comparison_report.html');
  
  console.log('✅ visual_comparison_report.html を生成しました\n');
  
  // レポートを開く
  try {
    await execAsync('open visual_comparison_report.html');
    console.log('📄 レポートを開きました\n');
  } catch (error) {
    console.log('⚠️  レポートを自動で開けませんでした\n');
  }
}

generateVisualComparisonReport();
