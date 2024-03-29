const form=document.getElementById("car-form");
const titleElement=document.querySelector("#title");
const priceElement=document.querySelector("#price");
const urlElement=document.querySelector("#url");
const cardbody=document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-cars");


//UI Objesini başlatma
//constructor
const ui=new UI();

const storage=new Storage();

//Tüm Eventleri Yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addCar);

    document.addEventListener("DOMContentLoaded",function(){
        let cars=storage.getCarsFromStorage();
        ui.loadAllCars(cars);

    });
    cardbody.addEventListener("click",deleteCar);
    clear.addEventListener("click",clearAllCars);
}

function addCar(e){

    const title=titleElement.value;
    const price =priceElement.value;
    const url =urlElement.value;

    if(title=== "" || price==="" || url===""){
        //Hata
        ui.displayMessages("Tüm alanları doldurun..","danger")
    }
    else
    {
        //yeni araç
        const newCar=new Car (title,price,url);
        ui.addCarToUI(newCar);//arayüze araç ekleme

        storage.addCarToStorage(newCar);
        ui.displayMessages("Araç başarıyla eklendi...","success")

    }
    ui.clearInputs(titleElement,priceElement,urlElement);

    e.preventDefault();


}

function deleteCar(e){
    if(e.target.id=== "delete-car"){
        ui.deleteCarFromUI(e.target);//a elementini veriyor
        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textCntent);
        ui.displayMessages("Silme işlemi başarıyla gerçekleşti...","success");
    }
}

function clearAllCars(){
    if(confirm("Tüm araçlar silinecek. Emin misiniz?")){
        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();
    }

}

