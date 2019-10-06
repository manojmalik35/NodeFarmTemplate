// homepage in options pe khulna chahiye => "HomePage", "/", ""
// product page => "product"
// api => "/api"
// Error 404

var http = require("http");
var fs = require("fs")
var url = require("url")

var json = fs.readFileSync("data.json")
var template = fs.readFileSync("./templates/product.html")
var home = fs.readFileSync("./templates/overview.html")
var ctemp = fs.readFileSync("./templates/card.html");
template = template + "";
home = home + "";
ctemp = ctemp + "";


json = JSON.parse(json);

function replace(product, template){
    template = template.replace(/#productName#/g, product.productName);
    template = template.replace(/#image#/g, product.image);
    template = template.replace(/#from#/g, product.from);
    template = template.replace(/#nutrients#/g, product.nutrients);
    template = template.replace(/#quantity#/g, product.quantity);
    template = template.replace(/#price#/g, product.price);
    template = template.replace(/#description#/g, product.description);
    template = template.replace(/{id}/g, product.id);
    template = template.replace(/#back#/g, "/");
    if(!product.organic)
        template = template.replace(/#not-organic#/g, "not-organic");
    return template;

}


//har occurence pe replace krwana ho 
//regular expression banana pdta h or g mtlb global.... har jagah se ho jayga replace


var server = http.createServer(function(req, res){

    var nurl = url.parse(req.url, true);
    console.log(nurl);
    if(nurl.pathname == "/homepage" || nurl.pathname == "/" || nurl.pathname == ""){
        var str = "";
        for(var i = 0; i < json.length; i++){
            var card = replace(json[i], ctemp);
            str += card;
        }
        home = home.replace(/{#cardscontainer#}/g, str);
        res.write(home);
    }else if(nurl.pathname == "/product"){
        var id = nurl.query.id;
        res.write(replace(json[id], template));
    }else if(nurl.pathname == "/api"){
        res.write(json)
    }else{
        res.write("<h1> Error 404 </h1>");
    }

    res.end();
})

server.listen(3000, function(){
    console.log("Server is listening at port no 3000");
})
