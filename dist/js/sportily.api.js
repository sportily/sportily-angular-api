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
      baseUrl: 'https://api.sportilyapp.com'
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
    'calendar-events': 'CalendarEvents',
    'clubs': 'Clubs',
    'competitions': 'Competitions',
    'contacts': 'Contacts',
    'customRegistrationFields': 'CustomRegistrationFields',
    'division-entries': 'DivisionEntries',
    'divisions': 'Divisions',
    'documents': 'Documents',
    'events': 'Events',
    'files': 'Files',
    'fixture-entries': 'FixtureEntries',
    'fixtures': 'Fixtures',
    'galleries': 'Galleries',
    'images': 'Images',
    'members': 'Members',
    'organisations': 'Organisations',
    'payments': 'Payments',
    'participants': 'Participants',
    'people': 'People',
    'posts': 'Posts',
    'publications': 'Publications',
    'registrations': 'Registrations',
    'registration-roles': 'RegistrationRoles',
    'roles': 'Roles',
    'seasons': 'Seasons',
    'settings': 'Settings',
    'suspensions': 'Suspensions',
    'teams': 'Teams',
    'transactions': 'Transactions',
    'users': 'Users',
    'venues': 'Venues'
  };

  _.each(endpoints, function(service, endpoint) {
    return module.factory(service, [
      'SportilyApi', function(SportilyApi) {
        return SportilyApi.service(endpoint);
      }
    ]);
  });

}).call(this);
