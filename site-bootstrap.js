(function initializePage() {
  // Clickjacking defence. GitHub Pages cannot send X-Frame-Options, and
  // frame-ancestors is ignored when the policy arrives in a <meta> element,
  // so refusing to render inside a frame is the only enforceable control.
  if (window.self !== window.top) {
    // Blank the document before attempting to escape: navigating the top
    // frame can be refused silently from a sandboxed or cross-origin frame,
    // and a page left visible inside an attacker's frame is the whole bug.
    document.documentElement.style.display = 'none';

    try {
      window.top.location = window.self.location;
    } catch (error) {
      // Top-level navigation refused; the blanked document is what remains.
    }

    return;
  }

  var theme = 'dark';

  try {
    var saved = window.localStorage.getItem('csc.theme');
    theme = saved === 'light' || saved === 'dark'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  } catch (error) {
    theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  document.documentElement.dataset.theme = theme;
  // Must follow the theme so native controls match the page colour scheme.
  document.documentElement.style.colorScheme = theme;

  if (theme === 'light') {
    document.querySelector('#site-favicon').setAttribute('href', '/shield-light.svg?v=2');
    document.querySelector('#site-mask-icon').setAttribute('href', '/shield-light.svg?v=2');
    document.querySelector('#site-mask-icon').setAttribute('color', '#2563eb');
    document.querySelector('#site-theme-color').setAttribute('content', '#f4f7fb');
  }

  // Restore the original path after the static-host deep-link redirect.
  var location = window.location;
  if (location.search && location.search[1] === '/') {
    var decoded = location.search.slice(1).split('&').map(function decodeSegment(segment) {
      return segment.replace(/~and~/g, '&');
    }).join('?');

    window.history.replaceState(
      null,
      '',
      location.pathname.slice(0, -1) + decoded + location.hash,
    );
  }
}());
