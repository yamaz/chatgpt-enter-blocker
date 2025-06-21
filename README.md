# ChatGPT Enter Blocker

ChatGPTのWebUIでEnter押しても送信されず、改行だけするChrome拡張機能です。
ChatGPTで複数行を入力のためにEnterを押すと入力途中なのに回答を始めるのを抑制します。Submit目的でEnterを入力したいときはCtrl+EnterもしくはCommand+Enter。

## インストール方法

1. Chrome拡張機能の管理ページを開く（chrome://extensions/）
2. 右上の「デベロッパーモード」をオンにする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このディレクトリを選択

## 使い方

- ChatGPTでEnterキーを押すと改行されます
- メッセージを送信したい場合は、Ctrl+Enter、Command+Enterもｓくは送信ボタン
- Shift+Enterでも改行できます（デフォルト動作）

## コード修正後の再読み込み方法

拡張機能のコードを修正した後は、以下の手順で再読み込みしてください：

1. Chrome拡張機能の管理ページを開く（chrome://extensions/）
2. 「ChatGPT Enter Blocker」を見つける
3. 拡張機能カードの右下にある「更新」ボタン（循環矢印アイコン）をクリック
   - または、拡張機能一覧の上部にある「更新」ボタンをクリックして全ての拡張機能を更新
4. ChatGPTのページをリロード（F5キーまたはCmd+R）

これで最新のコードが反映されます。

