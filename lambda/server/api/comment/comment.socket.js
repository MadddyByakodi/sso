const { EventEmitter } = require('events');

const CommentEvent = new EventEmitter();

CommentEvent.setMaxListeners(0);

exports.EventEmitter = CommentEvent;

exports.register = (socket) => {
  const listener = (doc) => {
    const route = `/applicants/${doc.applicant_id}/comments`;
    socket.emit(route, doc);
  };

  CommentEvent.on('create', listener);

  socket.on('disconnect', () => CommentEvent
    .removeListener('create', listener));
};

