const defaultInstance = 'https://www.wikidata.org/w/api.php'

module.exports = (config) => config.wikibaseInstance || defaultInstance
