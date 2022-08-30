var unirest = require(process.env['HOME_PATH'] + '/node_modules/unirest');

var fs = require(process.env['HOME_PATH'] + '/node_modules/fs-extra');

var moment = require(process.env['HOME_PATH'] + '/node_modules/moment');



var utils = require(process.env['HOME_PATH'] + '/js/utils.js');

var constants = require(process.env['HOME_PATH'] + '/js/constants.js');



module.exports = {



    sendEventToClient: function (client_json, callback) {



        var client_config = JSON.parse(fs.readFileSync(constants.PATH_CLIENT + '/client_' + utils.getInstanceId() + '.json', 'utf8'));

        var client_headers = client_config.headers;

        var client_extras = client_config.extras;



        if (client_json.event_json.event.hasOwnProperty("tags")) {

            delete client_json.event_json.event["tags"];

        }



        if (client_config.method_type == "json") {



            client_json.event_json['extras'] = client_extras;



            var base64_images = [];



            utils.log(constants.DEBUG_INFO, "Json to client - not printing base64 data\n" + utils.getPrettyJSON(client_json.event_json));



            if (client_config.base64_encode) {

                for (var i = 0; i < client_json.event_json.event.properties.path.length; i++) {

                    base64_images.push(utils.base64_encode(client_json.event_json.event.properties.path[i]));

                }



                client_json.event_json['base64_images'] = base64_images;

            }

            console.log("Sinking client from primary source ======>")



            unirest.post(client_config.url)

                .headers({

                    'Accept': 'application/json',

                    'Content-Type': 'application/json'

                })

                .headers(client_headers)

                .timeout(constants.APP_REQUEST_TIMEOUT)

                .send(client_json.event_json)

                .end(function (response) {



                    utils.log(constants.DEBUG_LOG, "Response from client\n" + utils.getPrettyJSON(response));

                    utils.log(constants.DEBUG_INFO, "Status code from client " + response.statusType);



                    console.log(response.statusType, "here is the response from primary source")

                    if (response.statusType == 2) {

                        callback(true);

                    } else {

                        callback(false);

                    }

                });



        } else {

            client_json.event_json['extras'] = client_extras;



            var base64_images = [];



            utils.log(constants.DEBUG_INFO, "Json to client - not printing base64 data\n" + utils.getPrettyJSON(client_json.event_json));



            // if (client_config.base64_encode) {

                for (var i = 0; i < client_json.event_json.event.properties.path.length; i++) {

                    base64_images.push(utils.base64_encode(client_json.event_json.event.properties.path[i]));

                }



                client_json.event_json['base64_images'] = base64_images;

            // }
            
            if  (client_json.event_json.db_match == "true") {
                
                allowed_status == allow
            }
            else
            {
                allowed_status == restrict
            }
                       

            var data = {

                unique_id: client_json.event_json.unique_id,

                // camera_id: client_json.event_json.extras.camera_id,

                // lane_id: client_json.event_json.info.camera_id,

                plate: client_json.event_json.event.name,

                // confidence: client_json.event_json.event.confidence,

                // latitude: client_json.event_json.extras.latitude,

                // longitude: client_json.event_json.extras.longitude,

                vehicle_direction: client_json.event_json.event.vehicle_category.type,

                // vehicle_category_confidence: client_json.event_json.event.vehicle_category.confidence,

                event_timestamp: Math.round(parseFloat(client_json.event_json.info.event_timestamp)),

                full_image: client_json.event_json.event.properties.path[0],

                cropped_image: client_json.event_json.event.properties.path[1],

                // video: client_json.event_json.event.properties.video,

                evidence_image: client_json.event_json.event.properties.evidence_image[0]





            }

            console.log("====>evidence image for primary endpoint",data.evidence_image)
            console.log(data.full_image)

            console.log(data.camera_id + data.lane_id)

            console.log("==========================================================================================primary",data)

            unirest

                .post(client_config.url)

                // .headers({'Content-Type': 'multipart/form-data'})

                .headers(client_headers)

                .timeout(constants.APP_REQUEST_TIMEOUT)

                .field('id', data.id) // Form field

                .field('camera_id', data.camera_id + data.lane_id) // Form field

                .field('lane_id', data.lane_id) // Form field

                .field('plate', data.plate) // Form field

                .field('confidence', data.confidence) // Form field

                .field('latitude', data.latitude) // Form field

                .field('longitude', data.longitude) // Form field

                .field('vehicle_category', data.vehicle_category) // Form field

                .field('vehicle_category_confidence', data.vehicle_category_confidence) // Form field

                .field('event_timestamp', data.event_timestamp) // Form field

               // .field('alert', data.alert) // Form field

                .attach('full_image', data.full_image) // Form field

                .attach('cropped_image', data.cropped_image) // Form field

                .attach('evidence_image', data.evidence_image) // Form field

                .then(function (response) {

                    // utils.log(constants.DEBUG_LOG, "Response from client\n" + utils.getPrettyJSON(response));
                    //console.log(response)
                    utils.log(constants.DEBUG_INFO, "Status code from client " + response.statusType);



                    if (response.statusType == 2) {

                        console.log("status success client synced")

                        callback(true);

                    } else {

                        console.log("status failure client not synced")



                        callback(false);

                    }

                })

        }



    },

    sendEventToSecondaryClient: function (client_json, callback) {



        var client_config = JSON.parse(fs.readFileSync(constants.PATH_CLIENT + '/client_secondary_' + utils.getInstanceId() + '.json', 'utf8'));

        var client_headers = client_config.headers;

        var client_extras = client_config.extras;



        if (client_json.event_json.event.hasOwnProperty("tags")) {

            delete client_json.event_json.event["tags"];

        }



        if (client_config.method_type == "json") {



            client_json.event_json['extras'] = client_extras;



            var base64_images = [];



            utils.log(constants.DEBUG_INFO, "Json to client - not printing base64 data\n" + utils.getPrettyJSON(client_json.event_json));



            if (client_config.base64_encode) {

                for (var i = 0; i < client_json.event_json.event.properties.path.length; i++) {

                    base64_images.push(utils.base64_encode(client_json.event_json.event.properties.path[i]));

                }



                client_json.event_json['base64_images'] = base64_images;

            }



            console.log("sinking client from secondary source======>")

            unirest.post(client_config.url)

                .headers({

                    'Accept': 'application/json',

                    'Content-Type': 'application/json'

                })

                .headers(client_headers)

                .timeout(constants.APP_REQUEST_TIMEOUT)

                .send(client_json.event_json)

                .end(function (response) {

                    console.log(response.statusType, "here is the response from secondary source")



                    utils.log(constants.DEBUG_LOG, "Response from client\n" + utils.getPrettyJSON(response));

                    utils.log(constants.DEBUG_INFO, "Status code from client " + response.statusType);



                    if (response.statusType == 2) {

                        callback(true);

                    } else {

                        callback(false);

                    }

                });



        } else {

            client_json.event_json['extras'] = client_extras;



            var base64_images = [];



            utils.log(constants.DEBUG_INFO, "Json to client - not printing base64 data\n" + utils.getPrettyJSON(client_json.event_json));



            // if (client_config.base64_encode) {

                for (var i = 0; i < client_json.event_json.event.properties.path.length; i++) {

                    base64_images.push(utils.base64_encode(client_json.event_json.event.properties.path[i]));

                }



                client_json.event_json['base64_images'] = base64_images;

            // }

            var data = {

                id: client_json.event_json.id,

                camera_id: client_json.event_json.extras.camera_id,

                lane_id: client_json.event_json.info.camera_id,

                plate: client_json.event_json.event.name,

                confidence: client_json.event_json.event.confidence,

                latitude: client_json.event_json.extras.latitude,

                longitude: client_json.event_json.extras.longitude,

                vehicle_category: client_json.event_json.event.vehicle_category.type,

                vehicle_category_confidence: client_json.event_json.event.vehicle_category.confidence,

                event_timestamp: client_json.event_json.info.event_timestamp,

                full_image: client_json.event_json.event.properties.path[0],

                cropped_image: client_json.event_json.event.properties.path[1],

                // video: client_json.event_json.event.properties.video,

                evidence_image: client_json.event_json.event.properties.evidence_image[0]





            }
                console.log("=====> evidence image for secondary endpoint",data.evidence_image)
            console.log(data.camera_id + data.lane_id)
            console.log("==========================================================================================secondaryyyy",data)



            unirest

                .post(client_config.url)

                // .headers({'Content-Type': 'multipart/form-data'})

                .headers(client_headers)

                .timeout(constants.APP_REQUEST_TIMEOUT)

                .field('id', data.id) // Form field

                .field('camera_id', data.camera_id + data.lane_id) // Form field

                .field('lane_id', data.lane_id) // Form field

                .field('plate', data.plate) // Form field

                .field('confidence', data.confidence) // Form field

                .field('latitude', data.latitude) // Form field

                .field('longitude', data.longitude) // Form field

                .field('vehicle_category', data.vehicle_category) // Form field

                .field('vehicle_category_confidence', data.vehicle_category_confidence) // Form field

                .field('event_timestamp', data.event_timestamp) // Form field

               // .field('alert', data.alert) // Form field

                .field('full_image', data.full_image) // Form field

                .field('cropped_image', data.cropped_image) // Form field

                .field('evidence_image', data.evidence_image) // Form field

                .then(function (response) {

                    // utils.log(constants.DEBUG_LOG, "Response from client\n" + utils.getPrettyJSON(response));

                    utils.log(constants.DEBUG_INFO, "Status code from client " + response.statusType);



                    if (response.statusType == 2) {

                        console.log("status success client synced")

                        callback(true);

                    } else {

                        console.log("status failure client not synced")



                        callback(false);

                    }

                })

            }



    }



};
