module = angular.module 'sportily.api.endpoints', [ 'sportily.api' ]

##
## A list of all of the supported endpoints.
##
endpoints =
    'age-groups': 'AgeGroups'
    'clubs': 'Clubs'
    'competitions': 'Competitions'
    'divisions': 'Divisions'
    'fixtures': 'Fixtures'
    'members': 'Members'
    'organisations': 'Organisations'
    'people': 'People'
    'registrations': 'Registrations'
    'roles': 'Roles'
    'seasons': 'Seasons'
    'teams': 'Teams'
    'users': 'Users'


##
## Generate factories for all of the supported endpoints.
##
_.each endpoints, (service, endpoint) ->
    module.factory service, [ 'SportilyApi', (SportilyApi) ->
        SportilyApi.service endpoint
    ]
