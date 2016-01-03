function Cell(params) {
  return init(params);
}
Cell.assign = function() {
  var args = [Cell];
  Object.assign.apply(Object, args.concat.apply(args, arguments));
  return Cell;
};
module.exports = Cell;
function init(params) {
  var params2 = Object.assign({}, env, params)
    , observable = params2.observable
    , writable = params2.writable == null ? true : params2.writable
    ;
  function cell(value2, params3) {
    var value = cell.value
      , params4 = params3 || {}
      ;
    if (arguments.length) {
      if (writable || params4.writable) {
        var fn = (typeof params4 === 'function') ? params4 : params4.fn;
        cell.value = value2;
        if (fn) {
          fn(triggerEventsFn(value, value2));
        } else {
          triggerEventsFn(value, value2)();
        }
        return cell;
      } else {
        throw 'cell is not writable';
      }
    } else {
      return value;
    }
  }
  observable(cell);
  cell.send = function(cb) {
    var value = cell.value;
    if (typeof cb === 'string') {
      var value2 = value && value[cb];
      if (typeof value2 === 'function') {
        value2.apply(value, Array.prototype.slice.call(arguments, 1));
      } else {
        return value2;
      }
    } else if (typeof cb === 'function') {
      cb(value);
      return cell;
    } else {
      return value;
    }
  };
  function triggerEventsFn(value, value2) {
    return function () {
      cell.trigger('set', value2, value);
      if (value !== value2) {
        cell.trigger('change', value2, value);
      }
    };
  }
  return cell;
}
