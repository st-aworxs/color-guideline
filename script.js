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
        item.addEventListener('click', (event) => {
            let textToCopy = '';
            
            // クリックされた要素が .color-hex, .color-rgb, .color-hsl のいずれかであれば、そのテキストをコピー
            // そうでなければ、color-item自体のdata-hexをデフォルトでコピー
            if (event.target.classList.contains('color-hex')) {
                textToCopy = event.target.textContent; // 直接テキストコンテンツを取得
            } else if (event.target.classList.contains('color-rgb')) {
                textToCopy = event.target.textContent.replace('RGB: ', ''); // "RGB: "を削除してコピー
            } else if (event.target.classList.contains('color-hsl')) {
                textToCopy = event.target.textContent.replace('HSL: ', ''); // "HSL: "を削除してコピー
            } else {
                // color-boxやcolor-nameなど、コード以外の部分がクリックされた場合はHEXコードをコピー
                textToCopy = item.querySelector('.color-hex').textContent; 
            }

            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        item.classList.add('copied');
                        setTimeout(() => {
                            item.classList.remove('copied');
                        }, 1000);
                    })
                    .catch(err => {
                        console.error('コピーに失敗しました:', err);
                        alert('コードのコピーに失敗しました。手動でコピーしてください: ' + textToCopy);
                    });
            }
        });
    });
});
