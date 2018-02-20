var ConfigLib = function(config){
    this.serviceConfig;
    if(config && config.services){
        serviceConfig = config.services;
    }
    return this;
}

ConfigLib.prototype.getKeycloakConfig = function(){
        return serviceConfig.filter(config => config.type = 'keycloak');
}

module.exports = ConfigLib
