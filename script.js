// script.js

// 色見本アイテムをクリックするとHEXコードをコピーする機能
document.addEventListener('DOMContentLoaded', () => {
    const colorItems = document.querySelectorAll('.color-item');

    colorItems.forEach(item => {
        item.addEventListener('click', () => {
            const hexCode = item.dataset.hex; // data-hex属性からHEXコードを取得
            if (hexCode) {
                navigator.clipboard.writeText(hexCode)
                    .then(() => {
                        alert(`HEXコード "${hexCode}" をコピーしました！`);
                        // コピー成功時の視覚的なフィードバック（例：一時的なクラス付与）
                        item.classList.add('copied');
                        setTimeout(() => {
                            item.classList.remove('copied');
                        }, 1000);
                    })
                    .catch(err => {
                        console.error('コピーに失敗しました:', err);
                        alert('HEXコードのコピーに失敗しました。手動でコピーしてください: ' + hexCode);
                    });
            }
        });
    });
});
