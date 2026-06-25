const SITE_URL = 'https://alansaban-a11y.github.io/hiperexponencial/';

async function init() {
  const data = await fetch('data.json').then(r => r.json());
  const fmt = (n) => Number(n).toLocaleString('es-AR', { maximumFractionDigits: 0 });
  const grid = document.getElementById('network-grid');
  if (!grid) return;
  document.getElementById('supply') && (document.getElementById('supply').textContent = `${fmt(data.total_mined_coins / 1e6)}M`);
  grid.innerHTML = [
    ['Ticker', '$' + data.ticker],
    ['Circulación', fmt(data.total_mined_coins) + ' HIPEX'],
    ['Max supply', fmt(data.max_supply)],
    ['Bloque', '#' + data.height],
    ['Market cap ref', '$100,001'],
  ].map(([l, v]) => `<div class="card"><div class="label">${l}</div><div class="value">${v}</div></div>`).join('');
  const tweet = `🚀 $HIPEX HIPEREXPONENCIAL — LANZADO HOY\n\n▸ 10M tokens\n▸ 21M max · PoW\n🔗 ${SITE_URL}\n\n#HIPEX #Crypto #Launch`;
  const tw = document.getElementById('share-twitter');
  if (tw) tw.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet);
}
init();