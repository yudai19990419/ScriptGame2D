const express = require('express'); // expressモジュールをインポート
const path = require('path'); // pathモジュールをインポート

const app = express(); // Expressアプリケーションのインスタンスを作成
const PORT = 3000; // サーバーがリッスンするポート番号

// staticフォルダ内のファイルを提供するためのミドルウェアを追加
app.use(express.static(path.join(__dirname))); // プロジェクトのルートを静的ファイルのルートに設定

// ルートエンドポイント
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // index.htmlを返す
});

// サーバーを起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // サーバーの起動を通知
});
