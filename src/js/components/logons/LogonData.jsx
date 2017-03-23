import React from 'react';
import { Card, Button } from 'react-materialize';
import io from 'socket.io-client';

import Rx from 'rxjs';
import Map from '../map/Map';
import config from '../../../../config/conf';

// connect to websocket server to get logon data
let socket = io(config.SOCKET_URL);

export default class LogonData extends React.Component {
    constructor(props) {
        super(props);
    
        // register observable for logon data
        this.state = { 
            logons: [],
            progress: 0
        }

        this.progress$ = new Rx.Subject();
        

        this.getLogonData = this.getLogonData.bind(this);
    }

    handleData(data) {
        let result = JSON.parse(data);
    }

    async getLogonData () {
        let state = this.state;
    
        // get logon data from websocket with observable
        function storeData(data) {
            state.logons.push(data);
        }

        // get data stream from websocket
       let logon$ = this.state.logon$;

        socket.on('message', console.log);
        socket.emit('message', 'this is a test message');

        socket.on('data', data => {
            this.progress$.next(data[1])
            this.state.logons.push(data[0]);
        });     
    }


    componentDidMount() { }

    componentWillUnmount() {
        socket.disconnect();
     }

     updateProgress() {
         this.progress$.subscribe(x => { this.state.progress = x} )
     }

    render() {

        this.getLogonData();
       
        return (
            <div>
                <p>{this.updateProgress()}</p>
             <Map />
            </div>           
        )
    }
}