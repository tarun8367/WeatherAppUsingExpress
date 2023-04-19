const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
const temp_realVal = document.getElementById('temp_realVal');

const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

const getCurrentDay = () => {
    const weekDays = ["SUN", "Mon", "Tue", "WED", "Thur", "Fri", "Sat"];
    let currenttime = new Date();
    var day = weekDays[currenttime.getDay()];
    return day;
};

const getCurrenTime = () => {
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    var currentTime = new Date();
    var month = months[currentTime.getMonth()];
    var date = currentTime.getDate();


    return `${date} ${month}`;

};

day.innerHTML = getCurrentDay();
today_date.innerHTML = getCurrenTime();


const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = "Please write the city name before searching";
        datahide.classList.add('data_hide');
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=fbe4cbb23837ff72b9797dcd08e27d31#`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_realVal.innerText = arrData[0].main.temp;
            
            
            const tempMood = arrData[0].weather[0].main;;
            
            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
                temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
            }
            
            datahide.classList.remove('data_hide');
            
            
        }
        catch {
            city_name.innerText = "Please enter a valid City Name";
            datahide.classList.add('data_hide');
        }




    }

};

submitBtn.addEventListener('click', getInfo);