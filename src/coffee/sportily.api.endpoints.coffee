module = angular.module 'sportily.api.endpoints', [ 'sportily.api' ]

##
## A list of all of the supported endpoints.
##
endpoints =
    'age-groups': 'AgeGroups'
    'calendar-events': 'CalendarEvents'
    'clubs': 'Clubs'
    'competitions': 'Competitions'
    'contacts': 'Contacts'
    'customRegistrationFields': 'customRegistrationFields'
    'division-entries': 'DivisionEntries'
    'divisions': 'Divisions'
    'documents': 'Documents'
    'events': 'Events'
    'files': 'Files'
    'fixture-entries': 'FixtureEntries'
    'fixtures': 'Fixtures'
    'galleries': 'Galleries'
    'images': 'Images'
    'members': 'Members'
    'organisations': 'Organisations'
    'payments': 'Payments'
    'participants': 'Participants'
    'people': 'People'
    'posts': 'Posts'
    'publications': 'Publications'
    'registrations': 'Registrations'
    'registration-roles': 'RegistrationRoles'
    'roles': 'Roles'
    'seasons': 'Seasons'
    'settings': 'Settings'
    'suspensions': 'Suspensions'
    'teams': 'Teams'
    'transactions': 'Transactions'
    'users': 'Users'
    'venues': 'Venues'


##
## Generate factories for all of the supported endpoints.
##
_.each endpoints, (service, endpoint) ->
    module.factory service, [ 'SportilyApi', (SportilyApi) ->
        SportilyApi.service endpoint
    ]
