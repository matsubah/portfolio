#!/usr/bin/env python3
"""
EE環境と本番環境のスクリーンショット比較用キャプチャスクリプト
CSS統合作業の表示確認用
"""

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os
from datetime import datetime

# 環境設定
EE_BASE_URL = "https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp"
PROD_BASE_URL = "https://sumai-madoguchi.lifull.com"
OUTPUT_DIR = "screenshots_comparison"

# キャプチャ対象ページ（統合済み29ページ）
PAGES = {
    "market": [
        "/market/chumon",
        "/market/ckodate",
        "/market/cmansion",
        "/market/reform_renovation",
    ],
    "voice": [
        "/voices-shop",
        "/voices-online",
    ],
    "article": [
        "/article",
        "/online",
        "/webinar",
    ],
    "reserve": [
        "/reserve",
    ],
    "campaign": [
        "/campaign/syanaisyoukai",
        "/campaign/friend_adviser",
    ],
    "top": [
        "/",
    ],
    "error": [
        "/404",
        "/500",
        "/400",
    ],
    "lp": [
        "/lp/seminar002",
        "/lp/chumon011",
        "/lp/chumon012",
        "/lp/online001",
        "/lp/market001",
        "/lp/linesoudan",
        "/lp/linesoudan002",
        "/lp/linesoudan003",
        "/lp/alliance_interspace",
    ],
    "about": [
        "/about",
    ],
    "skodate": [
        "/skodate",
    ],
    "books": [
        "/books",
    ],
}

# ビューポートサイズ
VIEWPORTS = {
    "PC": {"width": 1920, "height": 1080},
    "SP": {"width": 375, "height": 812},
}


def setup_driver():
    """Chromeドライバーのセットアップ"""
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    return webdriver.Chrome(options=options)


def capture_screenshot(driver, url, output_path, viewport):
    """スクリーンショットをキャプチャ"""
    try:
        driver.set_window_size(viewport["width"], viewport["height"])
        driver.get(url)
        
        # ページ読み込み待機
        time.sleep(3)
        
        # フルページスクリーンショット
        driver.save_screenshot(output_path)
        print(f"✓ {output_path}")
        return True
    except Exception as e:
        print(f"✗ {output_path}: {e}")
        return False


def main():
    """メイン処理"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_base = os.path.join(OUTPUT_DIR, timestamp)
    
    # 出力ディレクトリ作成
    for env in ["ee", "prod"]:
        for device in ["PC", "SP"]:
            os.makedirs(os.path.join(output_base, env, device), exist_ok=True)
    
    driver = setup_driver()
    
    try:
        total = sum(len(pages) for pages in PAGES.values())
        count = 0
        
        for category, pages in PAGES.items():
            print(f"\n[{category}]")
            
            for page in pages:
                count += 1
                page_name = page.replace("/", "_").strip("_") or "top"
                
                for device, viewport in VIEWPORTS.items():
                    # EE環境
                    ee_url = f"{EE_BASE_URL}{page}"
                    ee_path = os.path.join(output_base, "ee", device, f"{page_name}.png")
                    capture_screenshot(driver, ee_url, ee_path, viewport)
                    
                    # 本番環境
                    prod_url = f"{PROD_BASE_URL}{page}"
                    prod_path = os.path.join(output_base, "prod", device, f"{page_name}.png")
                    capture_screenshot(driver, prod_url, prod_path, viewport)
                
                print(f"  進捗: {count}/{total}")
    
    finally:
        driver.quit()
    
    print(f"\n完了: {output_base}")
    print(f"\n比較方法:")
    print(f"  cd {output_base}")
    print(f"  # PC版比較")
    print(f"  open ee/PC prod/PC")
    print(f"  # SP版比較")
    print(f"  open ee/SP prod/SP")


if __name__ == "__main__":
    main()
