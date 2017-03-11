import React from 'react';
import store from './store';


export default class Component extends React.Component {

    constructor() {
        super();
        this.update = this.forceUpdate.bind(this);
        this.dataTriggers = [];
        this.actionTriggers = [];
    }

    updateOnData(key) {
        store.listenData(key, this.update);
        this.dataTriggers.push(key);
    }

    updateOnAction(key) {
        store.listenAction(key, this.update);
        this.dataTriggers.push(key);
    }

    componentWillUnmount() {
        for (var i in this.dataTriggers)
            store.unlistenData(this.dataTriggers[i], this.update);
        for (var i in this.actionTriggers)
            store.unlistenData(this.actionTriggers[i], this.update);
    }
}
