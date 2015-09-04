/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define*/

define(
    ['./ConductorTelemetryCapability'],
    function (ConductorTelemetryCapability) {
        'use strict';

        /**
         * Decorates the `capabilityService` such that any exposed `telemetry`
         * capabilities have their requests mediated by the time conductor.
         *
         * @constructor
         * @memberof platform/features/conductor
         * @implements {CapabilityService}
         * @param {platform/features/conductor.ConductorService} conductorServe
         *        the service which exposes the global time conductor
         * @param {CapabilityService} capabilityService the decorated service
         */
        function ConductorCapabilityDecorator(conductorService, capabilityService) {
            this.conductorService = conductorService;
            this.capabilityService = capabilityService;
        }

        ConductorCapabilityDecorator.prototype.getCapabilities = function (model) {
            var capabilities = this.capabilityService.getCapabilities(model),
                TelemetryCapability = capabilities.telemetry,
                conductorService = this.conductorService;

            if (TelemetryCapability) {
                capabilities.telemetry = function (domainObject) {
                    return new ConductorTelemetryCapability(
                        conductorService.getConductor(),
                        new TelemetryCapability(domainObject)
                    );
                };
            }

            return capabilities;
        };

        return ConductorCapabilityDecorator;
    }
);
