import inquirer from "inquirer";
// import gradient from "gradient-string";

let chooseType = [
    {
        name : "type",
        type : "list",
        choices : ["Card" , "Thumb impression"]
    }
];
let selection = [
    {
        name : "Select",
        type : "list",
        choices : ["Cash Withdrawl" , "Account info"]
    }
]
let amount = [
    {
        name : "Amount",
        type : "number",
        message : "Enter Amount which you want to witdraw"
    },
]
let receipt = [
    {
        name : "recipt",
        type : "confirm",
        message : "Do you want to print invoice?"
    }
]
let pin = [
    {
        name : "Pin",
        type : "number",
        message : "Enter 4 digit pin of your account",
        validate(pin:number){
            if(isNaN(pin)){
                return "Enter number"
            }
            return true
        }
    },
    
];
let thmb_impression = [
    {
        name : "CNIC",
        type : "number",
        message :  "Enter your CNIC number please do not use dashes",
        validate(cnic:number){
            if(isNaN(cnic)){
                return "please do not use dashes write again"
            }
            return true
        }
    }
]
async function repetable (){
    let condition = true;
    while(condition){
        let {Pin} = await inquirer.prompt(pin)
        if(Pin.toString().length !== 4){
            console.log("Enter 4 digits its not acceptable");
            condition = true
        }
        else{
            condition = false
        }
    }
    let {Select} = await inquirer.prompt(selection);
    if(Select == "Cash Withdrawl"){
        let mulof5 = true;
        while(mulof5){
            let {Amount} = await inquirer.prompt(amount);
            if(Amount%5 == 0){
                let {recipt} = await inquirer.prompt(receipt)
                if(recipt == false){
                    console.log("Receive your card and cash",Amount);
                    console.log("Thank You !");
                    
                }
                else{
                    let invoice = {
                        user_name : "Test User",
                        widrawl_amount : Amount,
                        Date : new Date().toISOString().split('T')[0],
                        account_number : "xxxxxxxxx"
                    }
                    console.log(invoice);
                    
                }
                mulof5 = false;
            }
            else{
                console.log("Please enter amount in multiple of 5");
                mulof5 = true;
            }
        }
        
       
        
    }
    else{
        let acc_info = {
            account_holder_name : "Test User",
            amount_in_your_account : 90000,
            CNIC : 'xxxxxxxxxxxxx',
        }
        console.log(acc_info);
        
    }
}
async function ATM(){
    let {type} = await inquirer.prompt(chooseType)
    if(type == "Card"){
        repetable()
    }
    else{
        let con = true;
        while(con){
            let {CNIC} = await inquirer.prompt(thmb_impression)
            if(CNIC.toString().length !== 13){
                console.log("CNIC must be 13 digits long");
                con = true;
            }
            else{
                con = false;
                repetable()
            }
    }
   
}
}
ATM()