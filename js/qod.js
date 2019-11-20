(function($) {
  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();
    console.log('clicked');

    $.ajax({
      method: 'GET',
      url:
        qod_vars.rest_url +
        '/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
    })
      .done(function(data) {
        console.log(data);

        const postObj = data[0];

        if (postObj._qod_quote_source !== '') {
          // output some html
          console.log(postObj._qod_quote_source);
        }

        const quote = `
        <article>
            <div class="entry-content">${data[0].content.rendered}</div>
            <div class="entry-meta">
                <h2 class="entry-title">${data[0].title.rendered}</h2>
                <a class="source-url" href="${data[0]._qod_quote_source_url}">
                    <p class="source">${data[0]._qod_quote_source}</p>
                </a>
            </div>
        </article>
        `;
        // const quoteMeta = function quoteMetaProcessing(data) {
        //   if (data[0]._qod_quote_source && data[0].qod_quote_source_url) {
        //   }
        // };
        $('article').html(quote);
      })
      .fail(function(error) {
        console.log(error, 'An error has occurred');
      });
  }); //1. add click event to "Show Me Another" btn
  //2. get request to grab random post and append to DOM
  //3. post new quote using the post method
  //4. have .done(), .fail(), .always() functions
  //5. post new quote using post method
  //6. use form to submit quote - .submit() event
})(jQuery);
//Immediately Invoked Function Expression, IIFE
//Invoked = calling/running a function
