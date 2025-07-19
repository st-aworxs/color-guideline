// script.js

// サイドバーのHEXコード入力とプレビュー機能
document.addEventListener('DOMContentLoaded', () => { // DOMContentLoadedで要素がロードされてから実行
    const hexInputSidebar = document.getElementById('hexInputSidebar');
    const hexColorPreviewSidebar = document.getElementById('hexColorPreviewSidebar');

    function updateSidebarColorPreview() {
        let hex = hexInputSidebar.value.trim();

        // # がなければ追加するが、空の場合は追加しない
        if (hex.length > 0 && !hex.startsWith('#')) {
            hex = '#' + hex;
        }

        // 有効なHEXコードかチェック (#RRGGBB または #RGB 形式)
        const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

        if (isValidHex) {
            hexColorPreviewSidebar.style.backgroundColor = hex;
            hexColorPreviewSidebar.style.borderColor = '#ccc'; // 有効な場合は通常の枠線
        } else if (hex.length === 0) {
            // 入力が空の場合はデフォルトの白に戻す
            hexColorPreviewSidebar.style.backgroundColor = '#FFFFFF';
            hexColorPreviewSidebar.style.borderColor = '#ccc';
        }
        else {
            // 無効な入力の場合、プレビューを白に戻し、エラーを示す枠線にする
            hexColorPreviewSidebar.style.backgroundColor = '#FFFFFF';
            hexColorPreviewSidebar.style.borderColor = 'red';
        }
    }

    // 入力があるたびにプレビューを更新
    hexInputSidebar.addEventListener('input', updateSidebarColorPreview);

    // ページロード時に一度プレビューを更新 (初期値がある場合)
    updateSidebarColorPreview();


    // 色見本アイテムをクリックするとHEXコードをコピーする機能 (mainコンテンツ用)
    const colorItems = document.querySelectorAll('.color-item');

    colorItems.forEach(item => {
        item.addEventListener('click', () => {
            const hexCode = item.dataset.hex; // data-hex属性からHEXコードを取得
            if (hexCode) {
                navigator.clipboard.writeText(hexCode)
                    .then(() => {
                        //alert(`HEXコード "${hexCode}" をコピーしました！`); // アラートは控えめに
                        // コピー成功時の視覚的なフィードバック
                        item.classList.add('copied');
                        setTimeout(() => {
                            item.classList.remove('copied');
                        }, 1000);
                    })
                    .catch(err => {
                        console.error('コピーに失敗しました:', err);
                        alert('コピーに失敗しました。手動でコピーしてください: ' + hexCode);
                    });
            }
        });
    });
});
