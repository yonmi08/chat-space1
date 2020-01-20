$(function(){

  var buildHTML = function(message) {
    var top =  //text+image
    `<div class="message" data-message-id= "${message.id}" >
          <div class="main__message-sub">
            <div class="main__message-sub-name">
              ${message.user_name}
            </div>
            <div class="main__message-sub-date">
              ${message.created_at}
            </div>
          </div>`

var text =  //textのみ
          `<div class="main__message-text">
          <p class="lower-message__content">
            ${message.text}
          </p>
          </div>`

var image = //imageのみ
          `<div class="main__message-text">
          <img src="${message.image}" class="lower-message__image" >
          </div>`

    if (message.text && message.image) {
      var html = `
                    ${top}
                    ${text}
                    ${image}
                  </div>`
    } else if (message.text) {
      var html = `
                  ${top}
                  ${text}
                  </div>`
    } else if (message.image) {
      var html = `
                  ${top}
                  ${image}
                  </div>`
    };
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
        $('.main__message').append(html)
        $('.main__message').animate({ scrollTop: $('.main__message')[0].scrollHeight})
        $('form')[0].reset();
        $('.form__submit').prop('disabled', false);
      })
      .fail(function(){
        alert('メッセージの送信に失敗しました');
      })
    })

      var reloadMessages = function() {
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        last_message_id = $('.message:last').data("message-id");
        $.ajax({
          //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          if (messages.length !== 0) {
          var insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.main__message').append(insertHTML);
          $('.main__message').animate({ scrollTop: $('.main__message')[0].scrollHeight});
          $("#new_message")[0].reset();
          $(".form__submit").prop("disabled", false);
        }
        })
        .fail(function() {
        });
      };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});
