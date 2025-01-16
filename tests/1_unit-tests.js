const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function() {

    test('Whole number input', function() {
      assert.equal(convertHandler.getNum('32L'), 32);
    });

    test('Decimal number input', function() {
      assert.equal(convertHandler.getNum('3.14kg'), 3.14);
    });

    test('Fractional input', function() {
      assert.equal(convertHandler.getNum('1/2mi'), 0.5);
    });

    test('Fractional input with decimal', function() {
      assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
    });

    test('Invalid input (double fraction)', function() {
      assert.equal(convertHandler.getNum('3/2/3gal'), 'invalid number');
    });

    test('Default to 1 when no numerical input is provided', function() {
      assert.equal(convertHandler.getNum('kg'), 1);
    });

  });

  suite('Function convertHandler.getUnit(input)', function() {

    test('Each valid unit input', function() {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      const expected = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getUnit(ele), expected[i]);
      });
    });

    test('Unknown unit input', function() {
      assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
    });

  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {

    test('Correct return unit for each valid input unit', function() {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expected[i]);
      });
    });

  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {

    test('Spelled-out string unit for each valid input unit', function() {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expected = ['gallons', 'litres', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expected[i]);
      });
    });

  });

  suite('Function convertHandler.convert(num, unit)', function() {

    test('Convert gal to L', function() {
      const input = [5, 'gal'];
      const expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    });

    test('Convert L to gal', function() {
      const input = [5, 'L'];
      const expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    });

    test('Convert mi to km', function() {
      const input = [5, 'mi'];
      const expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    });

    test('Convert km to mi', function() {
      const input = [5, 'km'];
      const expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    });

    test('Convert lbs to kg', function() {
      const input = [5, 'lbs'];
      const expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    });

    test('Convert kg to lbs', function() {
      const input = [5, 'kg'];
      const expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    });

  });

});