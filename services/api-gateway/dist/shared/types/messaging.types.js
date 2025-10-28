"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingKeys = exports.ExchangeTypes = exports.MessageQueues = void 0;
var MessageQueues;
(function (MessageQueues) {
    MessageQueues["USER_EVENTS"] = "user_events";
    MessageQueues["DATA_EVENTS"] = "data_events";
    MessageQueues["NOTIFICATION_EVENTS"] = "notification_events";
    MessageQueues["SECURITY_EVENTS"] = "security_events";
})(MessageQueues = exports.MessageQueues || (exports.MessageQueues = {}));
var ExchangeTypes;
(function (ExchangeTypes) {
    ExchangeTypes["USER_EXCHANGE"] = "user_exchange";
    ExchangeTypes["DATA_EXCHANGE"] = "data_exchange";
    ExchangeTypes["NOTIFICATION_EXCHANGE"] = "notification_exchange";
    ExchangeTypes["SECURITY_EXCHANGE"] = "security_exchange";
})(ExchangeTypes = exports.ExchangeTypes || (exports.ExchangeTypes = {}));
var RoutingKeys;
(function (RoutingKeys) {
    RoutingKeys["USER_CREATED"] = "user.created";
    RoutingKeys["USER_UPDATED"] = "user.updated";
    RoutingKeys["USER_DELETED"] = "user.deleted";
    RoutingKeys["DATA_CREATED"] = "data.created";
    RoutingKeys["DATA_UPDATED"] = "data.updated";
    RoutingKeys["DATA_DELETED"] = "data.deleted";
    RoutingKeys["SECURITY_ALERT"] = "security.alert";
    RoutingKeys["NOTIFICATION_REQUEST"] = "notification.request";
})(RoutingKeys = exports.RoutingKeys || (exports.RoutingKeys = {}));
