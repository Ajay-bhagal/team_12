var data = JSON.parse(localStorage.getItem("cart")) || [];
// var obj = {
//     id:1,
//     name:"SAFAVIEH California Shag Izat 2-inch Thick Area Rug - 2'3  Runner - Ivory",
//     image_url:"https://ak1.ostkcdn.com/images/products/is/images/direct/fa0de7e5f6db966631851fdd3f058a6b965ff170/SAFAVIEH-California-Shag-Izat-2-inch-Thick-Rug.jpg?imwidth=480&impolicy=medium",
//     qty:2,
//     fprice:3063.50,
//     rating:4.5,
//     offer:54,
//     cost:6789.6,
//     category:"Home Decor"
// }

// data.push(obj);
//  localStorage.setItem("cart", JSON.stringify(data));

// console.log(data);
var total_qty = 0;
var total_price = 0;
var total_sell_price = 0;

display_product();
display_price();

function display_price(){
    if(total_qty>0){
        document.getElementById("itm").textContent = "(" + total_qty + ")";
    }else{
        document.getElementById("itm").textContent = "";
    }
    // console.log(document.getElementById("total_mrp"));
    var num = (total_price - total_sell_price).toFixed(2);
    document.querySelector(".dis1").textContent = num;
    document.querySelector(".dis2").textContent = num;
    document.getElementById("total_mrp").textContent = total_price;
    document.querySelector(".sel1").textContent = total_sell_price;
    document.querySelector(".sel2").textContent = total_sell_price;
}

function display_product() {
    document.getElementById("product_contener").textContent = "";
    total_qty = 0
    total_price = 0;
    total_sell_price = 0;
    if(data.length == 0){
        var emt = document.createElement("h1");
        emt.textContent = "Your Cart is Empty";
        document.getElementById("product_contener").append(emt);
    }else{
        data.map(function(ele, index) {
            var name = ele.name;
            var img = ele.image_url;
            var discount = ele.offer;
            var sell_price = ele.fprice;
            var mrp = ele.cost;
            var quantity = ele.qty;

            var mrp_val = mrp*quantity;
            var sell_val = sell_price*quantity;
            total_qty += quantity*1;
            total_price += mrp_val*1;
            total_sell_price += sell_val*1;

            var product = document.createElement("div");
            product.setAttribute("class", "product");
            
            var prdct_cld1 = document.createElement("div");
            var image = document.createElement("img");
            image.setAttribute("src", img);
            prdct_cld1.append(image); 
            
            var prdct_cld2 = document.createElement("div");
            var p1 =  document.createElement("p");
            p1.textContent = name;
            prdct_cld2.append(p1);

            var dlvr_div =  document.createElement("div");
            dlvr_div.setAttribute("id", "delivery");
            var p2 =  document.createElement("p");
            p2.setAttribute("id", "savings");
            var span1 = document.createElement("span");
            span1.setAttribute("class", "line");
            span1.textContent = mrp;
            var span2 = document.createElement("span");
            span2.setAttribute("class", "red");
            span2.textContent = " " + discount + "% Savings";
            p2.append(span1, span2);
            dlvr_div.append(p2);
            
            var dlvr_div_cld = document.createElement("div");
            dlvr_div_cld.setAttribute("class", "delivery_border");
            var h_dlvr_dtls = document.createElement("h4");
            h_dlvr_dtls.textContent = "Delivery Estimate: Friday, Dec 2";
            dlvr_div_cld.append(h_dlvr_dtls);
            dlvr_div.append(dlvr_div_cld);
            prdct_cld2.append(dlvr_div);

            var h_sel_val = document.createElement("h3");
            h_sel_val.setAttribute("id", "sell_price");
            h_sel_val.setAttribute("class", "red");
            h_sel_val.textContent = "Sale ₹" + sell_price;
            prdct_cld2.append(h_sel_val);
            var p_qty = document.createElement("p");
            p_qty.setAttribute("id", "quantity_p");
            prdct_cld2.append(p_qty);
            var select_qty = document.createElement("select");
            select_qty.setAttribute("id", "quantity");
            for(var i=1; i<=10; i++){
                var optn = document.createElement("option");
                optn.setAttribute("value", i);
                optn.textContent = i;
                select_qty.append(optn);
            }
            select_qty.selectedIndex = quantity-1;
            prdct_cld2.append(select_qty);
            var dlt_div = document.createElement("div");
            dlt_div.setAttribute("id", "delete");
            var a1 = document.createElement("a");
            a1.setAttribute("href", "");
            a1.textContent = "Remove";
            a1.addEventListener("click", function(){
                dlet(index);
            })
            var a2 = document.createElement("a");
            a2.setAttribute("href", "");
            a2.textContent = "Save For Later";
            a2.addEventListener("click", function(){
                dlet(index);
            })
            dlt_div.append(a1, a2);
            prdct_cld2.append(dlt_div);
            
            product.append(prdct_cld1, prdct_cld2);

            document.getElementById("product_contener").append(product);

            // price part

            

        })
    }
}

function dlet(index){
    // console.log(data);
    event.preventDefault();
    data.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(data));
    display_product();
    display_price();
}