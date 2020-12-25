const app = {
    chat: (roomId, title) => {
        const dataRoom = {
            id: roomId,
            title: title
        }
        try {
            const rooms = JSON.parse(localStorage.getItem('chatme-rooms')) || [];
            rooms.unshift(dataRoom)
            console.log([...new Set(rooms)])
            localStorage.setItem('chatme-rooms', JSON.stringify(rooms))
        } catch (err) {
            localStorage.setItem('chatme-rooms', JSON.stringify([]))
        }
        const socket = io('/chatroom', { transports: ['websocket'] });

        // Socket Connect
        socket.on('connect', () => {
            socket.emit('join', roomId);

            // Send message
            $(".chat-message button").on('click', function (e) {

                const textareaEle = $("textarea[name='message']");
                const messageContent = textareaEle.val().trim();
                if (messageContent !== '') {
                    const message = {
                        content: messageContent,
                        date: Date.now()
                    };

                    textareaEle.val('');
                    socket.emit('newMessage', roomId, message, (message) => {
                        app.utils.addMessage(message);
                    });
                }
            });
        })

        // Receive message
        socket.on('addMessage', function (message) {
            app.utils.addMessage(message);
        });
    },

    utils: {
        // Adding a new message to chat history
        addMessage: function (message) {
            message.date = (new Date(message.date)).toLocaleString();

            const html = `<li>
                          <div class="message-data">
                            <span class="message-data-name">${message.username}</span>
                            <span class="message-data-time">${new Date(message.date).toLocaleString()}</span>
                          </div>
                          <div class="message my-message" dir="auto">${message.content}</div>
                        </li>`;
            $(html).hide().appendTo('.chat-history ul').slideDown(200);

            // Keep scroll bar down
            $(".chat-history").animate({ scrollTop: $('.chat-history')[0].scrollHeight }, 1000);
        }
    }
}