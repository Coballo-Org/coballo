#!/usr/bin/node

class Request {
    constructor() {
        this.api = 'https://coballobackend.onrender.com/coballo';
    }

    get(url) {
        return new Promise((res, rej) => {
            $.ajax({
                type: 'GET',
                url: this.api + url,
                contentType: 'application/json',
                dataType: 'json',
                success: function(data) {
                    res(data)
                },
                error: function(err) {
                    rej(err)
                }
            })
        })
    }

    post(url, data) {
        return new Promise((res, rej) => {
            $.ajax({
                type: 'POST',
                url: this.api + url,
                data: data,
                contentType: 'application/json',
                dataType: 'json',
                success: (data) => {
                    res(data);
                },
                error: (err) => {
                    rej(err);
                }
            })
        })
    }

    put(url, data) {
        return new Promise((res, rej) => {
            $.ajax({
                type: 'PUT',
                url: this.api + url,
                data: data,
                contentType: 'application/json',
                dataType: 'json',
                success: (data) => {
                    res(data);
                },
                error: (err) => {
                    rej(err);
                }
            })
        })
    }

    delete(url) {
        return new Promise((res, rej) => {
            $.ajax({
                type: 'DELETE',
                url: this.api + url,
                contentType: 'application/json',
                dataType: 'json',
                success: function(data) {
                    res(data)
                },
                error: function(err) {
                    rej(err)
                }
            })
        })
    }
}

request = new Request();