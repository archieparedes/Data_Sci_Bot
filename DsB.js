const Discord = require('discord.js'); // api
const botconfig = require("./botconfig.json"); // prefix
let {PythonShell} = require('python-shell'); // for python files
const bot = new Discord.Client();

// console log print of bot connection
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
  });

function sleep(miliseconds) { // sleep timer: allows for processing
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {}
}
console.log("Terrible code: ENGAGED!");

// ***** THIS IS UGLY RIGHT NOW. NEEDS TO BE A SWITCH STATEMENT - Archie *****
bot.on('message', (message) => {
    let prefix = botconfig.prefix; // current prefix: '!'
    let messageArr = message.content.split(" ") // anything after messageArr[0] = arguments/params
    let cmd = messageArr[0]; // command
    let args = messageArr.slice(1); // argument

    console.log(cmd);

    if (cmd == `${prefix}commands`) {
        message.channel.send("Command List:\n !tech <job> \n !salary <job>\n !cloud <job>");
        
    } else if (cmd == `${prefix}q`){
        message.channel.send("Do you guys have any questions?");
        message.channel.sendFile("questions.gif");
        message.channel.send("Add me to your serve:\nhttps://discordapp.com/oauth2/authorize?client_id=540272430942519318&scope=bot&permissions=523336");
    }else if (cmd == `${prefix}jenga`) { // easter egg #1
        message.channel.send("How to win jenga", {files: ["https://i.imgur.com/mjiLIXn.mp4"]}); // files can be image or video urls

    } else if (cmd == `${prefix}shake`) { // easter egg #2
        message.channel.send("thicccc", {files: ["https://i.imgur.com/jSGxuiJ.mp4"]});

    } else if (cmd == `${prefix}tech` && args[0] == "data"){ // data science tech demand
        var options = {
            scriptPath: './',
          };
        PythonShell.run('data_py.py', options, function (err) { // launches python file
            if (err) return;
            console.log('Python File Launched!'); // lets host know python file was executed
          }); 
        sleep(5000); // delay for processing
        message.channel.sendFile("foo.png"); // sends local image file

    } else if (cmd == `${prefix}tech` && args[0]+" "+args[1] == "software developer"){ // software developer tech demand
        var options = {
            scriptPath: './',
          };
        PythonShell.run('soft_py.py', options, function (err) { // launches python file
            if (err) return;
            console.log('Python File Launched!'); // lets host know python file was executed
          }); 
        sleep(5000);// delay for processing
        message.channel.sendFile("foo2.png"); // sends local image file

    } else if (cmd == `${prefix}tech` && args[0]+" "+args[1] == "software engineer"){ // software developer tech demand
        var options = {
            scriptPath: './',
          };
        PythonShell.run('soft_py_eng.py', options, function (err) { // launches python file
            if (err) return;
            console.log('Python File Launched!'); // lets host know python file was executed
          }); 
        sleep(5000);// delay for processing
        message.channel.sendFile("foo3.png"); // sends local image file

    } else if (cmd == `${prefix}salary`) {
        if(args.length == 2){ // 2 string jobs ex.) computer science
            var options = {
                mode: 'text',
                encoding: 'utf8',
                pythonOptions: ['-u'],
                scriptPath: './',
                args: [args[0], args[1]]
              };

        } else if(args.length == 3){ // 3 string jobs ex.) information technology administrator
            var options = {
                mode: 'text',
                encoding: 'utf8',
                pythonOptions: ['-u'],
                scriptPath: './',
                args: [args[0], args[1], args[2]]
              };

        } else if(args.length == 1){ // 1 string jobs ex.) nanny
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

    } else if (cmd == `${prefix}hi`){ // introductions
        message.channel.send("Hello! I am the Data Science Bot. :smile:");
        message.channel.sendFile("154594528493366171.gif");
        message.channel.send("Type '!commands' to see what I can do");

    } else if (cmd == `${prefix}update` && args[0] == "software"){
        message.channel.send("Updating tech demand table - software.\nDuration: ~300seconds for 500+ job posting\n'!tech software developer' will output previous data in the mean time.");
        var options = {
            scriptPath: './',
          };
        PythonShell.run('indeed_data_pull2.py', options, function (err) { // launches python file
            if (err) console.log("Failed to update");
            console.log('Python File Launched!'); // lets host know python file was executed
        }); 

    } else if (cmd == `${prefix}update` && args[0] == "data"){
        message.channel.send("Updating tech demand table - data.\nDuration: ~300seconds for 500+ job posting\n'!tech data science' will output previous data in the mean time.");
        var options = {
            scriptPath: './',
          };
        PythonShell.run('indeed_data_pull.py', options, function (err) { // launches python file
            if (err) console.log("Failed to update");
            console.log('Python File Launched!'); // lets host know python file was executed
        }); 

    } else if(cmd == `${prefix}cloud` && args[0]+" "+args[1] == "software engineer"){
        var options = {
            scriptPath: './',
          };
        PythonShell.run('CLOUDsoft_py_eng.py', options, function (err) { // launches python file
            if (err) return;
            console.log('Python File Launched!'); // lets host know python file was executed
          }); 
        sleep(5000);// delay for processing
        message.channel.sendFile("cloudSoftEng.png"); // sends local image file

    } else if(cmd == `${prefix}cloud` && args[0]+" "+args[1] == "software developer"){
        var options = {
            scriptPath: './',
          };
        PythonShell.run('CLOUDsoft_py.py', options, function (err) { // launches python file
            if (err) return;
            console.log('Python File Launched!'); // lets host know python file was executed
          }); 
        sleep(5000);// delay for processing
        message.channel.sendFile("cloudSoftDev.png"); // sends local image file

    } else if(cmd == `${prefix}cloud` && args[0] == "data"){
        var options = {
            scriptPath: './',
          };
        PythonShell.run('CLOUDdata_py.py', options, function (err) { // launches python file
            if (err) return;
            console.log('Python File Launched!'); // lets host know python file was executed
          }); 
        sleep(5000);// delay for processing
        message.channel.sendFile("cloudData.png"); // sends local image file

    } else if(cmd == `${prefix}exit`){
        process.exit();
    } else { return; }
});

// token read and login
var fs = require('fs'); 

fs.readFile('./token', 'utf8', function(error, data){ // *** YOU MUST EDIT TOKEN FILE, FIRST! **
    bot.login(data)
});




////////////////////////////////////////////////////
// **** SWITCH STATEMENT BUGS IT OUT ****
// switch(cmd){
//     case `${prefix}hi`:
//         message.channel.send("Hello! I am the Data Science Bot. :smile:");
//         message.channel.sendFile("154594528493366171.gif");
//         message.channel.send("Type '!commands' to see what I can do");
//         break;
//     case `${prefix}commands`:
//         message.channel.send("Command List:\n !tech <job> \n !salary <job>\n !cloud <job>");
//         break;
//     case `${prefix}jenga`:
//         message.channel.send("How to win jenga", {files: ["https://i.imgur.com/mjiLIXn.mp4"]}); // files can be image or video urls
//         break;
//     case `${prefix}shake`:
//         message.channel.send("thicccc", {files: ["https://i.imgur.com/jSGxuiJ.mp4"]});
//         break;
//     case `${prefix}tech`:
//         if (args[0] == "data"){
//             var options = {
//                 scriptPath: './',
//               };
//             PythonShell.run('data_py.py', options, function (err) { // launches python file
//                 if (err) return;
//                 console.log('Python File Launched!'); // lets host know python file was executed
//               }); 
//             sleep(5000); // delay for processing
//             message.channel.sendFile("foo.png"); // sends local image file
//         } else if (args.length > 1 && args[0]+" "+args[1] == "software developer"){
//             var options = {
//                 scriptPath: './',
//               };
//             PythonShell.run('soft_py.py', options, function (err) { // launches python file
//                 if (err) return;
//                 console.log('Python File Launched!'); // lets host know python file was executed
//               }); 
//             sleep(5000);// delay for processing
//             message.channel.sendFile("foo2.png"); // sends local image file
//         } else if (args.length > 1 && args[0]+" "+args[1] == "software engineer"){
//             var options = {
//                 scriptPath: './',
//               };
//             PythonShell.run('soft_py_eng.py', options, function (err) { // launches python file
//                 if (err) return;
//                 console.log('Python File Launched!'); // lets host know python file was executed
//               }); 
//             sleep(5000);// delay for processing
//             message.channel.sendFile("foo3.png"); // sends local image file
//         }
//     case `${prefix}salary`:
//         if(args.length == 2){ // 2 string jobs ex.) computer science
//             var options = {
//                 mode: 'text',
//                 encoding: 'utf8',
//                 pythonOptions: ['-u'],
//                 scriptPath: './',
//                 args: [args[0], args[1]]
//             };

//         } else if(args.length == 3){ // 3 string jobs ex.) information technology administrator
//             var options = {
//                 mode: 'text',
//                 encoding: 'utf8',
//                 pythonOptions: ['-u'],
//                 scriptPath: './',
//                 args: [args[0], args[1], args[2]]
//             };

//         } else if(args.length == 1){ // 1 string jobs ex.) nanny
//             var options = {
//                 mode: 'text',
//                 encoding: 'utf8',
//                 pythonOptions: ['-u'],
//                 scriptPath: './',
//                 args: [args[0]]
//             };

//         } else {
//             break;
//         }
//         PythonShell.run('sal.py', options, function (err, results) { // launches python file
//             if (err) return;
//             message.channel.send(results);
//             console.log('Python sal.py File Launched!'); // lets host know python file was executed
//         }); 
//         break;
//     case `${prefix}cloud`:
//         if (cmd == `${prefix}cloud` && args[0] == "data"){
//             var options = {
//                 scriptPath: './',
//               };
//             PythonShell.run('CLOUDdata_py.py', options, function (err) { // launches python file
//                 if (err) return;
//                 console.log('Python File Launched!'); // lets host know python file was executed
//               }); 
//             sleep(5000);// delay for processing
//             message.channel.sendFile("cloudData.png"); // sends local image file
//         } else if (cmd == `${prefix}cloud` && args.length > 1 && args[0]+" "+args[1] == "software developer"){
//             var options = {
//                 scriptPath: './',
//               };
//             PythonShell.run('CLOUDsoft_py.py', options, function (err) { // launches python file
//                 if (err) return;
//                 console.log('Python File Launched!'); // lets host know python file was executed
//               }); 
//             sleep(5000);// delay for processing
//             message.channel.sendFile("cloudSoftDev.png"); // sends local image file
//         } else if (cmd == `${prefix}cloud` && args.length > 1 && args[0]+" "+args[1] == "software engineer"){
//             var options = {
//                 scriptPath: './',
//               };
//             PythonShell.run('CLOUDsoft_py_eng.py', options, function (err) { // launches python file
//                 if (err) return;
//                 console.log('Python File Launched!'); // lets host know python file was executed
//               }); 
//             sleep(5000);// delay for processing
//             message.channel.sendFile("cloudSoftEng.png"); // sends local image file
//         }
//         break;
//     case `${prefix}exit`:
//         process.exit();
//     default:
//         break;
// }