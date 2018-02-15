
var ConfigLib = function(config){
    var serviceConfig;
    if(config && config.services){
        serviceConfig = config.services;
    }
    this.getKeycloakConfig = function(){
        return serviceConfig.filter(config => config.type = 'keycloak');
    }
    return this;
}


// WIP - experiment
// TypeScript support?
module.exports = ConfigLib