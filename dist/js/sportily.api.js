(function() {
  var generateLookup, module;

  module = angular.module('sportily.api', ['restangular', 'sportily.api.endpoints']);

  generateLookup = function(items) {
    var i, item, len, result;
    result = {};
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      result[item.id] = item;
    }
    return result;
  };

  module.provider('SportilyApi', function() {
    var config;
    config = {
      accessToken: null,
      baseUrl: 'http://oauth.sporti.ly'
    };
    this.setAccessToken = function(accessToken) {
      return config.accessToken = accessToken;
    };
    this.setBaseUrl = function(baseUrl) {
      return config.baseUrl = baseUrl;
    };
    this.$get = [
      'Restangular', function(Restangular) {
        return Restangular.withConfig(function(Configurer) {
          Configurer.setBaseUrl(config.baseUrl);
          Configurer.setDefaultHeaders({
            Authorization: 'Bearer ' + config.accessToken
          });
          Configurer.setErrorInterceptor(function(response) {
            return console.error(response);
          });
          return Configurer.addResponseInterceptor(function(data, operation) {
            var result;
            result = null;
            if (operation === 'getList') {
              result = data.data;
              result.lookup = generateLookup(data.data);
            } else {
              result = data;
            }
            return result;
          });
        });
      }
    ];
  });

}).call(this);

(function() {
  var endpoints, module;

  module = angular.module('sportily.api.endpoints', ['sportily.api']);

  endpoints = {
    'age-groups': 'AgeGroups',
    'clubs': 'Clubs',
    'competitions': 'Competitions',
    'divisions': 'Divisions',
    'fixtures': 'Fixtures',
    'members': 'Members',
    'organisations': 'Organisations',
    'people': 'People',
    'registrations': 'Registrations',
    'roles': 'Roles',
    'seasons': 'Seasons',
    'teams': 'Teams',
    'users': 'Users'
  };

  _.each(endpoints, function(service, endpoint) {
    return module.factory(service, [
      'SportilyApi', function(SportilyApi) {
        return SportilyApi.service(endpoint);
      }
    ]);
  });

}).call(this);
