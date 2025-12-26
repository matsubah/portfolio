タグマネージャーをブラウザで起動

タグを新規作成
* タグの種類（カスタム、選択）
* トリガー（配信トリガーを選択、例外条件があれば設定）
→保存

トリガー
注文全体のときは「iezukuri_all」のみ選択
（LPも含まれているのでiezukuri_pc_lpと_sp_lpは不要）

サマリー画面から「プレビュー」
→テスト
→SPの場合は、DevTool > 右上の[︙]  >  [More tools] > [Network conditions] > UserAgent
iPhoneなどにする

* テスト仕様書について
参考：
https://jira.next-group.jp/browse/IEZUKURI-12240?focusedCommentId=1171780&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-1171780

GTMタグ設定

【新規作成タグ】
例：
Spotify_CV_Visit
Spotify_CV_AplicationDone

＜GTM＞
・コンテナ名：【PC・SP】www.homes.co.jp （iezukuri HOME'S注文住宅）
・コンテナID：GTM-WWRWC3
・ワークスペース名：IEZUKURI-12430_【タグ設置】スポティファイCVタグ設置

＜テスト仕様書＞
・該当するGTMワークスペースのプレビューモードにて下記「操作」を行い、
　GTMの「Summary」の内容を参照して、「期待値」の状態であることを確認する。
・「期待値」の確認
　・発火：「Tags Fired」にあること
　・未発火：「Tags Not Fired」にあること
上記が期待値通りであれば、各「結果」に〇を記載する。

||No||PC
 結果||SP
 結果||項目||操作||期待値
 (タグ発火確認)||
|1| | |トップ|https://iezukuri-web-develop.iez-dev.homes.co.jp/iezukuri/
 にアクセス|・発火
 Spotify_CV_Visit
 ・未発火
 Spotify_CV_AplicationDone|
|2| | |会社問合せ
 (入力)|https://iezukuri-web-develop.iez-dev.homes.co.jp/iezukuri/inquire/maker/input/?id[2265][]=2265&pref=13&city=201
 にアクセス|同上|
|3| | |会社問合せ
 (確認)|上記入力画面で、必須項目を入力し、
 確認ボタンを押下|同上|
|4| | |会社問合せ
 (完了)|上記確認画面で、送信ボタンを押下|・発火
 Spotify_CV_AplicationDone
 ・未発火
 Spotify_CV_Visit|
|5| | |LP|https://iezukuri-web-develop.iez-dev.homes.co.jp/iezukuri/lp/
 にアクセス|・発火
 Spotify_CV_Visit
 ・未発火
 Spotify_CV_AplicationDone|

 
