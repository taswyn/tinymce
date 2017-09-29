define(
  'ephox.phoenix.demo.SearchDemo',

  [
    'ephox.katamari.api.Arr',
    'ephox.phoenix.api.dom.DomSearch',
    'ephox.phoenix.api.dom.DomWrapping',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.InsertAll',
    'ephox.sugar.api.events.DomEvent',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Class',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.properties.Value'
  ],

  function (Arr, DomSearch, DomWrapping, Insert, InsertAll, DomEvent, Element, Attr, Class, Css, Value) {
    return function () {
      var container = Element.fromTag('div');

      var contentHtml = '<div>' +
      '<p>This is the first paragraph<\/p>' +
      '<p>This is the second paragraph<\/p>' +
      '<p>The third paragraph is <span>significantly <span>more tricky<\/span> than the other stuff \'twas twas<\/span>.' +
      '<table>' +
      '<thead>' +
      '<tr>' +
      '<th>Column 1<\/th>' +
      '<th>Column 2<\/th>' +
      '<\/tr>' +
      '<\/thead>' +
      '<tbody>' +
      '<tr>' +
      '<td>Value 1<\/td>' +
      '<td>Value 2<\/td>' +
      '<\/tr>' +
      '<\/tbody>' +
      '<\/table>' +
      '<\/div>';

      var content = Element.fromHtml(contentHtml);
      var input = Element.fromTag('input');
      var button = Element.fromTag('button');
      Insert.append(button, Element.fromText('Highlight token'));
      Attr.set(button, 'type', 'input');

      var buttonWord = Element.fromTag('button');
      Attr.set(buttonWord, 'type', 'input');
      Insert.append(buttonWord, Element.fromText('Highlight word'));

      var wrapper = function () {
        var c = Element.fromTag('span');
        Class.add(c, 'highlighted');
        Css.set(c, 'background-color', '#cadbee');
        return DomWrapping.nu(c);
      };

      DomEvent.bind(button, 'click', function (event) {
        var token = Value.get(input);
        if (token.length > 0) {
          var matches = DomSearch.safeToken([content], token);
          highlight(matches);
        }
      });

      DomEvent.bind(buttonWord, 'click', function (event) {
        var word = Value.get(input);
        if (word.length > 0) {
          var matches = DomSearch.safeWords([content], [word]);
          highlight(matches);
        }
      });

      var highlight = function (matches) {
        Arr.each(matches, function (x) {
          DomWrapping.wrapper(x.elements(), wrapper);
        });
      };

      InsertAll.append(container, [input, button, buttonWord, content]);

      var ephoxUi = Element.fromDom(document.getElementById('ephox-ui'));
      Insert.append(ephoxUi, container);
    };
  }
);
