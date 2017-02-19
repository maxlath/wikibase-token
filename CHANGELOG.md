# CHANGELOG
*versions follow [SemVer](http://semver.org)*

## 2.1.0 - 2017-02-19
* Added a `verbose` option to be optionaly passed in the config object

## 2.0.0 - 2017-02-17
* BREAKING CHANGE: returning ES6 promises instead of Bluebird promises, meaning that downstream promises don't have methods such as `tap` out of the box. The change actually accured at [d09d900](https://github.com/maxlath/wikidata-token/commit/d09d900a84dfde92460668647fca7dbf8520167b), so two patch versions actually ship with the breaking change: 1.0.8 and 1.0.9. All my apologies for the inconvinience.
