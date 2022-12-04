var data = JSON.parse(localStorage.getItem("price_data")) || 0;

if(data == 0 || data.quantiti == 0){
    console.log("Your Cart is Empty");
}else{
    var discount = data.discount_price;
    var mrp = data.mrp_price;
    var quantity = data.quantiti;
    var sell_price = data.sel_price;
    var promo_flag = data.p_c;
    var dis = 0;
    
    display_price()

    document.getElementById("apply").addEventListener("click", chk_promo);

    document.getElementById("submit").addEventListener("click", submit);

    function submit(){
        var card_num = document.getElementById("c_number").value;
        var cvv = document.getElementById("cvv").value;
        if(card_num == "" || cvv == ""){
            alert("Invalid Card Details");
        }else{
            var div = document.createElement("div");
            var otp = document.createElement("input");
            otp.setAttribute("id", "otp_val");
            otp.setAttribute("placeholder", "Enter OTP");
            var confirm_btn = document.createElement("button");
            confirm_btn.setAttribute("id", "confirm");
            confirm_btn.textContent = "confirm";
            div.append(otp, confirm_btn)
            document.getElementById("for_otp").textContent = "";
            document.getElementById("for_otp").setAttribute("class", "otp_class");
            document.getElementById("for_otp").append(div);

            document.getElementById("confirm").addEventListener("click", actn);

            function actn(){
                var done = [];
                localStorage.setItem("cart", JSON.stringify(done));
                localStorage.setItem("price_data", JSON.stringify(done));
                var otp_n = document.getElementById("otp_val").value;
                if(otp_n == "1234"){
                    alert("Order Successfull");
                }else{
                    alert("Invalid OTP");
                }
            }
        }
    }

    function chk_promo(){
        if(promo_flag){
            alert("Promo Code already applied");
        }else{
            var code = document.getElementById("promo_code").value;
            if(code == "masai10"){
                dis = sell_price/10;
                display_price();
            }else{
                dis = 0;
                display_price();
                alert("Invalid Code");
            }
        }
    }

    function display_price(){

        document.querySelector(".dis1").textContent = Math.floor(discount*1 + dis*1);
        document.querySelector(".dis2").textContent = Math.floor(discount*1 + dis*1);
        document.getElementById("itm").textContent = "(" + quantity + ")";
        document.getElementById("mrp").textContent = mrp;
        document.querySelector(".sell_p1").textContent = Math.floor(sell_price - dis);
        document.querySelector(".sell_p2").textContent = Math.floor(sell_price - dis);
    }
}
