/*
 * HFOS - Hackerfleet Operating System
 * ===================================
 * Copyright (C) 2011-2019 Heiko 'riot' Weinen <riot@c-base.org> and others.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

class equipmentcomponent {

    constructor($scope, $rootScope, objectproxy, user, $state, socket) {
        this.scope = $scope;
        this.rootscope = $rootScope;
        this.op = objectproxy;
        this.user = user;
        this.state = $state;
        this.socket = socket;

        let self = this;

        self.equipment = {};

        this.getEquipment = function () {
            self.op.search('equipment', '', '*').then(function (msg) {
                for (let item of msg.data.list) {
                    self.equipment[item.uuid] = item;
                }
            });

        };

        if (this.user.signedin === true) {
            console.log('User signed in. Getting data.');
            this.getEquipment();
        }

        $scope.$on('User.Login', this.getEquipment);
    }
}

equipmentcomponent.$inject = ['$scope', '$rootScope', 'objectproxy', 'user', '$state', 'socket'];

export default equipmentcomponent;
