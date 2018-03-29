
var yaml = require('node-yaml');
var http = require('http');
var fs = require('fs');
var pathL = require('path');
const { URL } = require('url');
var cwd = '';

function parseConfig(name){
    try{
        var o = yaml.readSync(pathL.resolve(cwd, settings.sourceDir, name + '.yml'));
    }
    catch(e){
        //console.log(e);
        return false;
    }
    if(o.include){
        var i = parseConfig(o.include);
        delete o.include;
        Object.assign(o, i);
    }
    return o;
}

function respond(req, res){
    var u = new URL(req.url, 'http://127.0.0.1');
    var n = u.pathname;
    if(n.charAt(0) == '/')
        n = n.substr(1);
    if(n.charAt(n.length - 1) == '/')
        n = n.slice(0, -1);
    var c = parseConfig(n);
    if(!c){
        res.writeHead(307, { 'Content-Type': 'text/html', 'Location': '/' });
        res.end('Not Found. Go To <a href="/">here</a>.');
        return;
    }
    var t = JSON.stringify(c);
    if(c.template){
        t = fs.readFileSync(pathL.resolve(cwd, settings.templatesDir, c.template + '.html'), "utf8");
        t = t.replace(/\{\{.+?\}\}/g, function(m){
            var s = m.replace(/[{}]/g, '');
            Object.assign(this, c);
            var evalResultVar = '';
            try{
                eval('evalResultVar = ' + s + ';');
            }
            catch(e){
                return e.message;
            }
            return evalResultVar;
        });
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(t);
}

var settings = {};
var server = http.createServer(respond);

module.exports = {
    start(path){
        if(typeof path !== 'string'){
            console.log('Settings path must be a string.');
            return;
        }
        cwd = pathL.dirname(path);
        console.log('CWD: ', cwd, '\npATH:', path);
        settings = yaml.readSync(pathL.resolve(path));
        console.log('Settings:', settings);
        server.on('error', (err) => {
            console.log("Error: ", err);
        });
        server.listen(settings.port, 'localhost');
        console.log('Server running at http://localhost:' + settings.port);
    }
};
