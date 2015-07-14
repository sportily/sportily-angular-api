module = angular.module 'sportily.api', [
    'restangular'
    'sportily.api.endpoints'
]


##
## A utility method to generate a lookup table for a collection.
##
generateLookup = (items) ->
    result = {}
    result[item.id] = item for item in items
    result


##
## Define the low-level Sportily API interface that provides basic access to
## all the endpoints of the Sportily API.
##
module.provider 'SportilyApi', ->

    # default configuration values.
    config =
        accessToken: null
        baseUrl: 'http://oauth.sporti.ly'


    ##
    ## Sets the access token that should be included in the Authorization
    ## header of every request made to the API.
    ##
    @setAccessToken = (accessToken) ->
        config.accessToken = accessToken


    ##
    ## Sets the base URL that all relative URLs will be prepended with.
    ##
    @setBaseUrl = (baseUrl) ->
        config.baseUrl = baseUrl

    ##
    ## Create a custom restangular instance that is configured with the
    ## necessary Sportily API settings, including the access token in the
    ## header.
    ##
    @$get = ['Restangular', (Restangular) ->
        Restangular.withConfig (Configurer) ->
            # point restangular at the live sportily endpoints.
            Configurer.setBaseUrl config.baseUrl

            # ensure the access token is appended to every request.
            Configurer.setDefaultHeaders
                Authorization: 'Bearer ' + config.accessToken

            # basic logging of all error messages.
            Configurer.setErrorInterceptor (response) ->
                console.error response

            # process all responses, generating a lookup table for lists.
            Configurer.addResponseInterceptor (data, operation) ->
                result = null

                if operation == 'getList'
                    result = data.data
                    result.lookup = generateLookup data.data
                else
                    result = data

                result
    ]

    # prevent the provider function from being returned.
    return
