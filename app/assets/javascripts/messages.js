$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = //メッセージに画像が含まれる場合
                 `<div class="main__message-sub" data-id=${message.id}>
                    <div class="main__message-sub">
                      <div class="main__message-sub-name">
                          ${message.user_name}
                      </div>
                      <div class="main__message-sub-date">
                          ${message.created_at}
                      </div>
                    </div>
                    <div class="main__message-text">
                      <p class="lower-message__content">
                          ${message.text}
                      </p>
                      <img src=${message.image} >
                    </div>
                 </div>`
    } else {
      var html = //メッセージに画像が含まれない場合
                `<div class="message">
                  <div class="main__message-sub">
                    <div class="main__message-sub-name">
                        ${message.user_name}
                    </div>
                    <div class="main__message-sub-date">
                        ${message.created_at}
                    </div>
                  </div>
                  <div class="main__message-text">
                    <p class="lower-message__content">
                        ${message.text}
                    </p>
                  </div>
                </div>`
    }
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html)
      $('.main__message').animate({ scrollTop: $('.main__message')[0].scrollHeight})
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
  })
});
