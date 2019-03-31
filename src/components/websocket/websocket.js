import React, {Component} from 'react';
import SockJsClient from 'react-stomp';

class WebSocket extends Component {

  render() {
    return (
      <div>
        <SockJsClient
          url={`http://${this.props.ip}:8080/cast-a-spell`}
          options={{"sessionId": this.props.generateSessionId}}
          headers={{"type": 'host'}}
          topics={[`/topic/room/${this.props.roomId}`]}
          onMessage={(msg) => {
            if (msg.direction === undefined) {
              this.props.onShoot(msg.id);
            } else {
              this.props.onMove(msg.id, msg.direction);
            }
          }}
          onConnect={() => {
            this.props.setConnection(true);
          }}
          onDisconnect={() => {
            this.props.setConnection(false);
          }}/>
      </div>
    );
  }
}

export default WebSocket;