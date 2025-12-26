import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const EE_BASE_URL = 'https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp';
const PROD_BASE_URL = 'https://sumai-madoguchi.lifull.com';

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

async function captureScreenshots(baseUrl, prefix) {
  console.log(`\n📸 ${prefix}環境のキャプチャ取得中...\n`);
  
  const browser = await chromium.launch();
  let successCount = 0;
  let errorCount = 0;
  
  for (const page of pages) {
    for (const viewport of viewports) {
      const context = await browser.newContext({ viewport });
      const browserPage = await context.newPage();
      
      try {
        await browserPage.goto(`${baseUrl}${page.path}`, { 
          waitUntil: 'domcontentloaded',
          timeout: 15000 
        });
        await browserPage.waitForTimeout(2000);
        
        const filename = `${prefix}_${page.name}_${viewport.name}.png`;
        await browserPage.screenshot({ 
          path: filename,
          fullPage: true 
        });
        console.log(`  ✓ ${filename}`);
        successCount++;
      } catch (error) {
        console.log(`  ✗ ${page.name}_${viewport.name}: ${error.message.split('\n')[0]}`);
        errorCount++;
      }
      
      await context.close();
    }
  }
  
  await browser.close();
  console.log(`\n✅ ${prefix}キャプチャ完了: 成功 ${successCount}, エラー ${errorCount}\n`);
  return { successCount, errorCount };
}

async function compressImages() {
  console.log('\n🗜️  画像圧縮中...\n');
  
  const compressDir = 'compressed';
  if (!existsSync(compressDir)) {
    mkdirSync(compressDir);
  }
  
  let compressCount = 0;
  
  for (const page of pages) {
    for (const viewport of viewports) {
      const filename = `ee_${page.name}_${viewport.name}.png`;
      
      if (existsSync(filename)) {
        const maxSize = viewport.name === 'PC' ? 1280 : 800;
        const compressedFile = `${compressDir}/${filename}`;
        
        try {
          await execAsync(`sips -Z ${maxSize} ${filename} --out ${compressedFile} 2>/dev/null`);
          compressCount++;
        } catch (error) {
          console.log(`  ⚠️  ${filename}: 圧縮失敗`);
        }
      }
    }
  }
  
  console.log(`\n✅ 圧縮完了: ${compressCount}ファイル\n`);
  return compressCount;
}

async function generateComparisonReport() {
  console.log('\n📊 比較レポート生成中...\n');
  
  const results = [];
  let matchCount = 0;
  let diffCount = 0;
  let missingCount = 0;
  
  for (const page of pages) {
    for (const viewport of viewports) {
      const eeFile = `ee_${page.name}_${viewport.name}.png`;
      const prodFile = `${PROD_CAPTURE_DIR}/production_${page.prodName}_${viewport.name}.png`;
      
      if (!existsSync(eeFile)) {
        results.push({ page: page.name, device: viewport.name, status: 'MISSING_EE' });
        missingCount++;
        console.log(`  ⚠️  ${page.name} ${viewport.name}: EE画像なし`);
        continue;
      }
      
      if (!existsSync(prodFile)) {
        results.push({ page: page.name, device: viewport.name, status: 'MISSING_PROD' });
        missingCount++;
        console.log(`  ⚠️  ${page.name} ${viewport.name}: 本番画像なし (${prodFile})`);
        continue;
      }
      
      // ファイルサイズ比較
      const eeStats = await execAsync(`stat -f%z ${eeFile}`);
      const prodStats = await execAsync(`stat -f%z ${prodFile}`);
      const eeSizeKB = Math.round(parseInt(eeStats.stdout.trim()) / 1024);
      const prodSizeKB = Math.round(parseInt(prodStats.stdout.trim()) / 1024);
      const sizeDiff = Math.abs(eeSizeKB - prodSizeKB);
      const sizeDiffPercent = prodSizeKB > 0 ? ((sizeDiff / prodSizeKB) * 100).toFixed(1) : 0;
      
      if (sizeDiffPercent < 5) {
        results.push({ page: page.name, device: viewport.name, status: 'MATCH', eeSizeKB, prodSizeKB, sizeDiffPercent });
        matchCount++;
        console.log(`  ✅ ${page.name} ${viewport.name}: 一致 (${sizeDiffPercent}%)`);
      } else {
        results.push({ page: page.name, device: viewport.name, status: 'DIFF', eeSizeKB, prodSizeKB, sizeDiffPercent });
        diffCount++;
        console.log(`  ❌ ${page.name} ${viewport.name}: 差異 ${sizeDiffPercent}%`);
      }
    }
  }
  
  // HTMLレポート生成
  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>CSS統合テスト - EE vs 本番比較</title>
  <style>
    body { font-family: system-ui; margin: 20px; background: #f5f5f5; }
    h1 { color: #333; }
    .summary { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .summary-item { display: inline-block; margin-right: 30px; font-size: 18px; }
    .match { color: #22c55e; font-weight: bold; }
    .diff { color: #ef4444; font-weight: bold; }
    .missing { color: #f59e0b; font-weight: bold; }
    table { width: 100%; background: white; border-collapse: collapse; border-radius: 8px; overflow: hidden; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; }
    tr:hover { background: #f9fafb; }
    .status-match { color: #22c55e; font-weight: bold; }
    .status-diff { color: #ef4444; font-weight: bold; }
    .status-missing { color: #f59e0b; }
    .image-link { color: #3b82f6; text-decoration: none; margin-right: 10px; }
    .image-link:hover { text-decoration: underline; }
    .filter { margin-bottom: 15px; }
    .filter button { padding: 8px 16px; margin-right: 10px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 4px; }
    .filter button.active { background: #3b82f6; color: white; border-color: #3b82f6; }
  </style>
</head>
<body>
  <h1>📊 CSS統合テスト - EE vs 本番比較レポート</h1>
  
  <div class="summary">
    <div class="summary-item">
      <span class="match">✅ 一致: ${matchCount}</span>
    </div>
    <div class="summary-item">
      <span class="diff">❌ 差異: ${diffCount}</span>
    </div>
    <div class="summary-item">
      <span class="missing">⚠️ 欠損: ${missingCount}</span>
    </div>
    <div class="summary-item">
      📁 総数: ${results.length}
    </div>
  </div>
  
  <div class="filter">
    <button onclick="filterTable('all')" class="active">全て</button>
    <button onclick="filterTable('DIFF')">差異のみ</button>
    <button onclick="filterTable('MATCH')">一致のみ</button>
    <button onclick="filterTable('MISSING')">欠損のみ</button>
  </div>
  
  <table id="resultTable">
    <thead>
      <tr>
        <th>ページ</th>
        <th>デバイス</th>
        <th>ステータス</th>
        <th>EEサイズ</th>
        <th>本番サイズ</th>
        <th>差分</th>
        <th>画像</th>
      </tr>
    </thead>
    <tbody>
      ${results.map(r => `
        <tr data-status="${r.status}">
          <td>${r.page}</td>
          <td>${r.device}</td>
          <td class="status-${r.status.toLowerCase().split('_')[0]}">${r.status}</td>
          <td>${r.eeSizeKB ? r.eeSizeKB + ' KB' : '-'}</td>
          <td>${r.prodSizeKB ? r.prodSizeKB + ' KB' : '-'}</td>
          <td>${r.sizeDiffPercent ? r.sizeDiffPercent + '%' : '-'}</td>
          <td>
            ${r.status !== 'MISSING_EE' ? `<a class="image-link" href="ee_${r.page}_${r.device}.png" target="_blank">EE</a>` : ''}
            ${r.status !== 'MISSING_PROD' ? `<a class="image-link" href="file://${PROD_CAPTURE_DIR}/production_${pages.find(p => p.name === r.page).prodName}_${r.device}.png" target="_blank">本番</a>` : ''}
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  
  <p style="margin-top: 20px; color: #666;">
    生成日時: ${new Date().toLocaleString('ja-JP')}<br>
    本番キャプチャ: ${PROD_CAPTURE_DIR}
  </p>
  
  <script>
    function filterTable(status) {
      const rows = document.querySelectorAll('#resultTable tbody tr');
      const buttons = document.querySelectorAll('.filter button');
      
      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      
      rows.forEach(row => {
        if (status === 'all') {
          row.style.display = '';
        } else if (status === 'MISSING') {
          row.style.display = row.dataset.status.includes('MISSING') ? '' : 'none';
        } else {
          row.style.display = row.dataset.status === status ? '' : 'none';
        }
      });
    }
  </script>
</body>
</html>`;
  
  await execAsync('echo \'' + html.replace(/'/g, "'\\''") + '\' > comparison_report.html');
  
  console.log('\n✅ comparison_report.html を生成しました\n');
  console.log(`📊 結果: 一致 ${matchCount}, 差異 ${diffCount}, 欠損 ${missingCount}\n`);
  
  // レポートを開く
  try {
    await execAsync('open comparison_report.html');
    console.log('📄 レポートを開きました\n');
  } catch (error) {
    console.log('⚠️  レポートを自動で開けませんでした\n');
  }
}

(async () => {
  console.log('🚀 CSS統合テスト - EE環境キャプチャ\n');
  console.log('対象: 27ページ × 2画面 (PC/SP) = 54キャプチャ\n');
  
  try {
    // EE環境キャプチャのみ
    const eeResult = await captureScreenshots(EE_BASE_URL, 'ee');
    
    if (eeResult.successCount === 0) {
      console.log('❌ キャプチャが取得できませんでした');
      process.exit(1);
    }
    
    // 画像圧縮
    await compressImages();
    
    // 比較レポート生成
    await generateComparisonReport();
    
    console.log('✅ 全ステップ完了\n');
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
    process.exit(1);
  }
})();
