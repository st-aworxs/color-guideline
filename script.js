// script.js

// サイドバーのHEXコード入力とプレビュー機能
document.addEventListener('DOMContentLoaded', () => {
    const hexInputSidebar = document.getElementById('hexInputSidebar');
    const hexColorPreviewSidebar = document.getElementById('hexColorPreviewSidebar');

    function updateSidebarColorPreview() {
        let hex = hexInputSidebar.value.trim();

        if (hex.length > 0 && !hex.startsWith('#')) {
            hex = '#' + hex;
        }

        const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

        if (isValidHex) {
            hexColorPreviewSidebar.style.backgroundColor = hex;
            hexColorPreviewSidebar.style.borderColor = '#ccc';
        } else if (hex.length === 0) {
            hexColorPreviewSidebar.style.backgroundColor = '#FFFFFF';
            hexColorPreviewSidebar.style.borderColor = '#ccc';
        }
        else {
            hexColorPreviewSidebar.style.backgroundColor = '#FFFFFF';
            hexColorPreviewSidebar.style.borderColor = 'red';
        }
    }

    hexInputSidebar.addEventListener('input', updateSidebarColorPreview);
    updateSidebarColorPreview();

    // 色見本アイテムをクリックするとコードをコピーする機能 (mainコンテンツ用)
    const colorItems = document.querySelectorAll('.color-item');

    colorItems.forEach(item => {
        // color-item全体ではなく、個々のコード表示要素にイベントリスナーを設定
        const hexElement = item.querySelector('.color-hex');
        const rgbElement = item.querySelector('.color-rgb');
        const hslElement = item.querySelector('.color-hsl');

        // HEXコードのコピー
        if (hexElement) {
            hexElement.addEventListener('click', (event) => {
                event.stopPropagation(); // 親要素へのイベント伝播を停止
                copyText(hexElement.textContent, item, 'HEXコード'); // メッセージに表示する形式名を渡す
            });
        }

        // RGBコードのコピー
        if (rgbElement) {
            rgbElement.addEventListener('click', (event) => {
                event.stopPropagation(); // 親要素へのイベント伝播を停止
                // "RGB: " プレフィックスを削除してコピー
                copyText(rgbElement.textContent.replace('RGB: ', ''), item, 'RGBコード'); // メッセージに表示する形式名を渡す
            });
        }

        // HSLコードのコピー
        if (hslElement) {
            hslElement.addEventListener('click', (event) => {
                event.stopPropagation(); // 親要素へのイベント伝播を停止
                // "HSL: " プレフィックスを削除してコピー
                copyText(hslElement.textContent.replace('HSL: ', ''), item, 'HSLコード'); // メッセージに表示する形式名を渡す
            });
        }

        // コピー処理を共通化する関数
        // messageType 引数を追加
        function copyText(text, targetItem, messageType = 'コード') {
            if (text) {
                navigator.clipboard.writeText(text)
                    .then(() => {
                        targetItem.classList.add('copied');
                        setTimeout(() => {
                            targetItem.classList.remove('copied');
                        }, 1000);
                        showToast(`${messageType}をコピーしました！`); // トーストメッセージを表示
                    })
                    .catch(err => {
                        console.error('コピーに失敗しました:', err);
                        alert('コードのコピーに失敗しました。手動でコピーしてください: ' + text);
                    });
            }
        }
    });

    // トースト通知を表示する関数
    function showToast(message) {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            console.error('Toast container not found!');
            return;
        }

        const toast = document.createElement('div');
        toast.classList.add('toast-message');
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // フェードイン
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // フェードアウトして削除
        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hide'); // フェードアウト用クラス
            toast.addEventListener('transitionend', () => {
                toast.remove();
            }, { once: true });
        }, 2000); // 2秒後にフェードアウト開始
    }
});
