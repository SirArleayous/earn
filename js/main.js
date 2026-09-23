/**
 * SINEX Global Framework Core
 */
const SINEX = {
  // Global Mock Database Architecture stored in memory/localStorage
  init() {
    if (!localStorage.getItem('sinex_session')) {
      localStorage.setItem('sinex_session', JSON.stringify({
        isLoggedIn: true,
        role: 'USER',
        user: {
          name: 'Alex Kwame',
          email: 'alex.kwame@sinex.africa',
          country: 'NG',
          currency: 'NGN',
          symbol: '₦',
          balance: 24500,
          pending: 3500,
          verifiedLevel: 2
        }
      }));
    }
  },

  getSession() {
    return JSON.parse(localStorage.getItem('sinex_session'));
  },

  setRole(role) {
    const session = this.getSession();
    session.role = role;
    localStorage.setItem('sinex_session', JSON.stringify(session));
  },

  formatCurrency(amount, currencyCode = 'NGN') {
    const currencies = {
      NGN: { symbol: '₦', rate: 1 },
      UGX: { symbol: 'UGX ', rate: 2.4 },
      GHS: { symbol: 'GH₵', rate: 0.012 },
      KES: { symbol: 'KSh ', rate: 0.095 }
    };
    const target = currencies[currencyCode] || currencies.NGN;
    return `${target.symbol}${(amount * target.rate).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  },

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'sinex-toast';
    toast.innerHTML = `<span>ℹ️</span> <div>${message}</div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }
};

document.addEventListener('DOMContentLoaded', () => SINEX.init());