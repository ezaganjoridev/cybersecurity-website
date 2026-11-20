// Single-page-app deep-link redirect, adapted from rafgraph's MIT-licensed
// redirect shim. Sends an unmatched path to index.html for client-side routing.
(function redirectToApp(location) {
  var pathSegmentsToKeep = 0;
  location.replace(
    location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
      + location.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/'
      + location.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~')
      + (location.search ? '&' + location.search.slice(1).replace(/&/g, '~and~') : '')
      + location.hash,
  );
}(window.location));
