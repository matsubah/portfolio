import { chromium } from 'playwright';

const PROD_BASE_URL = 'https://sumai-madoguchi.lifull.com';

const pages = [
  { name: 'lp_online001', path: '/lp/online001' },
  { name: 'about', path: '/about' },
  { name: 'book', path: '/book' }
];

const viewports = [
  { name: 'PC', width: 1280, height: 1024 },
  { name: 'SP', width: 375, height: 812 }
];

async function captureScreenshot(browser, url, outputPath, viewport, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const context = await browser.newContext({ 
      viewport,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    
    try {
      console.log(`  キャプチャ中 (試行 ${attempt}/${retries}): ${outputPath}`);
      
      // ページ読み込み完了を待つ
      await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 60000 
      });
      
      // 追加の待機（画像やフォントの読み込み完了）
      await page.waitForTimeout(5000);
      
      // スクリーンショット
      await page.screenshot({ 
        path: outputPath,
        fullPage: true 
      });
      
      console.log(`  ✓ ${outputPath}`);
      await context.close();
      return true;
    } catch (error) {
      console.log(`  ✗ 試行 ${attempt} 失敗: ${error.message.split('\n')[0]}`);
      await context.close();
      
      if (attempt < retries) {
        console.log(`  ⏳ 10秒待機してリトライ...`);
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }
  }
  
  console.log(`  ❌ ${outputPath}: 全ての試行が失敗しました`);
  return false;
}

(async () => {
  console.log('🚀 本番環境の再キャプチャ開始\n');
  
  const browser = await chromium.launch();
  
  try {
    for (const pageInfo of pages) {
      console.log(`\n[${pageInfo.name}] ${pageInfo.path}`);
      
      for (const viewport of viewports) {
        const filename = `production_${pageInfo.name}_${viewport.name}.png`;
        await captureScreenshot(browser, `${PROD_BASE_URL}${pageInfo.path}`, filename, viewport);
      }
    }
    
    console.log('\n✅ 本番環境の再キャプチャ完了\n');
    console.log('📋 キャプチャしたファイル:');
    console.log('  - production_lp_online001_PC.png');
    console.log('  - production_lp_online001_SP.png');
    console.log('  - production_about_PC.png');
    console.log('  - production_about_SP.png');
    console.log('  - production_book_PC.png');
    console.log('  - production_book_SP.png\n');
    
  } finally {
    await browser.close();
  }
})();
