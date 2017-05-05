'use strict';

module.exports = function(Currencylist) {
  Currencylist.validatesUniquenessOf('currency');
};
