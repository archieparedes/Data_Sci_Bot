const Discord = require('discord.js');
const botconfig = require("./botconfig.json");
let {PythonShell} = require('python-shell');
const bot = new Discord.Client();


// console log print of bot connection
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
  });

function sleep(miliseconds) { // allows for processing
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {}
}

// commands
bot.on('message', (message) => {
    let prefix = botconfig.prefix;
    let messageArr = message.content.split(" ")
    let cmd = messageArr[0]; // command
    console.log(cmd);
    let args = messageArr.slice(1); // argument
    if (cmd == `${prefix}commands`) {
        message.channel.send("Command List:\n !hi\n !tech <job> \n !salary <job>");
    } else if (cmd == `${prefix}jenga`) {
        message.channel.send("How to win jenga", {files: ["https://i.imgur.com/mjiLIXn.mp4"]}); // files can be image or video urls
    } else if (cmd == `${prefix}shake`) {
        message.channel.send("thicccc", {files: ["https://i.imgur.com/jSGxuiJ.mp4"]});
    } else if (cmd == `${prefix}tech` && args[0] == "data"){
        var options = {
            scriptPath: './',
          };
        PythonShell.run('data_py.py', options, function (err) { // launches python file
            if (err) return;
            console.log('Python File Launched!'); // lets host know python file was executed
          }); 
        sleep(5000);
        message.channel.sendFile("foo.png"); // sends local image file
    } else if (cmd == `${prefix}tech` && args[0] == "software"){
        var options = {
            scriptPath: './',
          };
        PythonShell.run('soft_py.py', options, function (err) { // launches python file
            if (err) return;
            console.log('Python File Launched!'); // lets host know python file was executed
          }); 
        sleep(5000);
        message.channel.sendFile("foo2.png"); // sends local image file
    }else if (cmd == `${prefix}salary`) {
        if(args.length == 2){
            var options = {
                mode: 'text',
                encoding: 'utf8',
                pythonOptions: ['-u'],
                scriptPath: './',
                args: [args[0], args[1]]
              };
        } else if(args.length == 3){
            var options = {
                mode: 'text',
                encoding: 'utf8',
                pythonOptions: ['-u'],
                scriptPath: './',
                args: [args[0], args[1], args[2]]
              };
        } else if(args.length == 1){
            var options = {
                mode: 'text',
                encoding: 'utf8',
                pythonOptions: ['-u'],
                scriptPath: './',
                args: [args[0]]
              };
        } else {return;}
        PythonShell.run('sal.py', options, function (err, results) { // launches python file
            if (err) return;
            message.channel.send(results);
            console.log('Python sal.py File Launched!'); // lets host know python file was executed
          }); 

    } else if (cmd == `${prefix}hi`){
        message.channel.send("Hello! I am the Data Science Bot. :smile:");
        message.channel.sendFile("154594528493366171.gif");
        message.channel.send("Type '!commands' to see what I can do");
    } else if (cmd == `${prefix}update`){
        message.channel.send("Updating tech demand table.\nDuration: ~300seconds for 500+ job posting\n!DStech will output previous data in the mean time.");
        var options = {
            scriptPath: './',
          };
        PythonShell.run('indeed_data_pull.py', options, function (err) { // launches python file
            if (err) console.log("Failed to update");
            console.log('Python File Launched!'); // lets host know python file was executed
        }); 

        PythonShell.run('indeed_data_pull2.py', options, function (err) { // launches python file
            if (err) console.log("Failed to update");
            console.log('Python File Launched!'); // lets host know python file was executed
        }); 
    } else {
        return;
    }
});

// token read and login
var fs = require('fs'); 

fs.readFile('C:/Users/Archie/Documents/Discord_Bot/Data_Science_Bot/token', 'utf8', function(error, data){ // hard code in the path of token file
    bot.login(data)
});



