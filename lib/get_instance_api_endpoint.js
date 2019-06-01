module.exports = config => {
  // Accept config.wikibaseInstance for legacy support
  var instance = config.instance || config.wikibaseInstance

  if (!(typeof instance === 'string' && instance.startsWith('http'))) {
    throw new Error(`invalid instance: ${instance}`)
  }

  instance = instance
    .replace(/\/$/, '')
    .replace('/w/api.php', '')

  return `${instance}/w/api.php`
}
