const express=require("express");
const app=express();
const http = require("https");
const bodyParser=require("body-parser");
const ejs=require("ejs");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(request,response){
  const options = {
  	"method": "GET",
  	"hostname": "quotes15.p.rapidapi.com",
  	"port": null,
  	"path": "/quotes/random/",
  	"headers": {
  		"x-rapidapi-key": "18871e0395msha3944d26844c2fap138818jsnbe50ba5fdb44",
  		"x-rapidapi-host": "quotes15.p.rapidapi.com",
  		"useQueryString": true
  	}
  };
  const req = http.request(options, function (res) {
  	const chunks = [];
  	res.on("data", function (chunk) {
  		chunks.push(chunk);
  	});
  	res.on("end", function () {
  		const body = Buffer.concat(chunks);
      const dataReceived=JSON.parse(body);
      const obj={
        quote:dataReceived.content,
        name:dataReceived.originator.name,
        more:dataReceived.originator.url
      };
      response.render("quote",{myObj:obj});
  	});
  });
  req.end();
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Listening to port 3000");
})
