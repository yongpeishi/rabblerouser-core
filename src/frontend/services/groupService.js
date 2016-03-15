'use strict';

const Q = require('q');
const $ = require('jquery');

const handleResponseError = function(error) {

 switch(error.status) {
    case 401 : case 404 : throw new Error('NOT FOUND');
    default: throw new Error('NOT AVAILABLE');
  }

};

const isValidGroup = (group) => {
    return group.name && group.description;
};

const createGroup = function (group, labId) {
    return Q($.ajax({
          type: 'POST',
          url: `/branches/${labId}/groups`,
          data: group,
      }))
      .catch(handleResponseError)
      .then((data) => {
          if(data.id && isValidGroup(data)) {
              return data;
          }
          throw new Error('INVALID GROUP');
      });
};

const updateGroup = function (group, labId) {
    return Q($.ajax({
          type: 'PUT',
          url: `/branches/${labId}/groups/${group.id}`,
          data: group,
      }))
      .catch(handleResponseError)
      .then((data) => {
          if(data.id && isValidGroup(data)) {
              return data;
          }
          throw new Error('INVALID GROUP');
      });
};

const deleteGroup = (group, labId) => {
    return Q($.ajax({
          type: 'DELETE',
          url: `/branches/${labId}/groups/${group.id}`
      }))
      .catch(handleResponseError)
      .then((data) => {
          return data;
      });
};

export default {
    createGroup: createGroup,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup
};
