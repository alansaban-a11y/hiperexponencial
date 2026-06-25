const SITE_URL = 'https://alansaban-a11y.github.io/hiperexponencial/';

async function init() {
  const data = await fetch('data.json').then(r => r.json());
  const fmt = (n) => Number(n).toLocaleString('es-AR', { maximumFractionDigits: 0 });

  document.getElementById('supply').textContent = `${fmt(data.total_mined_coins / 1e6)}M`;
  document.getElementById('max').textContent = `${fmt(data.max_supply / 1e6)}M`;
  document.getElementById('height').textContent = '#' + data.height;
  document.getElementById('reward').textContent = data.block_reward;

  document.getElementById('network-grid').innerHTML = [
    ['Ticker', '$' + data.ticker],
    ['Bloque actual', '#' + data.height],
    ['Dificultad', data.difficulty],
    ['Recompensa', data.block_reward + ' HIPEX'],
    ['Fundador', fmt(data.founder_balance) + ' HIPEX'],
    ['Market cap ref', '$100,001'],
    ['Hash', data.last_hash.slice(0, 18) + '...'],
  ].map(([l, v]) => `<div class="card"><div class="label">${l}</div><div class="value">${v}</div></div>`).join('');

  const erc20 = data.erc20 || {};
  const net = erc20.network || 'pendiente';
  const contract = erc20.contract || 'Pendiente deploy público';
  const explorer = erc20.explorer;
  const isPublic = contract.startsWith('0x') && net !== 'localhost' && net !== 'hardhat';

  document.getElementById('erc20-network').textContent = net;
  document.getElementById('erc20-contract').textContent = contract;
  if (isPublic && explorer) {
    document.getElementById('erc20-explorer').innerHTML = `<a href="${explorer}" target="_blank" rel="noopener" style="color:var(--accent)">${explorer}</a>`;
    document.getElementById('dex-status').innerHTML = `Contrato en <strong>${net}</strong>. Pool DEX próximamente.`;
  } else {
    document.getElementById('erc20-explorer').textContent = 'Disponible tras deploy en Polygon';
    document.getElementById('dex-status').textContent = 'ERC-20 en Polygon — deploy en curso. Miná HIPEX nativo mientras tanto.';
  }

  const tweet = `🚀 $HIPEX HIPEREXPONENCIAL — LANZADO HOY

▸ 10M tokens en circulación
▸ 21M max supply · PoW
▸ Dificultad hiperexponencial
▸ Market cap ref: $100,001

🔗 ${SITE_URL}

#HIPEX #Crypto #Bitcoin #Altcoin #100x #Memecoin #Launch`;

  document.getElementById('tweet-box').innerHTML = `<pre style="white-space:pre-wrap;font-size:0.9rem;color:var(--text)">${tweet}</pre>`;
  document.getElementById('tweet-btn').href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet);
  document.getElementById('share-twitter').href = document.getElementById('tweet-btn').href;
  document.getElementById('reddit-btn').href = 'https://www.reddit.com/submit?title=' + encodeURIComponent('$HIPEX - Hiperexponencial LANZADO: 10M en circulación, PoW, 21M max') + '&url=' + encodeURIComponent(SITE_URL);
  document.getElementById('copy-tweet').onclick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(tweet);
    e.target.textContent = '¡Copiado!';
    setTimeout(() => e.target.textContent = 'Copiar texto', 2000);
  };
}

init();