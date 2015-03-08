var pages = new Bloodhound({
  datumTokenizer: function(datum) {
       var tokens = datum.title.split(" ");
       return tokens.concat($.map(datum.tags.split(","), function(e,i) { return e.trim() }));
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '/data/pages.json',
  limit: 30
});

pages.initialize();

$('#remote .typeahead').typeahead(null, {
  name: 'blog-titles',
  displayKey: 'title',
  source: pages.ttAdapter(),
  hint: false,
  templates:{
    suggestion: Handlebars.compile('<p class="bcandle.suggestion"><a href="{{url}}"><strong>{{title}}</strong></a></p>')
  }
}).bind("typeahead:selected", function(obj, datum, name) {
  window.location=datum.url;
});