const {isArray, isObject} = require('util');

module.exports = {
    prepareErrorResponse: (err) => {
        if(isArray(err)) {
            return {
                status: 'error',
                data: null,
                errors: err
            };
        }else if(isObject(err)) {
            return {
                status: 'error',
                data: null,
                errors: [{
                    message : err.message
                }]
            };
        }else {
            return {
                status: 'error',
                data: null,
                errors: [{
                    message : err
                }]
            };
        }
    } ,
    prepareSuccessResponse: (data) => {
        let res =  {
            status : 'success',
            data: {},
            errors : null
        };
        data = _normalizeData(data);
        if(isArray(data)) {
            res.data.items = data;
        }else {
            res.data = data;
        }

        return res;
    },
}

function _normalizeData(response){
    let data = response;
    if(isArray(data)){
        data.forEach(item => {
            if(isObject(item) && item._doc){
                item = item._doc;
                item.id = item._id;
                delete item._id;
                for(key in item){
                    if(key === '__v'){
                        delete item[key];
                    }else if(isArray(item[key])){
                        clearAttributes(item[key]);
                    }
                }
            }
        });
    }else if(isObject(data) && data._doc){
        data = data._doc;
        data.id = data._id;
        delete data._id;
        for(key in data){
            if(key === '__v'){
                delete data[key];
            }else if(isArray(data[key])){
                clearAttributes(data[key]);
            }
        }
    }

    return data;
}

function clearAttributes(data) {
    data.forEach(item => {
        if(isObject(item) && item._doc){
            item = item._doc;
            item.id = item._id;
            delete item._id;
            for(key in item){
                if(key === '__v'){
                    delete item[key];
                }
            }
        }
    })
}