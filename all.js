//體重過輕  BMI ＜ 18.5   bmi < 18.5
//正常範圍  18.5≦BMI＜24  bmi>=18.5 && bmi<24
//過重  24≦BMI＜27       bmi>=24 && bmi<27
//輕度肥胖  27≦BMI＜30    bmi>=27 && bmi<30
//中度肥胖  30≦BMI＜35    bmi>=30 && bmi<35
//重度肥胖  BMI≧35        bmi>=35


//dom
const btnShowBmi = document.querySelector('.btn-show-bmi');
const inputHeight = document.querySelector('.input-height');
const inputWeight = document.querySelector('.input-weight');
const msgHeight = document.querySelector('.msg-height');
const msgWeight = document.querySelector('.msg-weight');
const btnList = document.querySelector('.btn-list'); 
const historyList = document.querySelector('.history-list');
const historyContainer = document.querySelector('.history-container');
const deleteHistoryContainer = document.querySelector('.delete-history-container');

//data
let bmiData = [];

//call function
init();
//init:計算BIM、渲染畫面
function init(){
    validateContent();
    getLocal();
}
//驗證欄位資訊
function validateContent(){
    btnShowBmi.addEventListener('click',(e) =>{
        e.preventDefault();
        //清空警示訊息後再重新判斷
        msgHeight.innerHTML = "";
        msgWeight.innerHTML = "";
        //判斷是否都有值
        if(inputHeight.value == "")
        msgHeight.innerHTML = "欄位不能為空！";
        if(inputWeight.value == "")
        msgWeight.innerHTML = "欄位不能為空！";
        if(inputHeight.value != "" && inputWeight.value != "")
        calcBmi();
    }
    )
};

//計算bmi，並建立新的一筆資料進歷史紀錄
function calcBmi(){
    //建立新的一筆物件
let obj={};
obj.height = inputHeight.value;
obj.weight = inputWeight.value;
    //取用obj裡的資訊來計算bmi
let bmi = (obj.weight/((obj.height/100)**2)).toFixed(2);
obj.bmi = bmi;
    //判斷bmi狀態
    let state ="";
    let color = ""
    let date = "";
    if(bmi < 18.5){
        state = "體重過輕";
        color = "blue";
    }else if(bmi>=18.5 && bmi<24){
        state = "體重正常";
        color = "green";
    }else if(bmi>=24 && bmi<27){
        state = "體重過重"
        color = "FF982D";
    }else if(bmi>=27 && bmi<30){
        state = "輕度肥胖"
        color = "FF6C02";
    }else if(bmi>=30 && bmi<35){
        state = "中度肥胖"
        color = "FF6C02";
    }else if(bmi>=35){
        state = "重度肥胖"
        color = "FF1200";
    }else{
        state = "數值錯誤"
    }
    obj.state = state;
    obj.color = color;
    //取得當下時間
    let time = new Date();
    date = `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;
    obj.date = date;
    bmiData.push(obj);
    console.log(bmiData)
    saveBmiToLocal();
    //渲染結果畫面
    btnList.innerHTML = `<a href="" class="btn-show-state btn-${color}">
    <span class="fs-32">${bmi}</span>
    <span class="fs-4">BMI</span>
    <img src="https://i.imgur.com/8Amc343.png" alt="">
    </a>
    <span class="fs-32 c-${color}">${state}</span>`;
    renderBmiHistory();
}

//處理資料：使用localStorage來儲存歷史資料
function saveBmiToLocal(){
    let bmiDataString = JSON.stringify(bmiData);
    localStorage.setItem("bmi",bmiDataString);
}

//取得local歷史資料
function  getLocal(){
    let bmiString = localStorage.getItem("bmi");
    bmiData = JSON.parse(bmiString);
    renderBmiHistory();
}

//渲染bmi歷史紀錄
function renderBmiHistory(){
    if(bmiData.length == null){
        historyContainer.innerHTML =`<h1 class="fs-24 c-424242 title-bmi-record">目前沒有任何測量紀錄唷！</h1>`;
    }else{
        let str1=`<h1 class="fs-24 c-424242 title-bmi-record">BMI 紀錄</h1>
        <table class="c-424242 history-list">`;
        let str2 = "";
        let str3 = `</table><div class="delete-history-container">
        <a href="#" class="fs-15 mt-25 btn-delete-history c-424242">刪除全部</a>
    </div>`;
        bmiData.forEach((item,index)=>{
            let content = `<tr class="tr-decoration tr-${item.color}">
            <td><span class="fs-20 mt-25 ml-15 mb-25">${item.state}</span></td>
            <td><span class="fs-12 ml-70">BMI</span><span class="fs-20">${item.bmi}</span></td>
            <td><span class="fs-12 ml-70">weight</span><span class="fs-20">${item.weight}kg</span></td>
            <td><span class="fs-12 ml-70 ">height</span><span class="fs-20">${item.height}cm</span></td>
            <td><span class="fs-15 ml-70 mr-20">${item.date}</span></td>
            <td><a href="#"class="fs-24 ml-70 mr-20 d-flex align-items-centers"><span class="material-icons" data-index=${index}>
            clear</span></a></td>
        </tr>`;
        str2+=content;
        })
        historyContainer.innerHTML  = str1+str2+str3;
        //只有在有資料的時候才會插入刪除全部的按鈕
    }
};

//刪除單一資料
historyContainer.addEventListener('click',(e) =>{
    e.preventDefault();
    let dataIndex = e.target.dataset.index;
    bmiData.splice(dataIndex,1);
    saveBmiToLocal();
    getLocal()
})
//刪除全部資料
deleteHistoryContainer.addEventListener("click",(e)=>{
    bmiData = [];
    saveBmiToLocal();
    renderBmiHistory();
})
