import { chromium } from 'playwright';

const EE_BASE_URL = 'https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp';
const PROD_BASE_URL = 'https://sumai-madoguchi.lifull.com';

const pages = [
  { name: 'article', path: '/article', env: 'ee' },
  { name: 'about', path: '/about', env: 'prod' },
  { name: 'about_manga', path: '/about/manga', env: 'prod' }
];

const viewports = [
  { name: 'PC', width: 1280, height: 1024 },
  { name: 'SP', width: 375, height: 812 }
];

async function captureScreenshot(browser, url, outputPath, viewport) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  
  try {
    console.log(`  キャプチャ中: ${outputPath}`);
    
    // ページ読み込み完了を待つ
    await page.goto(url, { 
      waitUntil: 'load',  // DOMContentLoadedとloadイベント完了まで待つ
      timeout: 30000 
    });
    
    // 追加の待機（画像やフォントの読み込み完了）
    await page.waitForTimeout(5000);
    
    // スクリーンショット
    await page.screenshot({ 
      path: outputPath,
      fullPage: true 
    });
    
    console.log(`  ✓ ${outputPath}`);
    return true;
  } catch (error) {
    console.log(`  ✗ ${outputPath}: ${error.message}`);
    return false;
  } finally {
    await context.close();
  }
}

(async () => {
  console.log('🚀 指定ページの再キャプチャ開始\n');
  
  const browser = await chromium.launch();
  
  try {
    for (const pageInfo of pages) {
      console.log(`\n[${pageInfo.name}] ${pageInfo.path}`);
      
      const baseUrl = pageInfo.env === 'ee' ? EE_BASE_URL : PROD_BASE_URL;
      const prefix = pageInfo.env === 'ee' ? 'ee' : 'production';
      
      for (const viewport of viewports) {
        // article PC/SPのみ、about PCのみ、about_manga SPのみ
        if (pageInfo.name === 'article') {
          // article: PC/SP両方
          const filename = `${prefix}_${pageInfo.name}_${viewport.name}.png`;
          await captureScreenshot(browser, `${baseUrl}${pageInfo.path}`, filename, viewport);
        } else if (pageInfo.name === 'about' && viewport.name === 'PC') {
          // about: PCのみ
          const filename = `${prefix}_${pageInfo.name}_${viewport.name}.png`;
          await captureScreenshot(browser, `${baseUrl}${pageInfo.path}`, filename, viewport);
        } else if (pageInfo.name === 'about_manga' && viewport.name === 'SP') {
          // about/manga: SPのみ
          const filename = `${prefix}_about_${viewport.name}.png`;
          await captureScreenshot(browser, `${baseUrl}${pageInfo.path}`, filename, viewport);
        }
      }
    }
    
    console.log('\n✅ 再キャプチャ完了\n');
    console.log('📋 キャプチャしたファイル:');
    console.log('  - ee_article_PC.png');
    console.log('  - ee_article_SP.png');
    console.log('  - production_about_PC.png');
    console.log('  - production_about_SP.png (about/manga)\n');
    
  } finally {
    await browser.close();
  }
})();
