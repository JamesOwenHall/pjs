var expect = require('expect.js');
var pjs    = require('../lib/pjs.js');

describe('pjs', function() {
  var lines = ['a', 'b', 'foo', 'bar'];

  describe('filter', function() {
    it('does not modify the array if the exp is always true', function() {
      var result = pjs.filter(lines, 'true');
      expect(result).to.eql(lines);
    });

    it('binds any string prototype keys to the line in question', function() {
      var result = pjs.filter(lines, 'length === 3');
      expect(result).to.eql(['foo', 'bar']);
    });

    it('requires the line be referenced as "$" if explicit is true', function() {
      var result = pjs.filter(lines, '$.indexOf("b") !== -1', true);
      expect(result).to.eql(['b', 'bar']);
    });
  });

  describe('map', function() {
    it('modifies the array with the given expression', function() {
      var result = pjs.map(lines, '"i"');
      expect(result).to.eql(['i', 'i', 'i', 'i']);
    });

    it('binds any string prototype keys to the line in question', function() {
      var result = pjs.map(lines, 'toUpperCase()');
      expect(result).to.eql(['A', 'B', 'FOO', 'BAR']);
    });

    it('requires the line be referenced as "$" if explicit is true', function() {
      var result = pjs.map(lines, '$.charAt(0)', true);
      expect(result).to.eql(['a', 'b', 'f', 'b']);
    });
  });

  describe('reduce', function() {
    it('returns the length when passed as the expression', function() {
      var result = pjs.reduce([1, 2, 3], 'length');
      expect(result).to.be(3);
    });

    it('returns the min when passed as the expression', function() {
      var result = pjs.reduce([2, 4, 8], 'min');
      expect(result).to.be(2);
    });

    it('returns the max when passed as the expression', function() {
      var result = pjs.reduce([2, 4, 8], 'max');
      expect(result).to.be(8);
    });

    it('returns the sum when passed as the expression', function() {
      var result = pjs.reduce([1, 2, 3], 'sum');
      expect(result).to.be(6);
    });

    it('returns the avg when passed as the expression', function() {
      var result = pjs.reduce([1, 2, 3], 'avg');
      expect(result).to.be(2);
    });

    it('returns the concatenated string when passed "concat"', function() {
      var result = pjs.reduce([1, 2, 3], 'concat');
      expect(result).to.be('123');
    });

    it('accepts a custom expression, passing prev and curr', function() {
      var result = pjs.reduce([1, 2, 3], 'prev + curr');
      expect(result).to.be(6);
    });

    it('accepts a custom expression, also passing i and array', function() {
      var result = pjs.reduce([1, 2, 3], '3 * array[i]');
      expect(result).to.be(9);
    });
  });
});
