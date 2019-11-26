(function($) {
  let lastPage = '';

  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();

    lastPage = document.URL;

    $.ajax({
      method: 'GET',
      url:
        qod_vars.rest_url +
        '/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
    })
      .done(function(data) {
        const postData = data.shift();
        const postContent = postData.content.rendered;
        const postTitle = postData.title.rendered;
        const postSource = postData._qod_quote_source;
        const postSourceUrl = postData._qod_quote_source_url;

        history.pushState(null, null, qod_vars.home_url + '/' + postData.slug);
        //1st value is an object which manages State
        //2nd value is the url title browser tab
        //3rd value is the url in the browser

        $('.entry-content').html(postContent);
        if (postSourceUrl.length && postSource.length) {
          $('.entry-title').html(`<p> &ndash; ${postTitle}, </p>`);
          $('.source').html(
            `<p> &nbsp; <a href="${postSourceUrl}">${postSource}</a></p>`
          );
        } else if (postSource.length) {
          $('.entry-title').html(`<p> &ndash; ${postTitle}, </p>`);
          $('.source').html(`<p> &nbsp; ${postSource}</p>`);
        } else {
          $('.entry-title').html(`<p> &ndash; ${postTitle}</p>`);
          $('.source').html('');
        }
      })
      .fail(function(error) {}); //$.ajax
    //update page when use page forward/back
    $(window).on('popstate', function() {
      //update url
      window.location.replace(lastPage);
    });
  }); // end of show me another click

  $('#quote-submit-button').on('click', function(submit) {
    submit.preventDefault();

    $.ajax({
      method: 'POST',
      url: qod_vars.rest_url + 'wp/v2/posts/',
      data: {
        title: $('#quote-author').val(),
        content: $('#quote-content').val(),
        _qod_quote_source: $('#quote-source').val(),
        _qod_quote_source_url: $('#quote-source-url').val(),
        status: 'pending'
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', qod_vars.wpapi_nonce);
      }
    })
      .done(function() {
        $('#quote-submission-form').hide();
        $('.submit-success-message').show();
      })
      .fail(function() {
        $('.submit-fail-message').show();
      });
  });
})(jQuery);
//Immediately Invoked Function Expression, IIFE
//Invoked = calling/running a function
