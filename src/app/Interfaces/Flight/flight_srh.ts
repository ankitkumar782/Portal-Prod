export interface flight_srh {
    "Trip": Number,
    "Adt": Number,
    "Chd": Number,
    "Inf": Number,
    "Sector": [
        {
            "Src": String,
            "Des": String,
            "DDate": String
        }
    ],
    "PF": String,
    "PC": String,
    "Routing": String,
    "Ver": String,
    "Auth": {
        "AgentId": String,
        "Token": String
    },
    "Env": Number,
    "Module": String,
    "OtherInfo": {
        "PromoCode": String,
        "TraceId": String
    }
}