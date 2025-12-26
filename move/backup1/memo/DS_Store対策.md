# 一括削除

find ./ \( -name ".DS_Store" -or -name "._*" \)

find . -name '.DS_Store' -type f -ls -delete

# .DS_Storeを作らないようにするコマンド

defaults write com.apple.finder AppleShowAllFiles -boolean true

defaults write com.apple.desktopservices DSDontWriteNetworkStores True
killall Finder

from: https://kizineko.com/delete-dsstore/

defaults read com.apple.desktopservices DSDontWriteNetworkStores
defaults write com.apple.desktopservices DSDontWriteNetworkStores true
killall Finder
defaults read com.apple.desktopservices DSDontWriteNetworkStores
$ true

from: https://servercan.net/blog/2022/04/macos%E3%81%AEds_store%E3%82%92%E4%BD%9C%E3%82%89%E3%81%AA%E3%81%84%E4%BD%9C%E3%82%89%E3%81%9B%E3%81%AA%E3%81%84%E4%B8%80%E6%8B%AC%E5%89%8A%E9%99%A4%E3%81%97%E3%81%9F%E3%81%84/
